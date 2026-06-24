import { motion } from 'framer-motion'
import { motion as M } from '../lib/tokens.js'
import { usePrefersReducedMotion } from '../lib/useReducedMotion.js'

/**
 * On-scroll reveal: opacity 0→1 + ~20px rise, triggered once on enter.
 * Pass `index` for staggered grouped reveals. Reduced motion → instant opacity.
 */
export default function ScrollReveal({
  children,
  index = 0,
  stagger = 0.08,
  rise = 20,
  as = 'div',
  className = '',
  amount = 0.25,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: M.reveal, ease: M.ease, delay: index * stagger }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
