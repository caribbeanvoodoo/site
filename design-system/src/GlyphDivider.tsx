import * as React from "react";

export interface GlyphDividerProps {
  /** The glyph row. Defaults to the coven divider `✷ ☾ ⛧ ☾ ✷`. Occult glyphs
   *  only — used sparingly as a divider, never as wallpaper. */
  glyphs?: string;
  className?: string;
}

/**
 * A centered row of moon/star/sigil glyphs used as a delicate divider above a
 * headline (most notably above "Entra al culto"). Decorative — hidden from
 * assistive tech.
 */
export function GlyphDivider({ glyphs = "✷  ☾  ⛧  ☾  ✷", className }: GlyphDividerProps) {
  const cls = ["cv-glyphs", className || ""].filter(Boolean).join(" ");
  return (
    <div className={cls} aria-hidden="true">
      {glyphs}
    </div>
  );
}
