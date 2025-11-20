import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getDownloadConfig } from "@/lib/downloadManifest";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".txt": "text/plain; charset=utf-8",
};
const DEFAULT_CACHE_SECONDS = 300;
const BLOB_AUTH_TOKEN = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.BLOB_READ_TOKEN ?? null;
type RemoteFetchSuccess = { ok: true; buffer: Buffer; headers: Headers };
type RemoteFetchError = { ok: false; status: number; statusText?: string };
type RemoteFetchResult = RemoteFetchSuccess | RemoteFetchError;

function buildHeaders({
  contentType,
  contentLength,
  disposition,
  fileName,
  cacheSeconds,
}: {
  contentType: string;
  contentLength: number;
  disposition: "inline" | "attachment";
  fileName: string;
  cacheSeconds?: number;
}) {
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Content-Length", String(contentLength));
  headers.set(
    "Content-Disposition",
    `${disposition}; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
  );
  const maxAge = typeof cacheSeconds === "number" ? cacheSeconds : DEFAULT_CACHE_SECONDS;
  headers.set("Cache-Control", `private, max-age=${maxAge}`);
  return headers;
}

function shouldAttachBlobAuth(url: string) {
  if (!BLOB_AUTH_TOKEN) return false;
  try {
    const hostname = new URL(url).hostname;
    return hostname.endsWith(".vercel-storage.com");
  } catch {
    return false;
  }
}

async function fetchRemoteFile(
  url: string,
  opts: { expectedHash?: string; hashAlgorithm?: "sha256" | "sha384" | "sha512" }
): Promise<RemoteFetchResult> {
  const headers = new Headers();
  if (shouldAttachBlobAuth(url)) {
    headers.set("Authorization", `Bearer ${BLOB_AUTH_TOKEN}`);
  }

  const remoteRes = await fetch(url, { headers, cache: "no-store" });
  if (!remoteRes.ok) {
    return { ok: false, status: remoteRes.status, statusText: remoteRes.statusText as string };
  }

  const arrayBuffer = await remoteRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (opts.expectedHash) {
    const algorithm = opts.hashAlgorithm ?? "sha256";
    const digest = crypto.createHash(algorithm).update(buffer).digest("hex");
    if (digest !== opts.expectedHash) {
      return { ok: false, status: 502, statusText: "Integrity check failed" };
    }
  }

  return {
    ok: true,
    buffer,
    headers: remoteRes.headers,
  };
}

export async function GET(request: NextRequest, { params }: { params: { slug?: string[] } }) {
  const slugSegments = params.slug?.filter(Boolean) ?? [];
  if (!slugSegments.length) {
    return NextResponse.json({ error: "File not specified" }, { status: 400 });
  }

  const resolved = getDownloadConfig(slugSegments);
  if (!resolved) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const { config, fileName, key } = resolved;
  const ext = path.extname(fileName).toLowerCase();
  const defaultContentType = MIME_MAP[ext] || "application/octet-stream";
  const dispositionType = config.disposition ?? (ext === ".pdf" ? "inline" : "attachment");

  if (config.type === "local") {
    const resolvedPath = path.join(PUBLIC_DIR, config.relativePath);
    if (!resolvedPath.startsWith(PUBLIC_DIR)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    try {
      const [fileBuffer, stats] = await Promise.all([fs.readFile(resolvedPath), fs.stat(resolvedPath)]);
      const headers = buildHeaders({
        contentType: config.contentType ?? defaultContentType,
        contentLength: stats.size,
        disposition: dispositionType,
        fileName,
        cacheSeconds: config.cacheSeconds,
      });

      console.log(
        `[download-route] source=local key=${key} size=${stats.size} ua="${request.headers.get("user-agent") ?? "unknown"}"`
      );

      return new NextResponse(fileBuffer, { status: 200, headers });
    } catch (error) {
      console.error("[download-route] Local file not found:", resolvedPath, error);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  }

  if (!config.url) {
    return NextResponse.json({ error: "File not configured" }, { status: 503 });
  }

  const remote = await fetchRemoteFile(config.url, {
    expectedHash: config.integrityHash,
    hashAlgorithm: config.hashAlgorithm,
  });

  if (!remote.ok) {
    console.error(
      `[download-route] Remote fetch failed key=${key} status=${remote.status} detail=${remote.statusText ?? "unknown"}`
    );
    return NextResponse.json({ error: "File unavailable" }, { status: remote.status ?? 502 });
  }

  const contentType = config.contentType ?? remote.headers.get("content-type") ?? defaultContentType;
  const headers = buildHeaders({
    contentType,
    contentLength: remote.buffer.length,
    disposition: dispositionType,
    fileName,
    cacheSeconds: config.cacheSeconds,
  });

  // Preserve source ETag/Last-Modified if available to help caching.
  ["etag", "last-modified"].forEach((headerKey) => {
    const value = remote.headers.get(headerKey);
    if (value) headers.set(headerKey, value);
  });

  console.log(
    `[download-route] source=remote key=${key} size=${remote.buffer.length} ua="${
      request.headers.get("user-agent") ?? "unknown"
    }"`
  );

  return new NextResponse(remote.buffer, { status: 200, headers });
}
