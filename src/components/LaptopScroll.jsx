import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/useReducedMotion.js'

/**
 * Front-on laptop frame with a tall webpage auto-scrolling inside the screen.
 * The page is clipped to the EXACT screen shape via an alpha mask generated
 * from the frame (screen-mask.png), so it can never peek past the bezel/lid
 * corners or edges — no holes, no gap.
 *
 * Scroll cycle: hold (pause) → scroll down → hold (pause) → scroll up, looping.
 */
const FRAME = '/assets/common/laptop-frame.png'
const MASK = '/assets/common/screen-mask.png'
const FRAME_W = 2000
const FRAME_H = 1234
// Screen opening (flood-filled from the frame), as % of the frame.
const SCREEN = { left: 17.1, top: 3.57, width: 67.15, height: 67.83 }
const SCREEN_ASPECT = (SCREEN.width * FRAME_W) / (SCREEN.height * FRAME_H)

export default function LaptopScroll({ page, alt = '', duration = 26, pause = 3.5, className = '' }) {
  const reduced = usePrefersReducedMotion()
  const [maxPct, setMaxPct] = useState(0)

  const onLoad = (e) => {
    const ia = e.target.naturalWidth / e.target.naturalHeight
    setMaxPct(Math.max(0, (1 - ia / SCREEN_ASPECT) * 100))
  }

  const total = pause + duration + pause + duration
  const m = `-${maxPct}%`
  const animate = !reduced && maxPct ? { y: ['0%', '0%', m, m, '0%'] } : { y: '0%' }
  const transition = {
    duration: total,
    times: [0, pause / total, (pause + duration) / total, (2 * pause + duration) / total, 1],
    ease: 'linear',
    repeat: Infinity,
  }

  const maskStyle = {
    WebkitMaskImage: `url(${MASK})`,
    maskImage: `url(${MASK})`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}>
      {/* Page layer, clipped to the screen shape by the mask */}
      <div className="absolute inset-0" style={maskStyle}>
        <motion.img
          src={page}
          alt={alt}
          onLoad={onLoad}
          className="absolute"
          style={{
            left: `${SCREEN.left}%`,
            top: `${SCREEN.top}%`,
            width: `${SCREEN.width}%`,
          }}
          animate={animate}
          transition={transition}
        />
      </div>
      <img
        src={FRAME}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  )
}
