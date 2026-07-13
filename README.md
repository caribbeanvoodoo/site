# Caribbean Voodoo — site

Single-page marketing site for Caribbean Voodoo, recreated from the design handoff
(`../design_handoff_caribbean_voodoo_site/`) as componentized Next.js code.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **CSS Modules** + a design-token layer in `src/app/globals.css` (chosen over Tailwind
  for pixel-faithful reproduction of the handoff's exact `clamp()` sizes, radial-gradient
  glows, and letter-spacing tokens)
- **Google Fonts** via `next/font/google`: Bagel Fat One, Kaushan Script, Work Sans (400–700)
- **Klaviyo** for email/SMS signup capture
- **DistroKid HyperFollow** for the Escuchar streaming links
- Auto-resolved **YouTube** embed for "Ver" (no API key — public RSS feed)
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
- `src/components/` — one component + CSS Module per section (Header, Hero, Escuchar, Ver,
  Lista, Fechas, Nosotros, Prensa, Footer). Shared primitives in `ui.module.css` / `Eyebrow.tsx`.
- `src/data/site.config.ts` — swappable links (streaming, video fallback, press kit, socials, contact).
- `src/data/shows.ts` — Fechas data; empty array ⇒ "muy pronto" state, filled ⇒ dates list (auto-switch).
- `src/data/members.ts` — band roster (names + role keys, roles are localized).
- `src/lib/signup.ts` + `src/app/api/subscribe/route.ts` — signup submit, wired to Klaviyo.
- `src/lib/youtube.ts` + `src/app/api/latest-video/route.ts` — resolves the channel's latest
  upload via YouTube's public RSS feed (cached 1h); `Ver.tsx`/`VerPlayer.tsx` fall back to the
  static poster if resolution ever fails.
- `src/i18n/dictionaries.ts` + `src/i18n/LocaleContext.tsx` — ES/EN copy + the `useLocale()` hook.

## Klaviyo setup
1. Create a Klaviyo account and a list for site signups.
2. Klaviyo → Settings → API Keys → create a **private** API key with profile/subscription write scope.
3. Set `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` (see `.env.local.example`) — locally in
   `.env.local`, and in Vercel under Project → Settings → Environment Variables before deploying.

Without these two vars, `/api/subscribe` returns a clean 500 and the form shows a friendly
"something went wrong" message rather than crashing — safe default, but signups won't be
captured until the keys are set.

## Deploying (Vercel + your domain)
Repo is a standard Next.js App Router app — Vercel auto-detects it, no extra config needed.
1. Push this `site/` repo to GitHub.
2. Import the repo in Vercel → New Project.
3. Add `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` under Project → Settings →
   Environment Variables, then redeploy.
4. In the Vercel dashboard, Project → Settings → Domains → add your domain.
5. Vercel will show the DNS records to add (usually an `A` record to `76.76.21.21` for the
   apex domain, or a `CNAME` to `cname.vercel-dns.com` for a subdomain like `www`). Add those
   exact records in Namecheap's DNS panel for the domain.
6. Wait for DNS propagation (usually minutes, can take up to ~24h) — Vercel auto-issues SSL
   once it verifies the domain.

## Still needs real values before launch
1. **Press kit** — served from `public/press/CaribbeanPress.pdf`; confirm this is the file you
   want public.
2. **Fechas** — currently empty (no shows booked). Add rows to `src/data/shows.ts` when there are.
3. **Assets** (`public/assets/`) — `logo_gold.png` is a raster recreation (swap for a vector
   master if the band gets one); `band_bw.png` carries a "Meta AI" watermark bottom-right —
   flagged, replacement paused for now per the band.
4. **Klaviyo keys** — must be set in Vercel before the signup form actually captures anyone.
