import type { Locale } from "./dictionaries";
export const routes = {
  home: { es: "/", en: "/en" },
  band: { es: "/banda", en: "/en/band" },
  shows: { es: "/fechas", en: "/en/shows" },
  press: { es: "/prensa", en: "/en/press" },
} as const;
export function musicPath(slug: string, locale: Locale) {
  return `${locale === "es" ? "/musica" : "/en/music"}/${slug}`;
}
export function showPath(slug: string, locale: Locale) {
  return `${routes.shows[locale]}/${slug}`;
}
export function translatePath(path: string, locale: Locale): string {
  const clean = path.replace(/\/$/, "") || "/";
  for (const pair of Object.values(routes)) {
    if (Object.values(pair).some((value) => value === clean))
      return pair[locale];
  }
  const music = clean.match(/^\/(?:musica|en\/music)\/([^/]+)$/);
  if (music) return musicPath(music[1], locale);
  const show = clean.match(/^\/(?:fechas|en\/shows)\/([^/]+)$/);
  if (show) return showPath(show[1], locale);
  return routes.home[locale];
}
