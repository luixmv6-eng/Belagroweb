import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/** Recorrido cerrado del triangulo del logo, en el sistema del viewBox 64x64. */
const TRIANGLE = 'M7 53 32.2 11.1 56.7 53Z'

/**
 * Los tres vertices recorren el triangulo desfasados un tercio de vuelta cada
 * uno, asi que siempre hay un color en cada tramo: el efecto es de liquido
 * circulando por los conectores, no de tres puntos sueltos.
 *
 * Se usa animateMotion (SMIL) y no `offset-path` porque el soporte en Safari es
 * mas fiable, y aqui esto es lo primero que ve alguien con la red lenta.
 */
const VERTICES = [
  { color: 'var(--brand-orange)', begin: '0s' },
  { color: 'var(--brand-lime)', begin: '-1.6s' },
  { color: 'var(--brand-violet)', begin: '-3.2s' },
]

function LogoSpinner({ animate }) {
  return (
    <svg viewBox="0 0 64 64" className="size-20" role="img" aria-label="Cargando">
      {/* Conectores translucidos: son el "cauce" por el que viajan los vertices. */}
      <g fill="none" strokeWidth="13.8" strokeLinecap="round" opacity=".28">
        <path d="M7 53 32.2 11.1" stroke="var(--brand-violet)" />
        <path d="M32.2 11.1 56.7 53" stroke="var(--brand-orange)" />
        <path d="M7 53H56.7" stroke="var(--brand-lime)" />
      </g>

      {animate
        ? VERTICES.map((v) => (
            <circle key={v.begin} r="6.9" fill={v.color}>
              <animateMotion
                dur="4.8s"
                begin={v.begin}
                repeatCount="indefinite"
                path={TRIANGLE}
                calcMode="linear"
              />
            </circle>
          ))
        : // Sin movimiento: el logo quieto en su posicion real.
          [
            { cx: 32.2, cy: 11.1, fill: 'var(--brand-orange)' },
            { cx: 56.7, cy: 53, fill: 'var(--brand-lime)' },
            { cx: 7, cy: 53, fill: 'var(--brand-violet)' },
          ].map((c) => <circle key={c.cx} cx={c.cx} cy={c.cy} r="6.9" fill={c.fill} />)}
    </svg>
  )
}

/**
 * Pantalla de carga entre rutas.
 *
 * Solo aparece si la carga tarda mas de `delay`. En una conexion normal los
 * fragmentos de pagina llegan en decenas de milisegundos, y un loader que
 * parpadea molesta mas que no tener ninguno.
 */
export default function RouteLoader({ delay = 180 }) {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-[60vh] items-center justify-center bg-bg transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <LogoSpinner animate={visible && !reduce} />
        <p className="font-display text-sm font-medium text-fg-muted">Cargando</p>
      </div>
    </div>
  )
}
