import * as React from "react";

export interface ButtonProps {
  /** Visual weight. `solid` = gold fill (primary), `ghost` = gold outline,
   *  `neutral` = low-emphasis white outline (rank an option lowest). */
  variant?: "solid" | "ghost" | "neutral";
  /** Size. `md` is the default. */
  size?: "sm" | "md" | "lg";
  /** Full-width block button (used for stacked hero/form CTAs). */
  block?: boolean;
  /** Render as a link. When set, a styled `<a>` is returned instead of `<button>`. */
  href?: string;
  /** Link target (only with `href`). */
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Caribbean Voodoo button. The primary action uses `solid` (gold fill); use
 * `ghost` for secondary actions and `neutral` to visually rank an option lowest
 * (e.g. "more platforms"). Renders an `<a>` when `href` is provided.
 */
export function Button({
  variant = "solid",
  size = "md",
  block,
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled,
  children,
  className,
}: ButtonProps) {
  const cls = [
    "cv-btn",
    `cv-btn--${variant}`,
    size !== "md" ? `cv-btn--${size}` : "",
    block ? "cv-btn--block" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a className={cls} href={href} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
