import { usePrefersReducedMotion } from '../lib/useReducedMotion.js'

/**
 * Continuously moving banner (marquee) of images + video that loops seamlessly.
 * The item set is duplicated and the row translates by exactly one set width
 * (50%) on an infinite CSS animation, so it never visibly resets. Video items
 * play muted + looped the whole time.
 */
export default function MarqueeBanner({ items = [], speed = 38, gap = 20, className = '' }) {
  const reduced = usePrefersReducedMotion()
  if (!items.length) return null
  const loop = [...items, ...items]

  const fade = 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)'

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        className="flex h-full w-max items-center"
        style={{ animation: reduced ? 'none' : `marquee-x ${speed}s linear infinite` }}
      >
        {loop.map((s, i) => (
          <div
            key={i}
            className="h-full shrink-0 overflow-hidden rounded-lg"
            style={{ marginRight: `${gap}px` }}
          >
            {s.type === 'video' ? (
              <video
                src={s.src}
                poster={s.poster}
                muted
                loop
                playsInline
                autoPlay
                aria-label={s.alt}
                className="h-full w-auto object-cover"
              />
            ) : (
              <img src={s.src} alt={s.alt} className="h-full w-auto object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
