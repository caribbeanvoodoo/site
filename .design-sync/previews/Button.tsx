import * as React from "react";
import { Button } from "caribbean-voodoo-ds";

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="cv-root"
    style={{ background: "#050605", padding: 40, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}
  >
    {children}
  </div>
);

export const Variants = () => (
  <Frame>
    <Button variant="solid">Escuchar</Button>
    <Button variant="ghost">Únete a la lista</Button>
    <Button variant="neutral">Más plataformas</Button>
  </Frame>
);

export const Sizes = () => (
  <Frame>
    <Button variant="solid" size="sm">
      Boletos
    </Button>
    <Button variant="solid" size="md">
      Contacto
    </Button>
    <Button variant="solid" size="lg">
      Unirme
    </Button>
  </Frame>
);

export const Block = () => (
  <div className="cv-root" style={{ background: "#050605", padding: 40, maxWidth: 320 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <Button variant="solid" size="lg" block>
        Escuchar
      </Button>
      <Button variant="ghost" size="lg" block>
        Únete a la lista
      </Button>
    </div>
  </div>
);
