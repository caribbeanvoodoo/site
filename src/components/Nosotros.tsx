"use client";

import { MemberGrid } from "./MemberGrid";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Nosotros.module.css";

export function Nosotros() {
  const { locale, t } = useLocale();

  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>
        <Eyebrow rotate={3}>{t.nosotros.eyebrow}</Eyebrow>
        <h2 className={`${ui.headline} ${styles.headline}`}>{t.nosotros.headline}</h2>
        <p className={styles.bio}>{t.nosotros.bio}</p>
        <MemberGrid locale={locale} />
      </div>
    </section>
  );
}
