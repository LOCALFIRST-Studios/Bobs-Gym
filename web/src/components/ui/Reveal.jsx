import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }

/**
 * Fades and lifts content into view once. When the visitor prefers reduced
 * motion, content renders in its final state with no animation.
 */
export default function Reveal({ as = 'div', delay = 0, y = 24, children, ...rest }) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}

/** Container whose direct <RevealItem> children animate in sequence. */
export function RevealGroup({ as = 'div', stagger = 0.08, children, ...rest }) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Component>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function RevealItem({ as = 'div', children, ...rest }) {
  const Component = motion[as]
  return (
    <Component variants={itemVariants} {...rest}>
      {children}
    </Component>
  )
}
