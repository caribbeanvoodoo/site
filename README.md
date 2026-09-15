# Caribbean Voodoo website

Official site: **https://www.caribbeanvoodoo.mx**. The apex domain redirects here.

## Stack

- Next.js 15 App Router, React 19 and TypeScript
- CSS Modules and the original design-token layer
- Bagel Fat One, Kaushan Script and Work Sans via next/font
- Spanish and English rendered on separate URLs
- Klaviyo signup capture and Vercel Analytics
- GitHub → Vercel deployment; Namecheap domain

## Development and validation

```bash
npm install
cp .env.local.example .env.local
npm run dev
npm run lint
npm run build
npx playwright install chromium
npm test
```

To use an installed Chrome instead of Playwright's browser, set `CV_CHROME_PATH`
to its executable when running the tests. Tests start a production server on port
4321 and require a completed build. Signup tests do not send data to Klaviyo.

## Content and routes

- `/` and `/en`: original section order and signup centerpiece.
- `/banda` and `/en/band`: biography and current roster.
- `/musica/[slug]` and `/en/music/[slug]`: Kamikaze, DarkPsycho Metamorphosis and Serpientes.
- `/fechas` and `/en/shows`: upcoming concerts and archive.
- `/fechas/[slug]` and `/en/shows/[slug]`: individual concerts.
- `/prensa` and `/en/press`: booking, official press kit and logo.

`src/data/site.config.ts` controls the canonical host, contact, artist links,
Kamikaze video and press-kit URL. `src/data/albums.ts` and `releases.ts` control music
content. `src/data/shows.ts` controls concerts. Use verified full addresses and
venue time offsets; update each item's `modified` date when its content changes.

`src/components/HomePage.tsx` assembles the original homepage sections. Editorial
pages reuse the established event-page styling and tokens. `src/lib/seo.ts`
centralizes localized metadata and Schema.org graphs. `src/i18n/routes.ts` maps
language counterparts. Middleware determines language from the URL; the root
layout renders matching HTML and client context. No cookie or localStorage
language choice overrides a URL.

Public pages render on demand so upcoming shows become archived automatically.
`src/lib/events.ts` uses the venue-local end of day when no end time is known.
Past event pages stay accessible and stop displaying reservation buttons.

## Klaviyo and analytics

Configure `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` in local/Vercel environment
settings. Without them the signup endpoint returns an error rather than falsely
confirming capture. Keep private keys out of source control.

The existing route tries email + SMS, then email + phone, then email only so an
SMS issue does not discard the email. SMS sender configuration, sender-domain
authentication and current account settings must be verified in Klaviyo.

Existing events include signup, streaming_click, video_play and locale_toggle.
The new press page also tracks booking_click and presskit_download. Confirm that
the Vercel plan/dashboard supports custom events before relying on those reports.
The homepage player tracks its play click; the dedicated YouTube iframe does not
claim to report video starts. No extra tracking provider is installed.

## Deployment

Pushes to main auto-deploy on Vercel. The existing SSH deploy key supports:

```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/cv_site_deploy -o IdentitiesOnly=yes" \
  git push git@github.com:caribbeanvoodoo/site.git main:main
```

The canonical host must agree with Vercel's primary host. See the SEO document
before switching between apex and www. Preview \*.vercel.app hosts remain noindex.

## SEO and outstanding account steps

See [docs/SEO-IMPLEMENTATION.md](docs/SEO-IMPLEMENTATION.md) for the keyword/page
map, metadata, sources, schema checks, Search Console instructions and 30/60/90-day
measurement plan. This includes the current release/date/roster information still
needing owner confirmation and manual artist-profile updates.
