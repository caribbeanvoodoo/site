import * as React from "react";

export interface SectionProps {
  children?: React.ReactNode;
  /** Panel background. `panel` (default) is near-black; `black` is the base
   *  page black; `lista` is the darker teal-black of the signup centerpiece. */
  tone?: "panel" | "black" | "lista";
  /** Center the inner content (headlines, forms). */
  center?: boolean;
  /** Show the breathing teal radial glow behind the content. */
  glow?: boolean;
  id?: string;
  className?: string;
}

/**
 * A full-width dark section panel — the page's building block. Sections
 * alternate `panel`/`black` tones for rhythm; the signup centerpiece uses
 * `lista` with `glow`. Put an `Eyebrow` + `Headline` at the top of the inner
 * content.
 */
export function Section({ children, tone = "panel", center, glow, id, className }: SectionProps) {
  const cls = [
    "cv-section",
    tone === "black" ? "cv-section--black" : "",
    tone === "lista" ? "cv-section--lista" : "",
    center ? "cv-section--center" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={cls} id={id}>
      {glow ? <div className="cv-glow" aria-hidden="true" /> : null}
      <div className="cv-section__inner">{children}</div>
    </section>
  );
}
