import { NextRequest, NextResponse } from "next/server";
import { siteMetadata } from "@/lib/siteMetadata";

const DEFAULT_SOURCE = "resume";

const SOURCE_MAP: Record<string, string> = {
  resume: "resume",
  linkedin: "linkedin",
  github: "github",
  email: "email",
};

export async function GET(request: NextRequest) {
  const sourceParam = request.nextUrl.searchParams.get("s")?.toLowerCase() ?? "";
  const source = SOURCE_MAP[sourceParam] ?? DEFAULT_SOURCE;

  const targetUrl = new URL(siteMetadata.url);
  targetUrl.searchParams.set("utm_source", source);
  targetUrl.searchParams.set("utm_medium", "pdf");
  targetUrl.searchParams.set("utm_campaign", "personal_brand");

  const userAgent = request.headers.get("user-agent") ?? "unknown";
  console.log(
    `[resume-redirect] source=${source} ts=${new Date().toISOString()} ua="${userAgent}"`
  );

  return NextResponse.redirect(targetUrl, { status: 302 });
}
