import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/siteMetadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteMetadata.url}/sitemap.xml`,
    host: siteMetadata.url,
  };
}
