"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { Show } from "@/data/shows";
import { useLocale } from "@/i18n/LocaleContext";
import { routes, showPath } from "@/i18n/routes";
import { Header } from "./Header";
import { Footer } from "./Footer";
import ui from "./ui.module.css";
import styles from "./EventPage.module.css";

/** Full calendar date in the given locale, from the literal ISO date parts
 *  (no timezone conversion, so it always shows the venue's local date). */
function formatDate(iso: string, locale: "es" | "en"): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function EventPage({
  show,
  past,
  otherShows,
}: {
  show: Show;
  past: boolean;
  otherShows: Show[];
}) {
  const { locale, t } = useLocale();
  const e = t.fechas.event;

  const dateStr = formatDate(show.startDateTime, locale);
  const when = show.timeTBA
    ? `${dateStr} · ${e.timeTBA}`
    : `${dateStr} · ${show.timeLabel}`;
  const coverStr =
    show.cover === "free"
      ? e.free
      : show.cover === "tba"
        ? e.coverTBA
        : `$${show.cover} MXN`;
  const unavailable =
    past || show.status === "cancelled" || show.status === "postponed";

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.inner}>
          <Link href={routes.shows[locale]} className={styles.back}>
            {e.backToDates}
          </Link>

          <div className={styles.eyebrow}>
            {show.dateLabel[locale]} · {show.city}
          </div>
          <h1 className={styles.headline}>Caribbean Voodoo · {show.venue}</h1>
          {past && (
            <p className={styles.desc}>
              {locale === "es"
                ? "Archivo · Esta fecha ya pasó."
                : "Archive · This date has passed."}
            </p>
          )}
          {show.status === "cancelled" && (
            <p>{locale === "es" ? "Cancelado" : "Cancelled"}</p>
          )}
          {show.status === "postponed" && (
            <p>{locale === "es" ? "Pospuesto" : "Postponed"}</p>
          )}
          <p className={styles.desc}>{show.description[locale]}</p>

          {show.flyer && (
            <div className={styles.flyerWrap}>
              <div className={styles.flyerGlow} aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={show.flyer} alt={show.name} className={styles.flyer} />
            </div>
          )}

          <dl className={styles.meta}>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>{e.when}</dt>
              <dd className={styles.metaValue}>{when}</dd>
            </div>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>{e.where}</dt>
              <dd className={styles.metaValue}>
                {show.venue}
                <span className={styles.metaSub}>{show.address}</span>
              </dd>
            </div>
            {show.lineup && show.lineup.length > 0 && (
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>{e.lineup}</dt>
                <dd className={styles.metaValue}>{show.lineup.join(" · ")}</dd>
              </div>
            )}
            {show.presentedBy && (
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>{e.presentedBy}</dt>
                <dd className={styles.metaValue}>{show.presentedBy}</dd>
              </div>
            )}
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>{e.cover}</dt>
              <dd className={styles.metaValue}>{coverStr}</dd>
            </div>
          </dl>

          <a
            href={
              unavailable
                ? `${routes.home[locale]}#lista`
                : show.cta.href.startsWith("/#")
                  ? `${routes.home[locale]}${show.cta.href.slice(1)}`
                  : show.cta.href
            }
            {...(!unavailable && show.cta.external
              ? { target: "_blank", rel: "noopener" }
              : {})}
            onClick={() => track("event_cta", { slug: show.slug })}
            className={`${ui.btn} ${ui.solid} ${styles.cta}`}
          >
            {unavailable ? t.fechas.cta : show.cta.label[locale]}
          </a>

          {otherShows.length > 0 && (
            <div className={styles.other}>
              <div className={styles.otherLabel}>{e.otherDates}</div>
              <div className={styles.otherList}>
                {otherShows.map((s) => (
                  <Link
                    key={s.slug}
                    href={showPath(s.slug, locale)}
                    className={styles.otherLink}
                  >
                    <span className={styles.otherDate}>
                      {s.dateLabel[locale]}
                    </span>
                    {s.venue} — {s.city}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
