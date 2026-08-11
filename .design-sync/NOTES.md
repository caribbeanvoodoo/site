# Caribbean Voodoo DS — sync notes

## Nature of this design system
- **Hand-authored, off-script.** The main repo (`caribbean-voodoo-site`) is a Next.js
  marketing app, NOT a component library — there was nothing to convert. The DS is a
  purpose-built standalone package at `design-system/` (`caribbean-voodoo-ds`), whose
  components mirror the brand patterns from the live site (`src/components/*`,
  `src/app/globals.css`). Source of truth for the brand is still the live site; the DS
  restates it as portable, framework-neutral React + a single `brand.css`.
- 9 components: Button, Eyebrow, Headline, Tagline, Section, GlyphDivider, SignupForm,
  EventCard, EventList. All in group `general`.

## Build / re-sync
- Build the DS package first: `cd design-system && npm install && npm run build`
  (esbuild → `dist/index.mjs`, externalizes react; `tsc --emitDeclarationOnly` → d.ts).
- Converter run (from repo root `site/`):
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./design-system/node_modules --entry ./design-system/dist/index.mjs --out ./ds-bundle`
- `--entry`/`--node-modules` point at `design-system/` — they are NOT the default repo
  root. Any re-sync must pass them.

## Fonts
- Brand fonts (Bagel Fat One, Kaushan Script, Work Sans) load via a **remote Google
  Fonts `@import`** in `brand.css` → validate prints `[FONT_REMOTE]` (informational,
  non-blocking, expected). No woff2 files are shipped by design.

## Render verification
- **No Playwright/Chromium in this environment.** Validate was run with
  `--no-render-check` (→ `[RENDER_SKIPPED]` warn, expected). Every card was instead
  verified visually through the in-app browser against the served `ds-bundle`
  (`.ds-sync/storybook/http-serve.mjs`) and graded good by hand. A future machine WITH
  Playwright should drop `--no-render-check` to get the mechanical render gate.

## Known render warns (recorded so re-syncs don't flag them as new)
- `[FONT_REMOTE]` for the three brand families — expected (remote @import).
- `[RENDER_SKIPPED]` — only because this environment lacks a browser; not a defect.

## Re-sync risks / watch-list
- The DS package is separate from the site. If the live site's tokens/components change
  (`globals.css`, `ui.module.css`, section patterns), the DS will drift — it is NOT
  auto-derived. Re-mirror by hand when the brand evolves.
- `design-system/node_modules` and `design-system/dist` are gitignored; a fresh clone
  must `npm install && npm run build` in `design-system/` before the converter runs.
- Grades in `.design-sync/.cache/` are gitignored (campaign-local); durable verified
  state lives in the uploaded `_ds_sync.json`.
