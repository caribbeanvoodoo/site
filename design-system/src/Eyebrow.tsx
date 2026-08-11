import * as React from "react";

export interface EyebrowProps {
  /** The small label text, e.g. "Escuchar", "Únete a la lista". */
  children?: React.ReactNode;
  /** Rotation in degrees (the label sits slightly askew). Default -3. */
  rotate?: number;
  /** Use the brighter blood-red used on the signup centerpiece. */
  bright?: boolean;
  className?: string;
}

/**
 * Red Kaushan-Script "eyebrow" that sits above a section headline. It is the
 * only place the cursive red is used besides the "you're in" success line —
 * never for body copy. Pair it directly above a `Headline`.
 */
export function Eyebrow({ children, rotate = -3, bright, className }: EyebrowProps) {
  const cls = ["cv-eyebrow", bright ? "cv-eyebrow--bright" : "", className || ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </div>
  );
}
