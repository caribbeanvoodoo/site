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
      <div className={styles.grid}>
        <div className={styles.photoWrap}>
          <div className={styles.photoGlow} aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/band_bw.png" alt="Caribbean Voodoo" className={styles.photo} />
        </div>
        <div>
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
      </div>
    </section>
  );
}
