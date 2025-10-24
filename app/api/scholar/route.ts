import { NextResponse } from "next/server";

// Stub endpoint: in production, fetch from Google Scholar export
export async function GET() {
  return NextResponse.json({ refreshed: false, note: "Stub endpoint. Wire scholar sync with manual export." });
}

