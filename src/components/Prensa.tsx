"use client";

import { siteConfig } from "@/data/site.config";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Prensa.module.css";

export function Prensa() {
  const { contact, pressKitUrl } = siteConfig;
  const { t } = useLocale();

  return (
    <section id="prensa" className={styles.section}>
      <div className={styles.wrap}>
        <Eyebrow rotate={2}>{t.prensa.eyebrow}</Eyebrow>
        <h2 className={`${ui.headline} ${styles.headline}`}>
          {t.prensa.headline}
        </h2>
        <p className={styles.copy}>{t.prensa.copy}</p>
        <div className={styles.actions}>
          <a
            href={`mailto:${contact.email}`}
            className={`${ui.btn} ${ui.solid} ${styles.btn}`}
          >
            {t.prensa.contacto}
          </a>
          <a
            href={pressKitUrl}
            target="_blank"
            rel="noopener"
            className={`${ui.btn} ${ui.ghost} ${styles.btn} ${styles.btnGhost}`}
          >
            {t.prensa.pressKit}
          </a>
        </div>
        <div className={styles.contactLine}>
          <a href={`mailto:${contact.email}`} className={styles.contactLink}>
            {contact.email}
          </a>
          <span className={styles.separator} aria-hidden="true">
            ·
          </span>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener"
            className={styles.contactLink}
          >
            {t.prensa.whatsapp} {contact.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
