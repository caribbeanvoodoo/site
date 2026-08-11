import * as React from "react";

export interface HeadlineProps {
  children?: React.ReactNode;
  /** Heading level for semantics. Default `h2`. */
  as?: "h1" | "h2" | "h3";
  /** Size ramp. `md` default; `lg` for the hero/centerpiece. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Gold Bagel Fat One display headline — the only face used for H1/H2 titles,
 * always in gold. Usually preceded by an `Eyebrow`.
 */
export function Headline({ children, as = "h2", size = "md", className }: HeadlineProps) {
  const Tag = as;
  const cls = ["cv-headline", size !== "md" ? `cv-headline--${size}` : "", className || ""]
    .filter(Boolean)
    .join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
