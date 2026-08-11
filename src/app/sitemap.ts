import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site.config";
import { shows } from "@/data/shows";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...shows.map((s) => ({
      url: `${SITE_URL}/fechas/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
