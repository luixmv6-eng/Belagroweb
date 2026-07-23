import Reveal from './Reveal'
import Wave from './Wave'

/**
 * Cabecera de página interior. Banda lavanda + divisor curvo hacia el blanco.
 * Máximo 4 elementos de texto: kicker opcional, título, entradilla y acciones.
 */
export default function PageHeader({ kicker, title, lead, actions, aside }) {
  return (
    <header className="relative bg-surface-violet">
      <div className={`shell pb-16 pt-14 md:pb-24 md:pt-20 ${aside ? 'grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16' : ''}`}>
        <div>
          {kicker && (
            <Reveal as="p" className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-lime" aria-hidden="true" />
              <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-violet">
                {kicker}
              </span>
            </Reveal>
          )}

          <Reveal as="h1" delay={0.05} className="max-w-[18ch] text-4xl font-semibold leading-[1.08] text-fg md:text-5xl lg:text-6xl">
            {title}
          </Reveal>

          {lead && (
            <Reveal as="p" delay={0.12} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-muted">
              {lead}
            </Reveal>
          )}

          {actions && (
            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
              {actions}
            </Reveal>
          )}
        </div>

        {aside && (
          <Reveal delay={0.2} y={36}>
            {aside}
          </Reveal>
        )}
      </div>

      <Wave color="fill-bg" />
    </header>
  )
}
