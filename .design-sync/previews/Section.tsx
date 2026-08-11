import * as React from "react";
import { Section, Eyebrow, Headline, Button } from "caribbean-voodoo-ds";

export const Escuchar = () => (
  <div className="cv-root">
    <Section tone="panel">
      <Eyebrow>Escuchar</Eyebrow>
      <Headline>Serpientes</Headline>
      <p className="cv-copy" style={{ maxWidth: 440, margin: "16px 0 24px" }}>
        Nuestro álbum más reciente. Trece canciones grabadas entre Tulum y Buenos Aires, con la
        esencia cruda y potente de la banda.
      </p>
      <Button variant="solid">Spotify</Button>
    </Section>
  </div>
);

export const Centerpiece = () => (
  <div className="cv-root">
    <Section tone="lista" center glow>
      <Eyebrow bright>Únete a la lista</Eyebrow>
      <Headline size="lg">Entra al culto</Headline>
      <p className="cv-copy" style={{ maxWidth: 420, margin: "18px auto 0" }}>
        Acceso anticipado al nuevo álbum y al cortometraje, directo a tu correo.
      </p>
    </Section>
  </div>
);

export const Black = () => (
  <div className="cv-root">
    <Section tone="black" center>
      <Eyebrow rotate={-2}>Ver</Eyebrow>
      <Headline>En vivo desde el jardín</Headline>
    </Section>
  </div>
);
