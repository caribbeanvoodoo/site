"use client";

import { track } from "@vercel/analytics";
import { useLocale } from "@/i18n/LocaleContext";
import type { Locale } from "@/i18n/dictionaries";
import styles from "./Header.module.css";

export function Header() {
  const { locale, setLocale, t } = useLocale();

  // Tells the band whether the English audience is real enough to keep
  // maintaining a second set of copy.
  function chooseLocale(next: Locale) {
    if (next !== locale) track("locale_toggle", { to: next });
    setLocale(next);
  }

  return (
    <header className={styles.header}>
      <a href="#portada" className={styles.logoLink} aria-label="Caribbean Voodoo — inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo_gold.png"
          alt="Caribbean Voodoo"
          className={styles.logo}
          width={717}
          height={317}
        />
      </a>
      <div className={styles.right}>
        <div className={styles.langToggle} role="group" aria-label="Idioma / Language">
          <button
            type="button"
            className={styles.langBtn}
            aria-pressed={locale === "es"}
            onClick={() => chooseLocale("es")}
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
            onClick={() => chooseLocale("en")}
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
