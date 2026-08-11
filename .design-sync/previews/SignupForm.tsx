import * as React from "react";
import { SignupForm, Section, GlyphDivider, Eyebrow, Headline } from "caribbean-voodoo-ds";

export const InContext = () => (
  <div className="cv-root">
    <Section tone="lista" center glow>
      <GlyphDivider />
      <Eyebrow bright>Únete a la lista</Eyebrow>
      <Headline size="lg">Entra al culto</Headline>
      <div style={{ marginTop: 28 }}>
        <SignupForm />
      </div>
    </Section>
  </div>
);

export const Standalone = () => (
  <div className="cv-root" style={{ background: "#070d0b", padding: 40 }}>
    <SignupForm />
  </div>
);

export const WithError = () => (
  <div className="cv-root" style={{ background: "#070d0b", padding: 40 }}>
    <SignupForm error="Ingresa un correo válido" />
  </div>
);

export const English = () => (
  <div className="cv-root" style={{ background: "#070d0b", padding: 40 }}>
    <SignupForm
      emailLabel="Email"
      emailPlaceholder="you@email.com"
      phoneLabel="Phone for SMS"
      phoneOptional="(optional)"
      consent="I agree to receive emails and texts from Caribbean Voodoo. I can leave the cult whenever I want."
      submitLabel="Join"
      privacy="We use your email and phone only to send you band news. Unsubscribe anytime."
    />
  </div>
);
