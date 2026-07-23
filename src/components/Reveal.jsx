import { motion, useReducedMotion } from 'motion/react'

/**
 * Scroll-reveal. Motivación: jerarquía. Cada sección entra una sola vez y en el
 * orden de lectura, así el ojo sabe dónde empieza el bloque.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  once = true,
  className = '',
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', as = 'div', ...props }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
