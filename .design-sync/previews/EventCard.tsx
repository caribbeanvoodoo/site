import * as React from "react";
import { EventCard } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cv-root" style={{ background: "#080c0a", padding: 40 }}>{children}</div>
);

export const Single = () => (
  <Frame>
    <EventCard city="Tulum, Q. Roo" venue="Karunna" date="20 ago" href="#" />
  </Frame>
);

export const FreeShow = () => (
  <Frame>
    <EventCard
      city="León, Gto."
      venue="Rockstar Burger, Feria de León"
      date="22 ago"
      ctaLabel="Ver"
      href="#"
    />
  </Frame>
);
