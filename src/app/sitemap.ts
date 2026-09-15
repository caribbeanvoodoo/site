import type { MetadataRoute } from "next";
import { routes, musicPath, showPath, translatePath } from "@/i18n/routes";
import { releases } from "@/data/releases";
import { shows } from "@/data/shows";
import { absolute, CONTENT_MODIFIED } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...Object.values(routes).map((r) => ({
      path: r.es,
      modified: CONTENT_MODIFIED,
    })),
    ...releases.map((r) => ({
      path: musicPath(r.slug, "es"),
      modified: r.modified,
    })),
    ...shows.map((s) => ({
      path: showPath(s.slug, "es"),
      modified: s.modified,
    })),
  ];
  return entries.flatMap(({ path, modified }) =>
    (["es", "en"] as const).map((locale) => ({
      url: absolute(translatePath(path, locale)),
      lastModified: modified,
      alternates: {
        languages: {
          "es-MX": absolute(path),
          en: absolute(translatePath(path, "en")),
          "x-default": absolute(path),
        },
      },
    })),
  );
}
