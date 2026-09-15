"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Ver.module.css";
import { VerPlayer } from "./VerPlayer";

export function VerContent({
  videoId,
  caption,
}: {
  videoId: string;
  caption: { es: string; en: string };
}) {
  const { locale, t } = useLocale();

  return (
    <div className={styles.wrap}>
      <Eyebrow rotate={2}>{t.ver.eyebrow}</Eyebrow>
      <h2 className={`${ui.headline} ${styles.headline}`}>{t.ver.headline}</h2>
      <p className={styles.copy}>{t.ver.copy}</p>

      <VerPlayer
        videoId={videoId}
        caption={caption[locale]}
        title={t.ver.headline}
        playAria={t.ver.playAria(t.ver.headline)}
      />
    </div>
  );
}
