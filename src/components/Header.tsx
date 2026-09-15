"use client";

import { track } from "@vercel/analytics";
import { useLocale } from "@/i18n/LocaleContext";
import { usePathname } from "next/navigation";
import { routes, translatePath } from "@/i18n/routes";
import styles from "./Header.module.css";

export function Header() {
  const { locale, t } = useLocale();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <a
        href={`${routes.home[locale]}#portada`}
        className={styles.logoLink}
        aria-label={
          locale === "es"
            ? "Caribbean Voodoo — inicio"
            : "Caribbean Voodoo — home"
        }
      >
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
        <div
          className={styles.langToggle}
          role="group"
          aria-label="Idioma / Language"
        >
          <a
            className={styles.langBtn}
            href={translatePath(pathname, "es")}
            aria-current={locale === "es" ? "page" : undefined}
            onClick={() => track("locale_toggle", { to: "es" })}
          >
            ES
          </a>
          <span className={styles.langDivider} aria-hidden="true">
            ·
          </span>
          <a
            className={styles.langBtn}
            href={translatePath(pathname, "en")}
            aria-current={locale === "en" ? "page" : undefined}
            onClick={() => track("locale_toggle", { to: "en" })}
          >
            EN
          </a>
        </div>
        <a href={`${routes.home[locale]}#lista`} className={styles.cta}>
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
