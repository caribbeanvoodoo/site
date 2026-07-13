# Caribbean Voodoo — site

Single-page marketing site for Caribbean Voodoo, recreated from the design handoff
(`../design_handoff_caribbean_voodoo_site/`) as componentized Next.js code.

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **CSS Modules** + a design-token layer in `src/app/globals.css` (chosen over Tailwind
  for pixel-faithful reproduction of the handoff's exact `clamp()` sizes, radial-gradient
  glows, and letter-spacing tokens)
- **Google Fonts** via `next/font/google`: Bagel Fat One, Kaushan Script, Work Sans (400–700)

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `src/app/page.tsx` — assembles the sections in spec order.
- `src/components/` — one component + CSS Module per section (Header, Hero, Escuchar, Ver,
  Lista, Fechas, Nosotros, Prensa, Footer). Shared primitives in `ui.module.css` / `Eyebrow.tsx`.
- `src/data/site.config.ts` — **all swappable links** (streaming, video, press kit, socials, contact).
- `src/data/shows.ts` — Fechas data; empty array ⇒ "muy pronto" state, filled ⇒ dates list (auto-switch).
- `src/data/members.ts` — band roster.
- `src/lib/signup.ts` + `src/app/api/subscribe/route.ts` — signup submit + **stubbed** capture backend.

## ⚠️ Needs real values before launch
1. **Signup backend** — `src/app/api/subscribe/route.ts` only logs. Wire a real
   email/SMS provider (Klaviyo, Mailchimp + Twilio, Beehiiv…). Client contract: POST 200 = success.
2. **Streaming links** — `siteConfig.streaming.*` point at search URLs, not real profile/release pages.
3. **Ver video** — static poster → set `siteConfig.video.embedUrl` to swap in a real player,
   or update `posterHref` to the real clip.
4. **Press kit** — served from `public/press/CaribbeanPress.pdf`; confirm this is the public file.
5. **Fechas** — currently empty. Add rows to `src/data/shows.ts` to flip to the listed layout.
6. **Assets** (`public/assets/`) — `logo_gold.png` is a raster recreation (swap for vector master);
   `band_bw.png` carries a "Meta AI" watermark bottom-right — request a clean replacement.
7. **Language** — Spanish-first by design; confirm before launch.
