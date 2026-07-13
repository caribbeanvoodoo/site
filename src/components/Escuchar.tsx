"use client";

import { siteConfig } from "@/data/site.config";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Escuchar.module.css";

export function Escuchar() {
  const { streaming } = siteConfig;
  const { t } = useLocale();

  return (
    <section id="escuchar" className={styles.section}>
      <div className={styles.wrap}>
        <Eyebrow rotate={3}>{t.escuchar.eyebrow}</Eyebrow>
        <div className={styles.grid}>
          <div className={styles.coverWrap}>
            <div className={styles.coverGlow} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/serpientes_cover.png" alt="Serpientes, 2025" className={styles.cover} />
          </div>
          <div>
            <h2 className={`${ui.headline} ${styles.headline}`}>Serpientes</h2>
            <div className={styles.label}>{t.escuchar.label}</div>
            <p className={styles.copy}>{t.escuchar.copy}</p>
            <div className={styles.pills}>
              <a
                href={streaming.spotify}
                target="_blank"
                rel="noopener"
                className={`${ui.btn} ${ui.solid} ${styles.pill}`}
              >
                Spotify
              </a>
              <a
                href={streaming.youtube}
                target="_blank"
                rel="noopener"
                className={`${ui.btn} ${ui.ghost} ${styles.pill} ${styles.pillGhost}`}
              >
                {t.escuchar.youtube}
              </a>
              <a
                href={streaming.appleMusic}
                target="_blank"
                rel="noopener"
                className={`${ui.btn} ${ui.ghost} ${styles.pill} ${styles.pillGhost}`}
              >
                {t.escuchar.appleMusic}
              </a>
              <a
                href={streaming.more}
                target="_blank"
                rel="noopener"
                className={`${ui.btn} ${ui.neutral} ${styles.pill}`}
              >
                {t.escuchar.more}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
