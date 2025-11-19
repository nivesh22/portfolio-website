import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(request: NextRequest, { params }: { params: { slug?: string[] } }) {
  const slugSegments = params.slug?.filter(Boolean) ?? [];
  if (!slugSegments.length) {
    return NextResponse.json({ error: "File not specified" }, { status: 400 });
  }

  const resolvedPath = path.join(PUBLIC_DIR, ...slugSegments);
  if (!resolvedPath.startsWith(PUBLIC_DIR)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  let fileBuffer: Buffer;
  let stats: { size: number };
  try {
    [fileBuffer, stats] = await Promise.all([fs.readFile(resolvedPath), fs.stat(resolvedPath)]);
  } catch (error) {
    console.error("[download-route] File not found:", resolvedPath, error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileName = slugSegments[slugSegments.length - 1] || "download";
  const ext = path.extname(fileName).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const dispositionType = ext === ".pdf" ? "inline" : "attachment";

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Content-Length", String(stats.size));
  headers.set(
    "Content-Disposition",
    `${dispositionType}; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
  );
  headers.set("Cache-Control", "public, max-age=3600");

  console.log(
    `[download-route] file=${fileName} size=${stats.size} ua="${request.headers.get("user-agent") ?? "unknown"}"`
  );

  return new NextResponse(fileBuffer, { status: 200, headers });
}
