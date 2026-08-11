import * as React from "react";

export interface TaglineProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Wide-tracked, small-caps Work Sans label — the "ROCK AND ROLL FROM TULUM"
 * treatment. Use for short taglines and eyebrow-style UI labels (not body copy).
 */
export function Tagline({ children, className }: TaglineProps) {
  const cls = ["cv-tagline", className || ""].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
