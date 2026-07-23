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

  // Escalating fallback. The email is the thing we must never lose, so each
  // step strips away only the phone-related part Klaviyo objected to:
  //   1. email + phone + SMS consent      — the ideal outcome
  //   2. email + phone, no SMS consent    — no SMS sending number for that
  //                                         region; the number is still worth
  //                                         keeping for when SMS is enabled
  //   3. email only                       — the number itself is unusable
  //                                         (bad format); drop it rather than
  //                                         throw away the signup
  const attempts: Array<{ label: string; payload: unknown }> = [
    { label: "email+phone+sms", payload: buildPayload({ email, phone, listId, includeSms: true }) },
  ];
  if (phone) {
    attempts.push(
      { label: "email+phone", payload: buildPayload({ email, phone, listId, includeSms: false }) },
      { label: "email-only", payload: buildPayload({ email, listId, includeSms: false }) },
    );
  }

  let lastStatus = 0;
  let lastDetail = "";

  for (const [i, attempt] of attempts.entries()) {
    const res = await postToKlaviyo(attempt.payload, apiKey);
    if (res.ok) {
      if (i > 0) {
        console.warn(
          `[subscribe] captured via fallback "${attempt.label}" after Klaviyo rejected the phone:`,
          lastDetail,
        );
      }
      return NextResponse.json({ ok: true });
    }

    lastStatus = res.status;
    lastDetail = await res.text().catch(() => "");

    // Only a phone-specific rejection is worth retrying; anything else
    // (bad key, bad list, outage) will fail identically every time.
    if (!isPhoneError(lastDetail)) break;
  }

  console.error("[subscribe] Klaviyo error", lastStatus, lastDetail);
  return NextResponse.json({ error: "Signup failed" }, { status: 502 });
}
