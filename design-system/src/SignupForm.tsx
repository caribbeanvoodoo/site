import * as React from "react";
import { Button } from "./Button";

export interface SignupFormProps {
  /** Field labels + copy. Default to the brand's Spanish-first wording. */
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phoneOptional?: string;
  phonePlaceholder?: string;
  /** Consent checkbox copy (opt-in to email/SMS). */
  consent?: string;
  /** Submit button text. */
  submitLabel?: string;
  /** Data-use notice shown under the button. */
  privacy?: string;
  /** Optional inline error message shown in blood red above the button. */
  error?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

/**
 * The "Únete a la lista" signup form — email + optional phone + a required
 * consent checkbox + a solid-gold submit, with a small privacy notice. This is
 * the conversion centerpiece; place it in a `Section tone="lista" glow` under a
 * `GlyphDivider` / `Eyebrow` / `Headline`. Presentational — wire `onSubmit`.
 */
export function SignupForm({
  emailLabel = "Correo",
  emailPlaceholder = "tu@correo.com",
  phoneLabel = "Teléfono para SMS",
  phoneOptional = "(opcional)",
  phonePlaceholder = "+52 ...",
  consent = "Acepto recibir correos y mensajes de Caribbean Voodoo. Puedo salir del culto cuando quiera.",
  submitLabel = "Unirme",
  privacy = "Usamos tu correo y teléfono solo para enviarte noticias de la banda. Puedes darte de baja cuando quieras.",
  error,
  onSubmit,
}: SignupFormProps) {
  return (
    <form className="cv-form" onSubmit={onSubmit}>
      <label className="cv-field">
        <span className="cv-label">{emailLabel}</span>
        <input className="cv-input" type="email" inputMode="email" placeholder={emailPlaceholder} />
      </label>
      <label className="cv-field">
        <span className="cv-label">
          {phoneLabel} <span className="cv-label__optional">{phoneOptional}</span>
        </span>
        <input className="cv-input" type="tel" inputMode="tel" placeholder={phonePlaceholder} />
      </label>
      <label className="cv-consent">
        <input className="cv-checkbox" type="checkbox" />
        <span className="cv-consent__text">{consent}</span>
      </label>
      {error ? <div className="cv-form__error">{error}</div> : null}
      <Button variant="solid" size="lg" block type="submit">
        {submitLabel}
      </Button>
      <p className="cv-privacy">{privacy}</p>
    </form>
  );
}
