import { notFound } from "next/navigation";
import { getShow, shows } from "@/data/shows";
import type { Locale } from "@/i18n/dictionaries";
import { showPath } from "@/i18n/routes";
import { isPastShow, upcomingShows } from "@/lib/events";
import { pageMetadata, pageGraph, eventEntity } from "@/lib/seo";
import { EventPage } from "./EventPage";
import { JsonLd } from "./JsonLd";

export function eventMetadata(slug: string, locale: Locale) {
  const show = getShow(slug);
  if (!show) notFound();
  const title = `Caribbean Voodoo ${locale === "es" ? "en" : "at"} ${show.venue} · ${show.dateLabel[locale]} ${show.startDateTime.slice(0, 4)}`;
  return pageMetadata(
    locale,
    showPath(slug, locale),
    title,
    show.description[locale],
    show.flyer,
  );
}
export function EventRoute({ slug, locale }: { slug: string; locale: Locale }) {
  const show = getShow(slug);
  if (!show) notFound();
  const now = Date.now();
  const path = showPath(slug, locale);
  const event = eventEntity(show, locale, path, now);
  return (
    <>
      <JsonLd
        data={pageGraph(
          locale,
          path,
          show.name,
          show.description[locale],
          event ? [event] : [],
        )}
      />
      <EventPage
        show={show}
        past={isPastShow(show, now)}
        otherShows={upcomingShows(shows, now).filter((s) => s.slug !== slug)}
      />
    </>
  );
}
