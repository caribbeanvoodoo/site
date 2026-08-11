import * as React from "react";
import { Headline } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cv-root" style={{ background: "#050605", padding: 40 }}>{children}</div>
);

export const Sizes = () => (
  <Frame>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Headline size="sm">Para bookers y prensa</Headline>
      <Headline size="md">Nacidos en Tulum</Headline>
      <Headline size="lg">Entra al culto</Headline>
    </div>
  </Frame>
);

export const AsH1 = () => (
  <Frame>
    <Headline as="h1" size="lg">
      Serpientes
    </Headline>
  </Frame>
);
