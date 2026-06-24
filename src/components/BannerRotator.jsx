import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Full-width auto-rotating banner (like a website hero rotator). Crossfades
 * through slides on a timer. Image slides use `fit` (default cover); video
 * slides play muted + looped continuously so the film never stops, fading in
 * and out as it cycles. Small dots indicate position.
 */
export default function BannerRotator({ slides = [], interval = 4200, aspect = '2.6 / 1', className = '' }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  if (!slides.length) return null

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: aspect }}>
      {slides.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={idx !== i}
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
              className={`h-full w-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          ) : (
            <img
              src={s.src}
              alt={s.alt}
              className={`h-full w-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          )}
        </motion.div>
      ))}

      {/* Position dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300
              ${idx === i ? 'w-6 bg-gold' : 'w-1.5 bg-white/55'}`}
          />
        ))}
      </div>
    </div>
  )
}
