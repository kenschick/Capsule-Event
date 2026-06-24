import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HERO_LAYERS, HERO_FALLBACK } from '../lib/manifest.js'
import { motion as M } from '../lib/tokens.js'
import { usePrefersReducedMotion } from '../lib/useReducedMotion.js'
import LayerHotspot from './LayerHotspot.jsx'

// Per-layer hero layout (in % of stage width), front→back along the diagonal.
// Titles sit at evenly-spaced positions (22% apart); each layer's solid body is
// shifted so its visual centre lands exactly under its title at rest.
//  - `center`: the title position; the label is pinned here.
//  - `nudge`: horizontal shift = title − measured solid-body centre, so the art
//    is centred under the title (kept in % so art + %-positioned label stay
//    aligned at every viewport size).
//  - `band`: a contiguous, non-overlapping full-height click area; boundaries
//    fall at the midpoints between titles, so the whole stage is clickable.
//  - `line`: height (% of stage) of the connector that rises from the title up
//    toward the image. All lines share the same baseline and leave the same gap
//    below each image, so they cascade — longest for Creation (highest part),
//    shortest for Amazon (lowest part).
const LAYOUT = {
  front: { center: 20, band: [0, 30], nudge: -7, line: 35 },
  cover: { center: 40, band: [30, 50], nudge: -3.3, line: 26 },
  plate: { center: 60, band: [50, 70], nudge: 3.6, line: 17 },
  back: { center: 80, band: [70, 100], nudge: 7, line: 6.3 },
}

// Outward unit direction along the explosion diagonal for each layer.
function unit(o) {
  const m = Math.hypot(o.x, o.y) || 1
  return { x: o.x / m, y: o.y / m }
}

export default function ExplodedHero() {
  const reduced = usePrefersReducedMotion()
  const stageRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  // Scroll-driven separation: gathered at the top, fully exploded as you scroll.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  })

  // Pointer parallax (springed for weight).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })

  const onPointerMove = (e) => {
    if (reduced) return
    const r = stageRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  // Reduced motion: static stacked render (equals the exploded composite),
  // hotspots become plain links, no transforms.
  if (reduced) {
    return (
      <div ref={stageRef} className="relative mx-auto w-full max-w-[1500px]"
           style={{ aspectRatio: '2600 / 1240' }}>
        {HERO_LAYERS.map((l) => (
          <img key={l.id} src={l.src} alt="" aria-hidden="true"
               className="pointer-events-none absolute inset-0 h-full w-full object-contain object-top"
               style={{ transform: `translateX(${LAYOUT[l.id].nudge}%)` }} />
        ))}
        <img src={HERO_FALLBACK.src} alt={HERO_FALLBACK.alt} className="sr-only" />
        {HERO_LAYERS.map((l) => (
          <span key={`line-${l.id}`} aria-hidden="true"
                className="pointer-events-none absolute bottom-[15.5%] w-px -translate-x-1/2 bg-hairline"
                style={{ left: `${LAYOUT[l.id].center}%`, height: `${LAYOUT[l.id].line}%` }} />
        ))}
        {HERO_LAYERS.map((l) => {
          const { band, center } = LAYOUT[l.id]
          const labelLeft = ((center - band[0]) / (band[1] - band[0])) * 100
          return (
            <Link key={l.id} to={l.route}
                  aria-label={`${l.label} — ${l.sublabel}`}
                  className="focusable group absolute bottom-0 top-0"
                  style={{ left: `${band[0]}%`, width: `${band[1] - band[0]}%` }}>
              <span className="absolute bottom-[8%] flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${labelLeft}%` }}>
                <span className="whitespace-nowrap font-display text-[0.7rem] uppercase tracking-label text-bone-dim group-hover:text-gold">
                  {l.label}
                </span>
                <span className="font-body text-[0.66rem] text-bone-faint">{l.sublabel}</span>
              </span>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      className="relative mx-auto w-full max-w-[1500px]"
      style={{ aspectRatio: '2600 / 1240' }}
    >
      {HERO_LAYERS.map((l) => (
        <HeroLayer
          key={l.id}
          layer={l}
          nudge={LAYOUT[l.id].nudge}
          progress={scrollYProgress}
          px={px}
          py={py}
          hovered={hovered}
        />
      ))}

      {/* Cascading connector lines — rise from the title baseline up toward each
          image, leaving an equal gap below every part. Gold when its layer is active. */}
      {HERO_LAYERS.map((l) => {
        const active = hovered === l.id
        return (
          <span key={`line-${l.id}`} aria-hidden="true"
                className={`pointer-events-none absolute bottom-[15.5%] z-20 w-px -translate-x-1/2 transition-colors duration-300
                  ${active ? 'bg-gold' : 'bg-hairline'}`}
                style={{ left: `${LAYOUT[l.id].center}%`, height: `${LAYOUT[l.id].line}%` }} />
        )
      })}

      {HERO_LAYERS.map((l) => (
        <LayerHotspot
          key={l.id}
          layer={l}
          band={LAYOUT[l.id].band}
          center={LAYOUT[l.id].center}
          active={hovered === l.id}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  )
}

function HeroLayer({ layer, nudge = 0, progress, px, py, hovered }) {
  const dir = unit(layer.offset)
  const isHover = hovered === layer.id
  const someoneElse = hovered && !isHover

  // Scroll separation along the diagonal: starts at 0 so the art sits centred
  // under its title at rest, then explodes outward as the viewer scrolls.
  // Combined with idle pointer parallax (scaled by depth — back layers drift more).
  const sep = useTransform(progress, [0, 1], [0, 70])
  const cx = useTransform([sep, px], ([s, p]) => dir.x * s + p * (8 + layer.depth * 22))
  const cy = useTransform([sep, py], ([s, p]) => dir.y * s + p * (5 + layer.depth * 14))

  // Static group nudge (% of stage width) added to the dynamic px transform, so
  // the art and its %-positioned label stay aligned at every viewport size.
  const transform = useMotionTemplate`translateX(${nudge}%) translate(${cx}px, ${cy}px)`

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        // Hover lifts the layer straight up (no sideways shift, so columns keep
        // their spacing and never overlap); siblings simply ease back in opacity.
        scale: isHover ? 1.04 : 1,
        y: isHover ? -26 : 0,
        opacity: someoneElse ? 0.55 : 1,
      }}
      transition={{ duration: M.base, ease: M.ease }}
      style={{ zIndex: 10 + Math.round((1 - layer.depth) * 4) }}
    >
      <motion.img
        src={layer.src}
        alt={layer.alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-top"
        style={{ transform }}
      />
    </motion.div>
  )
}
