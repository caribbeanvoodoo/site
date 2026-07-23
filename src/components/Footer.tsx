"use client";

import { siteConfig } from "@/data/site.config";
import { useLocale } from "@/i18n/LocaleContext";
import styles from "./Footer.module.css";

export function Footer() {
  const { social, contact } = siteConfig;
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo_gold.png"
        alt="Caribbean Voodoo"
        className={styles.logo}
        width={717}
        height={317}
        loading="lazy"
      />
      <div className={styles.social}>
        <a href={social.instagram} target="_blank" rel="noopener" className={styles.socialLink}>
          Instagram
        </a>
        <a href={social.youtube} target="_blank" rel="noopener" className={styles.socialLink}>
          YouTube
        </a>
        <a href={social.spotify} target="_blank" rel="noopener" className={styles.socialLink}>
          Spotify
        </a>
      </div>
      <div className={styles.email}>
        <a href={`mailto:${contact.email}`} className={styles.emailLink}>
          {contact.email}
        </a>
      </div>
      <div className={styles.script}>{t.footer.script}</div>
      <div className={styles.copyright}>{t.footer.copyright}</div>
    </footer>
  );
}
