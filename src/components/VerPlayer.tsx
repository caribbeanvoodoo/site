"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import styles from "./Ver.module.css";

/**
 * Poster + play button for the pinned "Ver" video. Clicking play swaps the
 * poster for an inline YouTube embed (no page navigation).
 */
export function VerPlayer({
  videoId,
  caption,
  title,
  playAria,
}: {
  videoId: string;
  caption: string;
  title: string;
  playAria: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
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

  return (
    <button
      type="button"
      onClick={() => {
        track("video_play", { videoId });
        setPlaying(true);
      }}
      className={styles.frame}
      aria-label={playAria}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className={styles.poster}
        width={900}
        height={506}
        onError={(e) => {
          // Not every video has a maxres thumbnail; YouTube serves a grey
          // 120x90 placeholder instead. hqdefault always exists.
          const img = e.currentTarget;
          const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          if (!img.src.endsWith("hqdefault.jpg")) img.src = fallback;
        }}
      />
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
