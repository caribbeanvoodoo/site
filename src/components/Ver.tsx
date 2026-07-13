import { siteConfig } from "@/data/site.config";
import { resolveLatestVideoId } from "@/lib/youtube";
import styles from "./Ver.module.css";
import { VerContent } from "./VerContent";

export async function Ver() {
  const { video } = siteConfig;
  const videoId = await resolveLatestVideoId(siteConfig.youtubeChannelHandle);

  return (
    <section id="ver" className={styles.section}>
      <VerContent videoId={videoId} fallbackHref={video.posterHref} caption={video.caption} />
    </section>
  );
}
