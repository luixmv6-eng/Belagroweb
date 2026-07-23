import { useReducedMotion } from 'motion/react'
import { Buildings } from '@phosphor-icons/react'

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Mark({ item }) {
  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt={item.name}
        width={160}
        height={48}
        loading="lazy"
        decoding="async"
        className="h-10 w-auto max-w-[10rem] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    )
  }

  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface font-display text-sm font-semibold text-violet"
      >
        {initials(item.name)}
      </span>
      <span className="font-display text-lg font-semibold text-fg">{item.name}</span>
    </span>
  )
}

/** Fila estática de aliados, para el bloque "Con el respaldo de". */
export function PartnerRow({ items, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-10 gap-y-5 ${className}`}>
      {items.map((item) => (
        <li key={item.name}>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer" className="inline-block">
              <Mark item={item} />
            </a>
          ) : (
            <Mark item={item} />
          )}
        </li>
      ))}
    </ul>
  )
}

/**
 * Muro de clientes en marquesina. Es la única marquesina del sitio.
 * Motivación: mostrar amplitud sin robarle altura a la página.
 * Si `items` viene vacío, se renderiza un estado vacío honesto en lugar de
 * inventar marcas que no han autorizado su uso.
 */
export default function LogoWall({ items }) {
  const reduce = useReducedMotion()

  if (!items.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
        <Buildings size={32} weight="light" className="text-violet" aria-hidden="true" />
        <p className="max-w-md leading-relaxed text-fg-muted">
          Los logos de los clientes se cargan desde{' '}
          <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
            src/data/clients.js
          </code>
          . Añada allí cada marca autorizada y aparecerán en esta franja.
        </p>
      </div>
    )
  }

  const track = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      role="list"
      aria-label="Clientes de Belagro"
    >
      <ul
        className={`flex w-max items-center gap-14 py-2 ${
          reduce ? '' : 'animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]'
        }`}
      >
        {track.map((item, i) => (
          <li key={`${item.name}-${i}`} aria-hidden={i >= items.length}>
            <Mark item={item} />
          </li>
        ))}
      </ul>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
