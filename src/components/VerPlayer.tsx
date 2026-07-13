"use client";

import { useState } from "react";
import styles from "./Ver.module.css";

/**
 * Renders the poster/play-button frame. If a real videoId was resolved
 * server-side, clicking play swaps the poster for an inline YouTube embed;
 * otherwise it falls back to linking out to `fallbackHref`.
 */
export function VerPlayer({
  videoId,
  fallbackHref,
  caption,
  title,
  playAria,
}: {
  videoId: string | null;
  fallbackHref: string;
  caption: string;
  title: string;
  playAria: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoId) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.embed}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const posterSrc = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/assets/live_jungle.png";

  if (videoId) {
    return (
      <button type="button" onClick={() => setPlaying(true)} className={styles.frame} aria-label={playAria}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={posterSrc} alt={title} className={styles.poster} />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.play} aria-hidden="true">
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
            <path d="M25 15 L1 29 L1 1 Z" fill="#14100d" />
          </svg>
        </div>
        <div className={styles.caption}>{caption}</div>
      </button>
    );
  }

  return (
    <a href={fallbackHref} target="_blank" rel="noopener" className={styles.frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={posterSrc} alt={title} className={styles.poster} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.play} aria-hidden="true">
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
          <path d="M25 15 L1 29 L1 1 Z" fill="#14100d" />
        </svg>
      </div>
      <div className={styles.caption}>{caption}</div>
    </a>
  );
}
