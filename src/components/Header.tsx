"use client";

import { useLocale } from "@/i18n/LocaleContext";
import styles from "./Header.module.css";

export function Header() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className={styles.header}>
      <a href="#portada" className={styles.logoLink} aria-label="Caribbean Voodoo — inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo_gold.png" alt="Caribbean Voodoo" className={styles.logo} />
      </a>
      <div className={styles.right}>
        <div className={styles.langToggle} role="group" aria-label="Idioma / Language">
          <button
            type="button"
            className={styles.langBtn}
            aria-pressed={locale === "es"}
            onClick={() => setLocale("es")}
          >
            ES
          </button>
          <span className={styles.langDivider} aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            className={styles.langBtn}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>
        <a href="#lista" className={styles.cta}>
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
