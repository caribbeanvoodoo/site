import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to crawl here and it keeps the signup endpoint out of logs.
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
