import type { NextRequest } from "next/server";
import { getIndexNowKey } from "@/lib/indexnow";

export function GET(_: NextRequest, { params }: { params: { indexnowKey?: string } }) {
  const key = getIndexNowKey();
  if (!key) {
    return new Response("IndexNow key not configured", { status: 500 });
  }
  const requestedKey = params.indexnowKey;
  if (requestedKey !== key) {
    return new Response("Not Found", { status: 404 });
  }
  return new Response(key, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
