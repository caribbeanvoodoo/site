import * as React from "react";
import { EventList, EventCard, Eyebrow, Headline } from "caribbean-voodoo-ds";

export const Fechas = () => (
  <div className="cv-root" style={{ background: "#080c0a", padding: 40 }}>
    <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <Eyebrow rotate={-2}>Fechas</Eyebrow>
      <Headline size="sm">Próximas fechas</Headline>
      <div style={{ marginTop: 22 }}>
        <EventList>
          <EventCard city="Tulum, Q. Roo" venue="Karunna" date="20 ago" href="#" />
          <EventCard city="León, Gto." venue="Rockstar Burger, Feria de León" date="22 ago" href="#" />
          <EventCard city="León, Gto." venue="Rockstar Fest — Velaria de la Feria" date="31 oct" href="#" />
        </EventList>
      </div>
    </div>
  </div>
);

export const TwoShows = () => (
  <div className="cv-root" style={{ background: "#080c0a", padding: 40 }}>
    <EventList>
      <EventCard city="Tulum, Q. Roo" venue="Karunna" date="20 ago" href="#" />
      <EventCard city="León, Gto." venue="Rockstar Burger" date="22 ago" href="#" />
    </EventList>
  </div>
);
