import { motion } from 'framer-motion'
import ExplodedHero from '../components/ExplodedHero.jsx'
import { WORDMARK } from '../lib/manifest.js'
import { motion as M } from '../lib/tokens.js'

/**
 * Part 1 — Main page. Minimal by design: brand wordmark, the interactive
 * exploded hero (each layer routes to a content page), nothing else.
 * No home button here (this IS home).
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Cinematic charcoal ambience behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 38%, #1c1c1f 0%, #141416 45%, #0E0E10 100%)',
        }}
      />

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: M.slow, ease: M.ease, delay: 0.1 }}
        className="relative z-40 pt-7 text-center font-display text-sm uppercase tracking-label text-bone sm:text-base"
      >
        {WORDMARK}
      </motion.h1>

      {/* Hero stage, vertically centered */}
      <div className="relative z-10 flex min-h-[calc(100vh-3.5rem)] items-center px-4">
        <ExplodedHero />
      </div>

      {/* Quiet affordance — there is more below (drives the scroll-explosion) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: M.ease }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex flex-col items-center gap-2"
      >
        <span className="eyebrow text-bone-faint">Scroll to deconstruct</span>
        <span className="h-8 w-px bg-gradient-to-b from-bone-faint/60 to-transparent" />
      </motion.div>

      {/* Scroll runway so the scroll-driven explosion has travel. */}
      <div className="h-[70vh]" aria-hidden="true" />
    </main>
  )
}
