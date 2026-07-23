# Caribbean Voodoo — site

Single-page site for Caribbean Voodoo, live at **https://caribbeanvoodoo.mx**.
Recreated from the design handoff (`../design_handoff_caribbean_voodoo_site/`) as
componentized Next.js code.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **CSS Modules** + a design-token layer in `src/app/globals.css` (chosen over Tailwind
  for pixel-faithful reproduction of the handoff's exact `clamp()` sizes, radial-gradient
  glows, and letter-spacing tokens)
- **Google Fonts** via `next/font/google`: Bagel Fat One, Kaushan Script, Work Sans
- **Klaviyo** for email/SMS signup capture
- **DistroKid HyperFollow** for streaming links
- **Vercel Analytics** for traffic + conversion events
- Custom lightweight **ES/EN toggle** (no routing, persisted per-visitor)

## Run
```bash
npm install
cp .env.local.example .env.local   # fill in Klaviyo keys, see below
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `src/app/page.tsx` — assembles the sections in spec order.
- `src/app/layout.tsx` — metadata (`metadataBase`, OG/Twitter, canonical), `MusicGroup`
  JSON-LD, fonts, Vercel Analytics.
- `src/app/icon.png` / `apple-icon.png` — favicon + app icon (the "O with X" dead-eye mark).
- `src/app/robots.ts` / `sitemap.ts` / `not-found.tsx` — SEO files and branded 404.
- `src/components/` — one component + CSS Module per section. Shared primitives in
  `ui.module.css` / `Eyebrow.tsx`.
- `src/data/site.config.ts` — `SITE_URL` + all swappable links (streaming, video, press kit,
  socials, contact incl. the `wa.me` click-to-chat URL).
- `src/data/shows.ts` — Fechas data; empty array ⇒ "muy pronto" state, filled ⇒ dates list.
- `src/lib/signup.ts` + `src/app/api/subscribe/route.ts` — signup submit → Klaviyo.
- `src/i18n/` — ES/EN dictionaries + `useLocale()` (also keeps `<html lang>` in sync).

## Analytics events
Tracked via `@vercel/analytics` — enable **Web Analytics** in the Vercel project or nothing records.
- `signup` (`withPhone`) — the core conversion
- `streaming_click` (`platform`) — which DSP fans pick
- `video_play` (`videoId`)
- `locale_toggle` (`to`) — whether the EN audience is real

## Klaviyo setup
1. Klaviyo → Settings → API Keys → create a **private** key with profile/subscription write scope.
2. Set `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` (see `.env.local.example`) locally in
   `.env.local`, and in Vercel under Project → Settings → Environment Variables.

Without these, `/api/subscribe` returns a clean 500 and the form shows a friendly error
rather than crashing — but no signups are captured.

### SMS is not active yet
No SMS sending number is configured, so Klaviyo rejects SMS subscriptions. The route handles
this: it subscribes the email, **saves the phone on the profile**, and skips only the SMS
consent — a phone number never costs you the email signup. Add a sending number in Klaviyo
(Mexico/US) and it starts working with no code change.

## The "Ver" video
`siteConfig.video.videoId` is an **explicitly pinned** YouTube video, currently
"No Sé Quién Soy". It is deliberately not auto-resolved — an earlier version fetched the
channel's "latest" upload from RSS, but that feed is not reliably newest-first and it
silently embedded an unrelated 2020 video. When the "en vivo desde el jardín" session is
filmed, swap `videoId` and update the `ver.*` copy in `src/i18n/dictionaries.ts`.

## Deploying
Pushes to `main` auto-deploy on Vercel. Note the local `gh`/git identity has no write access
to `caribbeanvoodoo/site` over HTTPS — push with the repo's SSH deploy key:
```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/cv_site_deploy -o IdentitiesOnly=yes" \
  git push git@github.com:caribbeanvoodoo/site.git main:main
```

## Still needs real values before launch
1. **Rotate the Klaviyo API key** and update it in Vercel.
2. **SMS sending number** in Klaviyo (phones are being captured meanwhile).
3. **Domain-authenticate the Klaviyo sender** — sending from a `@gmail.com` address will land
   in spam. Set up SPF/DKIM on `caribbeanvoodoo.mx`.
4. **Klaviyo account "Website URL"** still says `.com`; should be `.mx`.
5. **Clean band photo** — `band_bw.jpg` carries a "Meta AI" watermark bottom-right.
6. **Real live-session video** when filmed (see above).
7. **Tour dates** when booked → `src/data/shows.ts` (Fechas auto-switches layouts).
8. `logo_gold.png` is a raster recreation — swap for a vector master if the band has one.
