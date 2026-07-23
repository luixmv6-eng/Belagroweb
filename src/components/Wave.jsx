/**
 * Divisor orgánico entre secciones.
 *
 * Regla de uso, para que la curva siempre sea visible:
 *  - `color` es el color de la sección de DESTINO (la que viene después de la curva).
 *  - El contenedor debe tener el color de la sección de ORIGEN. Si la curva vive
 *    dentro de la sección de destino, use `flip` y pase el color de origen.
 *  - `bg` fuerza el color del contenedor cuando la curva no hereda el correcto.
 */
export default function Wave({ color = 'fill-bg', bg = '', flip = false, className = '' }) {
  return (
    <div
      className={`pointer-events-none relative w-full leading-none ${bg} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`block h-[60px] w-full md:h-[110px] ${color} ${flip ? 'rotate-180' : ''}`}
        focusable="false"
      >
        <path d="M0,120 L0,52 C240,110 480,8 720,20 C960,32 1200,110 1440,64 L1440,120 Z" />
      </svg>
    </div>
  )
}
