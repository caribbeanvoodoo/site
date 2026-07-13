"use client";

import { shows as defaultShows, type Show } from "@/data/shows";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Fechas.module.css";

/**
 * Fechas auto-switches between its two states based on the data:
 *   - no shows  -> honest "Nuevas fechas muy pronto" placeholder
 *   - has shows -> "Próximas fechas" list
 * Pass `shows` to override the default data source.
 */
export function Fechas({ shows = defaultShows }: { shows?: Show[] }) {
  const { t } = useLocale();
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
              {shows.map((show, i) => (
                <div className={styles.row} key={`${show.city}-${show.date}-${i}`}>
                  <div>
                    <div className={styles.city}>{show.city}</div>
                    <div className={styles.venue}>{show.venue}</div>
                  </div>
                  <div className={styles.rowRight}>
                    <span className={styles.date}>{show.date}</span>
                    <a
                      href={show.ticketsUrl ?? "#lista"}
                      {...(show.ticketsUrl
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                      className={`${ui.btn} ${ui.solid} ${styles.tickets}`}
                    >
                      {t.fechas.tickets}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
