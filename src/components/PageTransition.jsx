import { motion } from 'framer-motion'
import { motion as M } from '../lib/tokens.js'
import { usePrefersReducedMotion } from '../lib/useReducedMotion.js'

/**
 * Shared in/out route transition: cross-fade + small vertical slide, matched
 * in/out (~500ms), soft easing. Reduced motion → opacity only.
 */
export default function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion()

  const variants = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -14 },
      }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduced ? 0.2 : 0.5, ease: M.ease }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
