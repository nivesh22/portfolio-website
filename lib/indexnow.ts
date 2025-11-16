import { siteMetadata } from "@/lib/siteMetadata";

const INDEX_NOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function getIndexNowKey() {
  return process.env.INDEX_NOW_API;
}

export function getIndexNowKeyLocation() {
  const key = getIndexNowKey();
  if (!key) return null;
  return `${siteMetadata.url.replace(/\/+$/, "")}/${key}.txt`;
}

export async function submitIndexNow(urls: string[]) {
  const key = getIndexNowKey();
  if (!key || urls.length === 0) {
    return new Response("Missing IndexNow key or URLs", { status: 400 });
  }

  const host = new URL(siteMetadata.url).hostname;
  const keyLocation = getIndexNowKeyLocation();
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  return fetch(INDEX_NOW_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
