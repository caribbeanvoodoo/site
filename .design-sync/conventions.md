# Caribbean Voodoo — building with this design system

A dark, occult-tinged **rock-and-roll-from-Tulum** brand: near-black canvas, gold
display type, blood-red cursive accents, and a "spotlight in the dark" teal glow.
Spanish-first (an English audience exists too).

## Setup — dark canvas + fonts

Every component is designed for a **near-black background**. Put your page (or any
region using these components) inside an element with the `cv-root` class, or set the
background to `var(--cv-bg-black)` (`#050605`) yourself — on a white background the
gold/red palette reads wrong.

```jsx
<div className="cv-root">        {/* dark canvas + body font + text color */}
  <Section tone="lista" center glow>
    <Eyebrow bright>Únete a la lista</Eyebrow>
    <Headline size="lg">Entra al culto</Headline>
    <SignupForm />
  </Section>
</div>
```

Fonts load automatically from Google Fonts via `styles.css` (Bagel Fat One, Kaushan
Script, Work Sans) — nothing to configure, just make sure `styles.css` is loaded.

## Styling idiom — CSS custom properties + `cv-` utility classes

Style with the brand's **CSS variables** and the `cv-` class vocabulary. Do **not**
invent new color/font values — reach for the tokens.

**Color tokens:** `--cv-gold` `#e0b34c` (primary — logo, headlines, buttons),
`--cv-gold-hover`, `--cv-gold-ink` (text on gold), `--cv-red` / `--cv-red-bright`
(cursive accents ONLY), `--cv-bg-black` / `--cv-bg-panel` / `--cv-bg-panel-lista`
(backgrounds), `--cv-text-primary` / `--cv-text-body` / `--cv-text-muted`.

**Font tokens:** `--cv-font-display` (Bagel Fat One — headlines/logo, gold only),
`--cv-font-script` (Kaushan Script — red eyebrows + the "you're in" line only, never
body), `--cv-font-body` (Work Sans — everything else). Radius: `--cv-radius` (2–4px).

**Class families** (for your own layout glue around the components):

| Family | Classes |
|---|---|
| Buttons | `cv-btn` + `cv-btn--solid` / `--ghost` / `--neutral`, `cv-btn--sm` / `--lg` / `--block` |
| Type | `cv-eyebrow` (`--bright`), `cv-headline` (`--sm`/`--lg`), `cv-tagline`, `cv-copy` |
| Layout | `cv-section` (`--black`/`--lista`/`--center`), `cv-section__inner`, `cv-glow`, `cv-glyphs` |

**Motion & motifs:** one teal radial `cv-glow` behind hero/signup sections — never a
flat teal fill. Occult glyphs (`☾ ✶ ✷ ⛧`) only as small dividers (`GlyphDivider`),
never as wallpaper. Corner radius small (2–4px), never pill or sharp. No drop shadows.

## Where the truth lives

Read `styles.css` (and its `@import`ed `_ds_bundle.css`) for the full token + class
list before styling, and each component's `.d.ts` (its props) + `.prompt.md` (usage)
before composing it.

## The components

`Section` (dark panel, tones + optional glow) wraps everything. Inside, lead with an
`Eyebrow` (red cursive label) + `Headline` (gold Bagel display). `Button` carries
actions (`solid` = primary gold fill, `ghost` = outline, `neutral` = lowest rank).
`SignupForm` is the conversion centerpiece (email + optional phone + consent).
`EventCard` rows stack inside an `EventList` for tour dates. `Tagline` is the wide
small-caps label; `GlyphDivider` the delicate glyph row.
