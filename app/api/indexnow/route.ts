import { NextRequest } from "next/server";
import { submitIndexNow, getIndexNowKey } from "@/lib/indexnow";
import { siteMetadata } from "@/lib/siteMetadata";
import { allProjects } from "contentlayer/generated";

function collectSiteUrls() {
  const baseUrl = siteMetadata.url.replace(/\/+$/, "");
  const staticRoutes = ["/", "/about", "/projects/personal", "/projects/professional", "/skills", "/publications", "/resume", "/downloads"].map((path) =>
    path === "/" ? baseUrl : `${baseUrl}${path}`
  );
  const projectRoutes = allProjects.map((project) => `${baseUrl}${project.url}`);
  return [...staticRoutes, ...projectRoutes];
}

export async function POST(request: NextRequest) {
  if (!getIndexNowKey()) {
    return Response.json({ success: false, error: "INDEX_NOW_API not configured" }, { status: 500 });
  }

  let urls: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.urls)) {
      urls = body.urls.filter((u: unknown): u is string => typeof u === "string" && Boolean(u));
    }
    if (!urls.length && body?.includeAll) {
      urls = collectSiteUrls();
    }
  } catch {
    // ignore JSON parse errors; fall back to default URL list below
  }

  if (!urls.length) {
    urls = [siteMetadata.url];
  }

  const uniqueUrls = Array.from(new Set(urls));
  const response = await submitIndexNow(uniqueUrls);

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return Response.json(
      { success: false, status: response.status, detail: detail || "Failed to notify IndexNow" },
      { status: 502 }
    );
  }

  return Response.json({ success: true, submitted: uniqueUrls.length });
}
