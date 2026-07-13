export interface SignupPayload {
  email: string;
  phone?: string;
  consent: boolean;
}

export const STORAGE_KEY = "cv_join";

// Matches the prototype's validation exactly.
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Error kind — the message text itself is localized, see i18n/dictionaries.ts. */
export type SignupErrorKind = "email" | "consent" | "network";

/**
 * Submit a signup to the capture backend.
 *
 * ─── STUB ────────────────────────────────────────────────────────────────
 * No email/SMS provider is configured in this repo. This posts to the local
 * /api/subscribe route, which itself is a stub that just logs the payload.
 * Before launch, wire /api/subscribe (see src/app/api/subscribe/route.ts) to a
 * real provider — Klaviyo, Mailchimp + Twilio, Beehiiv, etc.
 * ─────────────────────────────────────────────────────────────────────────
 */
export async function submitSignup(payload: SignupPayload): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Signup failed: ${res.status}`);
  }
}

export function persistSignup(payload: SignupPayload): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ email: payload.email, phone: payload.phone ?? "", t: Date.now() }),
    );
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}

export function hasJoined(): boolean {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}
