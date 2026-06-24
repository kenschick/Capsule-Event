# TuxMat Capsule™ — Internal Launch Walkthrough

A premium, design-led presentation micro-site for the TuxMat Capsule™ License
Plate Case. Built for big-screen internal/partner walkthroughs — not a storefront.

Five views, navigated from an interactive exploded-view hero:

1. **Main** — interactive exploded hero (each layer routes to a page)
2. **Creation** — editorial scroll of the build/process renders
3. **Pre-Launch** — teaser films, waitlist page, emails
4. **Launch Assets** — finalized product stills, lifestyle, film, social
5. **Amazon** — listing carousel + A+ / brand-page modules

---

## Running it

This site needs **Node.js 18+**. The dev machine it was built on had no system
Node, so a local copy was installed at
`~/.local/node/node-v20.18.0-darwin-arm64/`. Two ways to run:

### A. Using the local Node already installed here

```bash
cd "Launch Webpage"
export PATH="$HOME/.local/node/node-v20.18.0-darwin-arm64/bin:$PATH"

npm install      # first time only (already done)
npm run dev      # → http://localhost:5173
```

### B. With your own Node install (recommended long-term)

Install Node from https://nodejs.org (or `brew install node`), then:

```bash
cd "Launch Webpage"
npm install
npm run dev      # development, hot-reload
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Open the printed `http://localhost:5173` in a browser. For the live
presentation, run `npm run build` then `npm run preview` for the smoothest playback.

---

## The exploded-hero layer → page mapping

The hero is built from four real layered renders (`Exploded Front & Srews`,
`Exploded Clear Cover`, `Exploded License Plate`, `Exploded Back`), stacked on a
shared canvas. Each is an individually clickable hotspot with a refined label:

| Layer (front → back)        | Label          | Routes to       | Rationale                          |
| --------------------------- | -------------- | --------------- | ---------------------------------- |
| Front frame + screws        | Creation       | `/creation`     | How it's built / its parts         |
| Clear cover                 | Pre-Launch     | `/pre-launch`   | The teaser / protective reveal     |
| Engraved plate (the face)   | Launch Assets  | `/launch`       | The finished hero product          |
| Back mounting plate         | Amazon Page    | `/amazon`       | Where it lives / is sold           |

On hover the targeted layer lifts and separates further with a gold label while
siblings ease back and dim to focus it. Idle pointer parallax keeps it alive, and
scrolling the hero drives the explosion further (Apple-product-page style).
Clicking a layer runs the standard route transition.

---

## Design system (one source of truth)

- **Tokens:** `src/lib/tokens.js` → consumed by `tailwind.config.js`. Every color,
  space, radius, and motion value comes from here.
- **Palette:** deep near-black base, off-white type, a single champagne-gold
  accent reserved only for primary actions, active/selected states, and key
  hover feedback. Gold was sampled/derived from the brand metallic textures —
  **confirm against the official brand hex** once the brand kit is supplied.
- **Motion:** soft easing `cubic-bezier(0.22, 1, 0.36, 1)`, ~400–600ms. Full
  `prefers-reduced-motion` support (transforms/animations replaced with instant
  opacity).
- **Type:** see *Fonts* below.

### A note on backgrounds

The rough PDF shows light metallic gradients behind the content pages. Those are
placeholder canvases; the locked brand direction (near-black base, off-white
type, single gold accent) was applied consistently across all pages for AA
contrast and a unified gallery feel. Easy to revisit if you want the metallic
treatment on a given page.

---

## Reusable components (`src/components/`)

`SiteLayout` · `HomeButton` · `PageTransition` · `ScrollReveal` · `ExplodedHero`
· `LayerHotspot` · `Gallery` · `VideoPlayer` · `Carousel` · `DeviceMockup` ·
`PageHeader` · `SectionLabel` · `Placeholder`

Videos use muted + loop + playsinline, autoplay **only when scrolled into view**
(IntersectionObserver), pause off-screen, show a poster first, and carry an
unobtrusive presenter toggle (play/pause + unmute). This keeps a live
presentation smooth — only the in-view video plays.

`DeviceMockup` shows provided composites as-is (no extra frame) or wraps a bare
screen recording/image in a phone/laptop frame, masked to the screen.

---

## Assets & the manifest

Every asset is referenced through **`src/lib/manifest.js`** (paths, alt text,
layer mapping). Swap, add, or remove a file there and it updates everywhere —
no component edits needed.

Source masters live on the shared drive under
`05_Assets/`. They were web-optimized into `public/assets/` (huge 11k-px renders
downscaled to ≤2600px; teaser/launch videos copied; Amazon/waitlist PDFs
rendered to images; real video poster frames generated). To regenerate after new
assets land, re-run `/tmp/process_assets.py` (paths are at the top of the file).

### Missing / to-be-supplied (clean placeholders in place)

- **Brand kit + ad fonts** — none were present in the assets. The site uses a
  refined fallback stack. Drop the real fonts into `public/fonts/` and uncomment
  the `@font-face` blocks in `src/styles/fonts.css` (family names are already
  first in the stack). Confirm the gold hex against the brand kit.
- **Launch — social posts** — not yet provided. The section shows a quiet
  placeholder; add items to `PAGES.launch.social` in the manifest (they'll
  render in native aspect ratios).
- **Heavier launch films** — only the Lifestyle film (31 MB) was bundled. The
  Disassembly / Installation / Cleaning films (~96–117 MB each) are available on
  the drive; drop them into `public/assets/launch/` and add to `PAGES.launch.films`.

---

## Accessibility

Keyboard-navigable with visible gold focus rings, alt text on every image (from
the manifest), AA-contrast off-white-on-near-black type, and full
`prefers-reduced-motion` support (the hero falls back to a static layered render
with plain link hotspots).

---

## Project structure

```
public/assets/        web-optimized assets (hero, creation, prelaunch, launch, amazon)
public/fonts/         drop brand fonts here
src/
  lib/                tokens.js · manifest.js · useReducedMotion.js
  styles/             index.css · fonts.css
  components/         reusable building blocks
  pages/              Home · Creation · PreLaunch · Launch · Amazon
  App.jsx             routes + animated transitions
.claude/launch.json   preview launcher config
```
