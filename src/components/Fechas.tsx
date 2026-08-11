"use client";

import Link from "next/link";
import { shows as defaultShows, type Show } from "@/data/shows";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Fechas.module.css";

/**
 * Fechas auto-switches between its two states based on the data:
 *   - no shows  -> honest "Nuevas fechas muy pronto" placeholder
 *   - has shows -> "Próximas fechas" list, each row linking to its event page
 * Pass `shows` to override the default data source.
 */
export function Fechas({ shows = defaultShows }: { shows?: Show[] }) {
  const { locale, t } = useLocale();
  const hasShows = shows.length > 0;

  return (
    <section id="fechas" className={styles.section}>
      <div className={styles.wrap}>
        <Eyebrow rotate={2}>{t.fechas.eyebrow}</Eyebrow>

        {!hasShows ? (
          <>
            <h2 className={`${ui.headline} ${styles.headline}`}>{t.fechas.emptyHeadline}</h2>
            <p className={styles.copy}>{t.fechas.emptyCopy}</p>
            <a href="#lista" className={`${ui.btn} ${ui.ghost} ${styles.cta}`}>
              {t.fechas.cta}
            </a>
          </>
        ) : (
          <>
            <h2 className={`${ui.headline} ${styles.headline} ${styles.headlineListed}`}>
              {t.fechas.listedHeadline}
            </h2>
            <div className={styles.list}>
              {shows.map((show) => (
                <Link href={`/fechas/${show.slug}`} className={styles.row} key={show.slug}>
                  <div>
                    <span className={styles.city}>{show.city}</span>
                    <span className={styles.venue}>{show.venue}</span>
                  </div>
                  <div className={styles.rowRight}>
                    <span className={styles.date}>{show.dateLabel[locale]}</span>
                    <span className={`${ui.btn} ${ui.solid} ${styles.tickets}`}>
                      {t.fechas.details}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
