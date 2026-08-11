import * as React from "react";
import { GlyphDivider, Eyebrow, Headline } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cv-root" style={{ background: "#070d0b", padding: 40, textAlign: "center" }}>
    {children}
  </div>
);

export const Default = () => (
  <Frame>
    <GlyphDivider />
  </Frame>
);

export const AboveHeadline = () => (
  <Frame>
    <GlyphDivider />
    <div style={{ marginTop: 14 }}>
      <Eyebrow bright>Únete a la lista</Eyebrow>
    </div>
    <Headline size="lg">Entra al culto</Headline>
  </Frame>
);

export const HeroCorner = () => (
  <Frame>
    <GlyphDivider glyphs="☾ ✶ ✷" />
  </Frame>
);
