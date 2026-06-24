/**
 * SINGLE SOURCE OF TRUTH — design tokens.
 *
 * Values are derived from the provided assets where possible:
 *  - Near-black base sampled from the hero render (Background Only / Exploded hero).
 *  - Champagne-gold derived from the brand metallic textures (backgrounds-06/07),
 *    then refined into one saturated accent reserved for actions/active/hover only.
 *
 * NOTE: No brand kit or font files were present in the provided assets. The gold
 * below is asset-derived and should be confirmed against the official brand hex
 * once the brand kit is supplied. Font stacks are tasteful fallbacks with drop-in
 * @font-face hooks in src/styles/fonts.css — replace with the real ad fonts.
 *
 * Tailwind reads these in tailwind.config.js so every page draws from one system.
 */
export const colors = {
  // Two-tone base
  ink: '#0E0E10',        // deep near-black base
  ink2: '#161618',       // raised surface
  ink3: '#1F1F22',       // card / hairline fill
  hairline: '#2A2A2E',   // borders
  // Type
  bone: '#F4F1EA',       // off-white primary type
  boneDim: '#9A988F',    // secondary type
  boneFaint: '#6B6A64',  // captions / meta
  // Single gold accent — actions, active/selected, key hover feedback ONLY
  gold: '#C9A24B',
  goldBright: '#E0C074',
  goldDim: '#8C7235',
}

export const radii = { sm: '4px', md: '8px', lg: '14px', xl: '22px' }

// 8px baseline spacing scale
export const space = {
  1: '8px', 2: '16px', 3: '24px', 4: '32px', 5: '48px',
  6: '64px', 7: '96px', 8: '128px', 9: '192px', 10: '256px',
}

// Cinematic motion — slow, engineered, soft easing.
export const motion = {
  ease: [0.22, 1, 0.36, 1],
  easeCss: 'cubic-bezier(0.22, 1, 0.36, 1)',
  slow: 0.6,
  base: 0.5,
  reveal: 0.55,
  hover: 0.18,
}

export const fonts = {
  // Headlines + labels: Poppins (loaded in index.html), medium weight.
  display: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
  body: "'Poppins', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
}
