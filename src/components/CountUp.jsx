import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

/**
 * Contador animado. El valor vive en un MotionValue, no en estado de React,
 * así que la cuenta no re-renderiza el árbol en cada frame.
 * Motivación: feedback. La cifra se construye a la vista, no aparece dada.
 */
export default function CountUp({
  to,
  duration = 1.8,
  decimals = 0,
  className = '',
  'aria-label': ariaLabel,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const value = useMotionValue(0)

  const text = useTransform(value, (v) =>
    v.toLocaleString('es-CO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  )

  useEffect(() => {
    if (!inView) return undefined
    if (reduce) {
      value.set(to)
      return undefined
    }
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, to, duration, reduce, value])

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      aria-label={ariaLabel}
    >
      {text}
    </motion.span>
  )
}
