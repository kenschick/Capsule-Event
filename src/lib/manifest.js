/**
 * ASSET MANIFEST — single source of truth.
 *
 * Every component references assets through this file, so files can be swapped,
 * added, or removed without touching component code. Paths are relative to
 * /public. Alt text lives here too (accessibility requirement).
 *
 * Pages 2–5 will receive more assets later; arrays below are intentionally easy
 * to extend — append an item and it renders in order.
 */

export const ROUTES = {
  home: '/',
  creation: '/creation',
  prelaunch: '/pre-launch',
  launch: '/launch',
  amazon: '/amazon',
}

/**
 * Exploded hero layers, front-to-back. Each is a clickable hotspot routing to
 * one of the four content pages. Mapping rationale (documented in README):
 *   front frame + screws  → Creation  (how it's built / its parts)
 *   clear cover           → Pre-Launch (the teaser / protective reveal)
 *   engraved plate (face) → Launch     (the finished hero product)
 *   back plate (mount)    → Amazon     (where it lives / is sold)
 *
 * `depth` drives parallax + explosion offset (0 = front, 1 = back).
 * `offset` is the resting separation along the diagonal, in % of viewport.
 */
export const HERO_LAYERS = [
  {
    id: 'front',
    src: '/assets/hero/layer-front.png',
    label: 'Creation',
    sublabel: 'The build',
    route: ROUTES.creation,
    depth: 0,
    offset: { x: -26, y: -4 },
    alt: 'Front frame and mounting screws of the TuxMat Capsule license plate case, separated in the exploded view',
  },
  {
    id: 'cover',
    src: '/assets/hero/layer-cover.png',
    label: 'Pre-Launch',
    sublabel: 'The teaser',
    route: ROUTES.prelaunch,
    depth: 0.33,
    offset: { x: -9, y: -1 },
    alt: 'Clear protective cover layer of the TuxMat Capsule license plate case',
  },
  {
    id: 'plate',
    src: '/assets/hero/layer-plate.png',
    label: 'Launch Assets',
    sublabel: 'The product',
    route: ROUTES.launch,
    depth: 0.66,
    offset: { x: 8, y: 2 },
    alt: 'Engraved TuxMat license plate, the face of the Capsule case',
  },
  {
    id: 'back',
    src: '/assets/hero/layer-back.png',
    label: 'Amazon Page',
    sublabel: 'In market',
    route: ROUTES.amazon,
    depth: 1,
    offset: { x: 24, y: 6 },
    alt: 'Reinforced back mounting plate of the TuxMat Capsule license plate case',
  },
]

export const HERO_FALLBACK = {
  src: '/assets/hero/composite.png',
  alt: 'Exploded view of the TuxMat Capsule license plate case showing all layers',
}

export const WORDMARK = 'TuxMat® Capsule™'

export const PAGES = {
  creation: {
    title: 'TuxMat® Capsule™ journey.',
    eyebrow: 'Part 02 — creation.',
    // Images pop in one-by-one (timed), then the finale image covers the page.
    sequence: [
      { src: '/assets/creation/exploded-full.png', alt: 'Full exploded view of the Capsule, every component separated', contain: true },
      { src: '/assets/creation/topdown.jpg', alt: 'Top-down view of the assembled Capsule with license plate' },
      { src: '/assets/creation/front-frame.png', alt: 'Front frame of the Capsule, isolated', contain: true },
    ],
    // The finished black Capsule case — fades in last and stays (the end).
    finale: { src: '/assets/creation/detail-front.jpg', alt: 'The finished black TuxMat Capsule license plate case' },
  },

  prelaunch: {
    title: 'Pre-launch.',
    eyebrow: 'Part 03 — pre-launch.',
    // Top: the waitlist email (phone) + the waitlist landing page scrolling in
    // the front-facing laptop.
    phone: { src: '/assets/prelaunch/phone-email.png', alt: 'Waitlist email shown on a phone' },
    landingPage: { src: '/assets/prelaunch/page-landing.jpg', alt: 'Pre-launch waitlist landing page' },
    // Bottom: auto-rotating banner of teaser photos + a looping teaser film.
    banner: [
      { type: 'video', src: '/assets/prelaunch/teaser-reimagined.mp4', poster: '/assets/prelaunch/teaser-reimagined.jpg', alt: 'Pre-launch teaser film' },
      { type: 'image', src: '/assets/prelaunch/banner-teaser.jpg', alt: 'Pre-launch teaser banner' },
      { type: 'image', src: '/assets/prelaunch/banner-capsule-detail-1.jpg', alt: 'Capsule detail 1' },
      { type: 'image', src: '/assets/prelaunch/banner-capsule-detail-2.jpg', alt: 'Capsule detail 2' },
      { type: 'image', src: '/assets/prelaunch/banner-capsule-detail-3.jpg', alt: 'Capsule detail 3' },
    ],
  },

  launch: {
    title: 'TuxMat® Capsule™ launch.',
    eyebrow: 'Part 04 — launch assets.',
    // Left: the TuxMat Capsule product page scrolling inside the laptop.
    productPage: { src: '/assets/launch/page-landing.jpg', alt: 'TuxMat Capsule product page' },
    // Centre: social video (Instagram) playing in the phone.
    phoneVideo: { src: '/assets/launch/phone-social.mp4', poster: '/assets/launch/phone-social.jpg', alt: 'TuxMat Capsule launch — social video' },
    // Right gallery: two tiles on top (ad + exploded), the launch film, then two below.
    film: { src: '/assets/launch/film-lifestyle.mp4', poster: '/assets/launch/film-lifestyle.jpg', label: 'Launch film', alt: 'Capsule launch film' },
    topTiles: [
      { src: '/assets/launch/social-ad.jpg', alt: 'TuxMat Capsule launch social ad' },
      { src: '/assets/launch/tile-exploded.jpg', alt: 'Capsule exploded view' },
    ],
    bottomTiles: [
      { src: '/assets/launch/thumb-bronco.jpg', alt: 'Capsule on a Ford Bronco' },
      { src: '/assets/launch/thumb-mx5.jpg', alt: 'Capsule on a Mazda MX-5' },
    ],
  },

  amazon: {
    title: 'Amazon page.',
    eyebrow: 'Part 05 — updated Amazon page.',
    // Left: square listing carousel (new Amazon carousel images), auto-rotating.
    carousel: [
      { src: '/assets/amazon/car-two-tone-design.jpg', alt: 'Amazon listing — an understated two-tone design' },
      { src: '/assets/amazon/car-accuracy.jpg', alt: 'Amazon listing — accuracy' },
      { src: '/assets/amazon/car-machining.jpg', alt: 'Amazon listing — machining' },
      { src: '/assets/amazon/car-fasteners.jpg', alt: 'Amazon listing — fasteners' },
      { src: '/assets/amazon/car-exploded-view.jpg', alt: 'Amazon listing — exploded view' },
    ],
    // Right: the TuxMat Capsule Amazon product page scrolling inside the laptop.
    page: { src: '/assets/amazon/page-amazon.jpg', alt: 'TuxMat Capsule Amazon product page' },
  },
}
