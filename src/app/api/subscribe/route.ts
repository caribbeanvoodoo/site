import { NextResponse } from "next/server";

/**
 * Signup capture endpoint — Klaviyo.
 *
 * Subscribes the profile to the email marketing channel, and additionally to
 * SMS marketing when a phone number is provided.
 *
 * SMS degrades gracefully: Klaviyo rejects an SMS subscription unless a sending
 * number is configured for the phone's region, and the account currently has no
 * SMS sending set up. Rather than lose the signup entirely over that, we retry
 * without the SMS subscription — the phone number is still saved on the profile,
 * so those numbers are waiting to be subscribed once SMS sending is configured.
 * Email capture is the primary goal and must never fail because of the phone.
 *
 * Requires env vars:
 *   KLAVIYO_PRIVATE_API_KEY — private API key with profile/subscription write scope
 *   KLAVIYO_LIST_ID         — the list new signups should join
 * See .env.local.example.
 */

const KLAVIYO_API_URL =
  "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs";
const KLAVIYO_REVISION = "2024-10-15";

function buildPayload(opts: {
  email: string;
  phone?: string;
  listId: string;
  includeSms: boolean;
}) {
  const subscriptions: Record<string, unknown> = {
    email: { marketing: { consent: "SUBSCRIBED" } },
  };
  if (opts.phone && opts.includeSms) {
    subscriptions.sms = { marketing: { consent: "SUBSCRIBED" } };
  }

  return {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: opts.email,
                ...(opts.phone ? { phone_number: opts.phone } : {}),
                subscriptions,
              },
            },
          ],
        },
      },
      relationships: {
        list: { data: { type: "list", id: opts.listId } },
      },
    },
  };
}

async function postToKlaviyo(payload: unknown, apiKey: string) {
  return fetch(KLAVIYO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: KLAVIYO_REVISION,
    },
    body: JSON.stringify(payload),
  });
}

/** True when Klaviyo's rejection is specifically about the phone number. */
function isPhoneError(body: string): boolean {
  return body.includes("phone_number");
}

export async function POST(request: Request) {
  let body: { email?: string; phone?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim() || undefined;
  if (!email || !body.consent) {
    return NextResponse.json({ error: "email and consent required" }, { status: 422 });
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!apiKey || !listId) {
    console.error(
      "[subscribe] Missing KLAVIYO_PRIVATE_API_KEY or KLAVIYO_LIST_ID env vars",
    );
    return NextResponse.json({ error: "Signup is not configured" }, { status: 500 });
  }

  let res = await postToKlaviyo(
    buildPayload({ email, phone, listId, includeSms: true }),
    apiKey,
  );

  // Retry without SMS if the phone number was the only thing Klaviyo objected to.
  if (!res.ok && phone) {
    const detail = await res.text().catch(() => "");
    if (isPhoneError(detail)) {
      console.warn(
        "[subscribe] SMS subscription rejected, retrying email-only (phone still saved):",
        detail,
      );
      res = await postToKlaviyo(
        buildPayload({ email, phone, listId, includeSms: false }),
        apiKey,
      );
    } else {
      console.error("[subscribe] Klaviyo error", res.status, detail);
      return NextResponse.json({ error: "Signup failed" }, { status: 502 });
    }
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[subscribe] Klaviyo error", res.status, detail);
    return NextResponse.json({ error: "Signup failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
