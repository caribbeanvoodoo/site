"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import {
  EMAIL_RE,
  hasJoined,
  persistSignup,
  submitSignup,
  type SignupErrorKind,
} from "@/lib/signup";
import { useLocale } from "@/i18n/LocaleContext";
import ui from "./ui.module.css";
import styles from "./Lista.module.css";

/** Ties the inline error text to whichever field caused it. */
const ERROR_ID = "signup-error";

export function SignupForm() {
  const { t } = useLocale();
  const [joined, setJoined] = useState(false);
  const [errorKind, setErrorKind] = useState<SignupErrorKind | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Persisted success state: a returning signed-up visitor sees the
  // confirmation, not the form. Runs after mount to avoid hydration mismatch.
  useEffect(() => {
    if (hasJoined()) setJoined(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const consent = (form.elements.namedItem("consent") as HTMLInputElement).checked;

    if (!EMAIL_RE.test(email)) {
      setErrorKind("email");
      return;
    }
    if (!consent) {
      setErrorKind("consent");
      return;
    }

    setErrorKind(null);
    setSubmitting(true);
    try {
      await submitSignup({ email, phone: phone || undefined, consent });
      persistSignup({ email, phone: phone || undefined, consent });
      // The page's core conversion. `withPhone` shows how many fans also opt
      // into SMS, which is what justifies setting up SMS sending in Klaviyo.
      track("signup", { withPhone: Boolean(phone) });
      setJoined(true);
    } catch {
      setErrorKind("network");
    } finally {
      setSubmitting(false);
    }
  }

  if (joined) {
    return (
      <div className={styles.confirm} role="status">
        <div className={styles.confirmGlyph} aria-hidden="true">
          ⛧
        </div>
        <div className={styles.confirmScript}>{t.lista.confirmScript}</div>
        <p className={styles.confirmCopy}>{t.lista.confirmCopy}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>{t.lista.emailLabel}</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={t.lista.emailPlaceholder}
          className={styles.input}
          aria-invalid={errorKind === "email"}
          aria-describedby={errorKind === "email" ? ERROR_ID : undefined}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          {t.lista.phoneLabel} <span className={styles.optional}>{t.lista.phoneOptional}</span>
        </span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.lista.phonePlaceholder}
          className={styles.input}
        />
      </label>

      <label className={styles.consent}>
        <input
          name="consent"
          type="checkbox"
          className={styles.checkbox}
          aria-invalid={errorKind === "consent"}
          aria-describedby={errorKind === "consent" ? ERROR_ID : undefined}
        />
        <span className={styles.consentText}>{t.lista.consent}</span>
      </label>

      {errorKind && (
        <div id={ERROR_ID} className={styles.error} role="alert">
          {t.lista.errors[errorKind]}
        </div>
      )}

      <button
        type="submit"
        className={`${ui.btn} ${ui.solid} ${styles.submit}`}
        disabled={submitting}
      >
        {submitting ? t.lista.submitting : t.lista.submit}
      </button>
    </form>
  );
}
