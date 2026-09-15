"use client";

import { musicPath } from "@/i18n/routes";
import { track } from "@vercel/analytics";
import { albums, type Album } from "@/data/albums";
import { useLocale } from "@/i18n/LocaleContext";
import { Eyebrow } from "./Eyebrow";
import ui from "./ui.module.css";
import styles from "./Escuchar.module.css";

/** Which album + platform a fan chose is the useful signal, so tag every click. */
const onStreamingClick = (albumId: string, platform: string) => () =>
  track("streaming_click", { album: albumId, platform });

function AlbumBlock({ album, featured }: { album: Album; featured: boolean }) {
  const { locale, t } = useLocale();

  return (
    <div className={`${styles.grid} ${featured ? "" : styles.gridSecondary}`}>
      <div className={styles.coverWrap}>
        <div className={styles.coverGlow} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={album.cover}
          alt={`${album.title}, ${album.label[locale]}`}
          className={styles.cover}
          width={900}
          height={900}
          loading={featured ? undefined : "lazy"}
        />
      </div>
      <div>
        <h3 className={`${ui.headline} ${styles.headline}`}>
          <a
            href={musicPath(album.slug, locale)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {album.title}
          </a>
        </h3>
        <div className={styles.label}>{album.label[locale]}</div>
        <p className={styles.copy}>{album.copy[locale]}</p>

        {album.tracks && album.tracks.length > 0 && (
          <div className={styles.tracklist}>
            <div className={styles.tracklistLabel}>{t.escuchar.tracklist}</div>
            <ol className={styles.tracks}>
              {album.tracks.map((title) => (
                <li key={title} className={styles.track}>
                  {title}
                </li>
              ))}
            </ol>
          </div>
        )}

        {album.streamingIsSingle && (
          <p className={styles.copy}>
            {locale === "es"
              ? "Escucha el sencillo Kamikaze:"
              : "Listen to the single Kamikaze:"}
          </p>
        )}
        <div className={styles.pills}>
          <a
            href={album.streaming.spotify}
            target="_blank"
            rel="noopener"
            onClick={onStreamingClick(album.id, "spotify")}
            className={`${ui.btn} ${ui.solid} ${styles.pill}`}
          >
            Spotify
          </a>
          <a
            href={album.streaming.youtube}
            target="_blank"
            rel="noopener"
            onClick={onStreamingClick(album.id, "youtube")}
            className={`${ui.btn} ${ui.ghost} ${styles.pill} ${styles.pillGhost}`}
          >
            {t.escuchar.youtube}
          </a>
          <a
            href={album.streaming.appleMusic}
            target="_blank"
            rel="noopener"
            onClick={onStreamingClick(album.id, "apple_music")}
            className={`${ui.btn} ${ui.ghost} ${styles.pill} ${styles.pillGhost}`}
          >
            {t.escuchar.appleMusic}
          </a>
          <a
            href={album.streaming.more}
            target="_blank"
            rel="noopener"
            onClick={onStreamingClick(album.id, "more_platforms")}
            className={`${ui.btn} ${ui.neutral} ${styles.pill}`}
          >
            {t.escuchar.more}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Escuchar() {
  const { t } = useLocale();
  const [featured, ...rest] = albums;

  return (
    <section id="escuchar" className={styles.section}>
      <div className={styles.wrap}>
        <Eyebrow rotate={3}>{t.escuchar.eyebrow}</Eyebrow>

        <AlbumBlock album={featured} featured />

        {rest.length > 0 && (
          <>
            <div className={styles.previousLabel}>
              {t.escuchar.previousRelease}
            </div>
            {rest.map((album) => (
              <AlbumBlock key={album.id} album={album} featured={false} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
