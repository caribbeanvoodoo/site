import * as React from "react";
import { Eyebrow, Headline } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cv-root" style={{ background: "#050605", padding: 40 }}>{children}</div>
);

export const AboveHeadline = () => (
  <Frame>
    <Eyebrow>Nosotros</Eyebrow>
    <Headline>Nacidos en Tulum</Headline>
  </Frame>
);

export const Bright = () => (
  <Frame>
    <Eyebrow bright>Únete a la lista</Eyebrow>
    <Headline size="lg">Entra al culto</Headline>
  </Frame>
);

export const Labels = () => (
  <Frame>
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Eyebrow>Escuchar</Eyebrow>
      <Eyebrow rotate={-2}>Ver</Eyebrow>
      <Eyebrow>Booking y prensa</Eyebrow>
    </div>
  </Frame>
);
