import { useEffect, useRef, useState } from 'react'

/**
 * Horizontal carousel (Amazon listing images). Transform-based (no native
 * scroll-snap, which was skipping slides) so it advances strictly LEFT→RIGHT,
 * one slide at a time, dwelling on each, and loops seamlessly via a cloned
 * first slide. Auto-plays hands-free for the presentation.
 */
export default function Carousel({ items = [], className = '', autoPlay = false, interval = 3500, slideAspect = '16 / 9' }) {
  const loop = autoPlay && items.length > 1
  const slides = loop ? [...items, items[0]] : items
  const [active, setActive] = useState(0)
  const [animate, setAnimate] = useState(true)
  const hold = useRef(false) // pause auto-advance briefly after manual nav

  // Auto-advance one slide at a time.
  useEffect(() => {
    if (!loop) return
    const id = setInterval(() => {
      if (!hold.current) setActive((a) => a + 1)
    }, interval)
    return () => clearInterval(id)
  }, [loop, interval])

  // When we land on the cloned slide (== first), snap back to the real first
  // instantly (invisible) so the next step continues forward.
  useEffect(() => {
    if (loop && active === items.length) {
      const t = setTimeout(() => { setAnimate(false); setActive(0) }, 680)
      return () => clearTimeout(t)
    }
  }, [active, loop, items.length])

  // Re-enable the transition after an instant snap-back.
  useEffect(() => {
    if (animate) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(r)
  }, [animate])

  if (!items.length) return null
  const dot = active % items.length
  const go = (i) => {
    hold.current = true
    setTimeout(() => { hold.current = false }, interval)
    setAnimate(true)
    setActive(Math.max(0, Math.min(items.length - 1, i)))
  }

  return (
    <div className={className}>
      <div
        className="overflow-hidden rounded-xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Amazon listing images"
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${active * 100}%)`,
            transition: animate ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        >
          {slides.map((it, i) => (
            <div key={i} className="w-full flex-none" aria-hidden={i !== active}>
              <div className="flex items-center justify-center overflow-hidden rounded-xl" style={{ aspectRatio: slideAspect }}>
                <img src={it.src} alt={it.alt} loading={i === 0 ? 'eager' : 'lazy'}
                     className="h-full w-full rounded-xl object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <ArrowBtn dir="prev" disabled={dot === 0} onClick={() => go(dot - 1)} />
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === dot}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-cinematic
                ${i === dot ? 'w-7 bg-gold' : 'w-1.5 bg-hairline hover:bg-bone-faint'}`}
            />
          ))}
        </div>
        <ArrowBtn dir="next" disabled={dot === items.length - 1} onClick={() => go(dot + 1)} />
      </div>
    </div>
  )
}

function ArrowBtn({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'next' ? 'Next image' : 'Previous image'}
      className="focusable flex h-10 w-10 items-center justify-center rounded-md border border-hairline/70
                 bg-ink/60 text-bone-dim transition-colors duration-200 ease-cinematic
                 hover:border-gold/70 hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
           style={{ transform: dir === 'prev' ? 'scaleX(-1)' : 'none' }}>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
