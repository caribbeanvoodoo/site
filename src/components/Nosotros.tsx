"use client";

import { members } from "@/data/members";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Nosotros.module.css";

export function Nosotros() {
  const { t } = useLocale();

  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>
        <Eyebrow rotate={3}>{t.nosotros.eyebrow}</Eyebrow>
        <h2 className={`${ui.headline} ${styles.headline}`}>{t.nosotros.headline}</h2>
        <p className={styles.bio}>{t.nosotros.bio}</p>
        <div className={styles.members}>
          {members.map((m) => (
            <div className={styles.member} key={m.name}>
              <div className={styles.memberName}>{m.name}</div>
              <div className={styles.memberRole}>{t.nosotros.roles[m.roleKey]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
