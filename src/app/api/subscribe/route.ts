import { NextResponse } from "next/server";

/**
 * Signup capture endpoint — Klaviyo.
 *
 * Subscribes the profile to the email marketing channel, and additionally to
 * SMS marketing if a phone number was provided (the consent copy on the form
 * only promises "correos y mensajes" when a phone is given).
 *
 * Requires env vars:
 *   KLAVIYO_PRIVATE_API_KEY — private API key with profile/subscription write scope
 *   KLAVIYO_LIST_ID         — the list new signups should join
 * See .env.local.example.
 */

const KLAVIYO_API_URL =
  "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs";
const KLAVIYO_REVISION = "2024-10-15";

export async function POST(request: Request) {
  let body: { email?: string; phone?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
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

  const subscriptions: Record<string, unknown> = {
    email: { marketing: { consent: "SUBSCRIBED" } },
  };
  if (phone) {
    subscriptions.sms = { marketing: { consent: "SUBSCRIBED" } };
  }

  const payload = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                ...(phone ? { phone_number: phone } : {}),
                subscriptions,
              },
            },
          ],
        },
      },
      relationships: {
        list: { data: { type: "list", id: listId } },
      },
    },
  };

  const res = await fetch(KLAVIYO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: KLAVIYO_REVISION,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[subscribe] Klaviyo error", res.status, detail);
    return NextResponse.json({ error: "Signup failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
