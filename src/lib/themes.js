/**
 * Per-page backgrounds. Home + one content page stay black (~part of the deck
 * remains dark for contrast); the rest use the brand metallic gradients with
 * dark type. Swap a route's theme here — SiteLayout applies the background and
 * the matching foreground CSS variables automatically.
 */

// Brand metallic gradients (derived from the provided silver / champagne refs).
const SILVER =
  'radial-gradient(125% 115% at 50% 32%, #fcfcfd 0%, #ededee 44%, #d2d3d5 78%, #bcbdc0 100%)'
const GOLD =
  'linear-gradient(110deg, #cdb083 0%, #e7d8bd 18%, #faf6ee 40%, #ffffff 52%, #ededee 72%, #d0d1d3 100%)'
const SILVER_GOLD =
  'linear-gradient(125deg, #cfd0d2 0%, #e8e8ea 24%, #ffffff 48%, #f2e8d6 70%, #d6c19c 100%)'

// Foreground tokens consumed as CSS variables by themed components.
const DARK_FG = {
  '--pfg': '#F4F1EA',
  '--pfg-dim': '#9A988F',
  '--pfg-faint': '#6B6A64',
  '--pline': '#2A2A2E',
  '--pchip': 'rgba(14,14,16,0.55)',
}
const LIGHT_FG = {
  '--pfg': '#17171a',
  '--pfg-dim': '#46464a',
  '--pfg-faint': '#5f5f63',
  '--pline': 'rgba(0,0,0,0.16)',
  '--pchip': 'rgba(255,255,255,0.6)',
}

const dark = (bg) => ({ tone: 'dark', bg: bg || '#0E0E10', vars: DARK_FG })
const light = (bg) => ({ tone: 'light', bg, vars: LIGHT_FG })

export const PAGE_THEMES = {
  '/': dark(),               // home — black (unchanged)
  '/creation': light(SILVER),
  '/pre-launch': light(GOLD),
  '/launch': light(SILVER),  // grey/silver so the assets stand out
  '/amazon': light(SILVER_GOLD),
}

export function themeFor(pathname) {
  return PAGE_THEMES[pathname] || dark()
}
