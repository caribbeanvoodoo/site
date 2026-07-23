import { siteConfig } from "@/data/site.config";
import styles from "./Ver.module.css";
import { VerContent } from "./VerContent";

export function Ver() {
  const { video } = siteConfig;

  return (
    <section id="ver" className={styles.section}>
      <VerContent videoId={video.videoId} caption={video.caption} />
    </section>
  );
}
