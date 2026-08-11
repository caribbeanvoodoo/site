import * as React from "react";
import { Button } from "./Button";

export interface EventCardProps {
  /** City line (bold), e.g. "Tulum, Q. Roo". */
  city: string;
  /** Venue line (muted), e.g. "Karunna". */
  venue: string;
  /** Short date, e.g. "20 ago". */
  date: string;
  /** CTA label. Default "Ver". */
  ctaLabel?: string;
  /** Where the row/CTA links. */
  href?: string;
  className?: string;
}

/**
 * A single show row for the "Fechas" list: city + venue on the left, date and a
 * small gold CTA on the right. Stack several inside an `EventList` (they share
 * hairline dividers). The whole row links to the event's detail page.
 */
export function EventCard({ city, venue, date, ctaLabel = "Ver", href, className }: EventCardProps) {
  const cls = ["cv-event", className || ""].filter(Boolean).join(" ");
  return (
    <a className={cls} href={href}>
      <span>
        <span className="cv-event__city">{city}</span>
        <span className="cv-event__venue">{venue}</span>
      </span>
      <span className="cv-event__right">
        <span className="cv-event__date">{date}</span>
        <Button variant="solid" size="sm">
          {ctaLabel}
        </Button>
      </span>
    </a>
  );
}

export interface EventListProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Bordered container that groups `EventCard` rows with gold hairline dividers.
 */
export function EventList({ children, className }: EventListProps) {
  const cls = ["cv-events", className || ""].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
