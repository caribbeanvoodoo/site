"use client";

import { useLocale } from "@/i18n/LocaleContext";
import ui from "./ui.module.css";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useLocale();

  return (
    <section id="portada" className={styles.hero}>
      <div className={`${styles.glow} cvBreathe`} aria-hidden="true" />
      <div className={styles.corner} aria-hidden="true">
        ☾ ✶ ✷
      </div>

      <div className={styles.inner}>
        {/* The wordmark is an image, so the page had no real <h1>. This gives
            crawlers and screen readers a proper top-level heading without
            changing the visual design. */}
        <h1 className="srOnly">Caribbean Voodoo — {t.hero.tagline}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo_gold.png"
          alt="Caribbean Voodoo"
          className={styles.logo}
          width={717}
          height={317}
          fetchPriority="high"
        />
        <p className={styles.ethos}>{t.hero.ethos}</p>
        <p className={styles.tagline}>{t.hero.tagline}</p>
        <div className={styles.actions}>
          <a href="#escuchar" className={`${ui.btn} ${ui.solid} ${styles.btnLg}`}>
            {t.hero.escuchar}
          </a>
          <a href="#lista" className={`${ui.btn} ${ui.ghost} ${styles.btnLg} ${styles.btnLgGhost}`}>
            {t.hero.lista}
          </a>
        </div>
      </div>

      <a href="#escuchar" className={styles.scrollCue}>
        {t.hero.scrollCue}
        <span className={styles.arrow} aria-hidden="true">
          ↓
        </span>
      </a>
    </section>
  );
}
