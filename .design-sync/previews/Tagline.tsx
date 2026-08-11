import * as React from "react";
import { Tagline, Headline } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cv-root" style={{ background: "#050605", padding: 40, textAlign: "center" }}>
    {children}
  </div>
);

export const Default = () => (
  <Frame>
    <Tagline>Rock and Roll from Tulum</Tagline>
  </Frame>
);

export const UnderLogo = () => (
  <Frame>
    <Headline size="lg">Caribbean Voodoo</Headline>
    <div style={{ marginTop: 18 }}>
      <Tagline>Rock and Roll from Tulum</Tagline>
    </div>
  </Frame>
);
