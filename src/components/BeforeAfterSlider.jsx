import { useCallback, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'

/**
 * Draggable before/after reveal (adapted from the LP PDP "Before / After"
 * section). Base layer = "after" (revealed on the right); the "before" overlay
 * is clipped to the left of the handle. Drag anywhere, or focus the handle and
 * use arrow keys. Before (left) = old plate, After (right) = TuxMat Capsule.
 */
const GOLD_TEXT = {
  background: 'linear-gradient(91deg, #E0C074 0%, #C9A24B 50%, #E0C074 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
}

export default function BeforeAfterSlider({
  before,
  after,
  start = 50,
  heading,
  accent,
  subheading,
  fill = false,
  className = '',
}) {
  const [pos, setPos] = useState(start)
  const ref = useRef(null)
  const dragging = useRef(false)

  const setFromX = useCallback((clientX) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    setFromX(e.clientX)
    try { ref.current?.setPointerCapture?.(e.pointerId) } catch { /* non-active pointer */ }
  }
  const onPointerMove = (e) => dragging.current && setFromX(e.clientX)
  const endDrag = (e) => {
    dragging.current = false
    try { ref.current?.releasePointerCapture?.(e.pointerId) } catch { /* ignore */ }
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(0, p - step)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(100, p + step)) }
    else if (e.key === 'Home') { e.preventDefault(); setPos(0) }
    else if (e.key === 'End') { e.preventDefault(); setPos(100) }
  }

  return (
    <div className={`${fill ? 'h-full' : ''} ${className}`}>
      {(heading || subheading) && (
        <div className="mx-auto mb-9 max-w-2xl text-center">
          {heading && (
            <ScrollReveal>
              <h3 className="display-xl text-[clamp(1.6rem,3.2vw,2.6rem)] text-bone">
                {heading}{accent ? ' ' : ''}
                {accent && <span style={GOLD_TEXT}>{accent}</span>}
              </h3>
            </ScrollReveal>
          )}
          {subheading && (
            <ScrollReveal index={1}>
              <p className="mt-3 font-body text-[clamp(0.95rem,1.4vw,1.05rem)] font-light text-bone-dim">
                {subheading}
              </p>
            </ScrollReveal>
          )}
        </div>
      )}

      <ScrollReveal className={fill ? 'h-full' : ''}>
        <div
          ref={ref}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`relative cursor-ew-resize select-none overflow-hidden rounded-lg
                      ${fill ? 'mx-auto h-full w-auto max-w-full' : 'mx-auto w-full max-w-[1180px]'}`}
          style={{ aspectRatio: '2000 / 1115', touchAction: 'pan-y' }}
        >
          {/* Base = after (TuxMat Capsule), revealed on the right */}
          <img
            src={after.src}
            alt={after.alt}
            draggable="false"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay = before (old plate), clipped to the left of the handle */}
          <img
            src={before.src}
            alt={before.alt}
            draggable="false"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />

          {/* Corner labels */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-ink/55 px-2 py-1
                           font-display text-[0.6rem] uppercase tracking-label text-bone backdrop-blur-sm">
            Before
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-ink/55 px-2 py-1
                           font-display text-[0.6rem] uppercase tracking-label text-bone backdrop-blur-sm">
            After
          </span>

          {/* Handle */}
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare the old plate (before) with the TuxMat Capsule (after)"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            className="focusable absolute top-1/2 z-30 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2
                       cursor-ew-resize items-center justify-center"
            style={{ left: `${pos}%`, touchAction: 'none' }}
          >
            {/* vertical seam line (clipped by the container) */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-[200vh] w-[3px] -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.25), 0 0 8px rgba(0,0,0,0.45)' }}
            />
            {/* white knob */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
            />
            <img
              src="/assets/launch/handle-mark.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none relative z-10 h-2.5 w-2.5 object-contain"
            />
          </button>
        </div>
      </ScrollReveal>
    </div>
  )
}
