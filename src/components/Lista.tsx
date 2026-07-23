"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { SignupForm } from "./SignupForm";
import styles from "./Lista.module.css";

export function Lista() {
  const { t } = useLocale();

  return (
    <section id="lista" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/hecate_gold.png"
        alt=""
        aria-hidden="true"
        className={styles.hecate}
        loading="lazy"
      />

      <div className={styles.inner}>
        <div className={styles.glyphs} aria-hidden="true">
          ✷ &nbsp;☾&nbsp; ⛧ &nbsp;☾&nbsp; ✷
        </div>
        <div className={styles.eyebrow}>{t.lista.eyebrow}</div>
        <h2 className={styles.headline}>{t.lista.headline}</h2>
        <p className={styles.hook}>{t.lista.hook}</p>

        <SignupForm />
      </div>
    </section>
  );
}
