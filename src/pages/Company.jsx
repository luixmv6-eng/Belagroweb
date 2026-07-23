import { Compass, Factory, Target } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { media } from '../data/media'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import Wave from '../components/Wave'
import CountUp from '../components/CountUp'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const p = pages.company

function Milestone() {
  return (
    <section aria-labelledby="hito" className="bg-bg pb-4">
      <div className="shell">
        <Reveal y={36}>
          <div className="grid items-center gap-10 rounded-card border border-line bg-card p-8 shadow-[var(--shadow-card)] md:grid-cols-[1.2fr_1fr] md:gap-16 md:p-12">
            <div>
              <p className="inline-flex items-center gap-3 rounded-full bg-lime-tint px-4 py-1.5 font-display text-sm font-semibold text-lime-text">
                <Factory size={18} weight="regular" aria-hidden="true" />
                {p.milestone.year}
              </p>

              <h2
                id="hito"
                className="mt-5 max-w-[20ch] text-2xl font-semibold leading-snug text-fg md:text-4xl"
              >
                {p.milestone.title}
              </h2>
            </div>

            <div className="border-t border-line pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <p className="flex items-baseline gap-1 font-display text-5xl font-semibold text-fg md:text-6xl">
                <span className="text-lime-text" aria-hidden="true">
                  +
                </span>
                <CountUp to={p.milestone.value} aria-label={p.milestone.srLabel} />
              </p>
              <p className="mt-2 text-lg text-fg-muted">{p.milestone.valueLabel}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section aria-labelledby="equipo" className="section bg-bg">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3">
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-violet">
              {p.team.eyebrow}
            </span>
          </Reveal>

          <Reveal
            as="h2"
            id="equipo"
            delay={0.06}
            className="mt-5 text-3xl font-semibold leading-tight text-fg md:text-4xl"
          >
            {p.team.title}
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-fg-muted">
            {p.team.body}
          </Reveal>
        </div>

        <Reveal delay={0.1} y={36}>
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
            <Img {...media.team} className="aspect-[4/3] w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Iconos por posicion: mision, vision. */
const directionIcons = [Target, Compass]

function Direction() {
  return (
    <section aria-labelledby="direccion" className="relative bg-surface-violet">
      <Wave color="fill-bg" flip />

      <div className="shell pb-20 pt-4 md:pb-28">
        <Reveal
          as="h2"
          id="direccion"
          className="max-w-[18ch] text-3xl font-semibold leading-tight text-fg md:text-5xl"
        >
          {p.direction.title}
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {p.direction.items.map((item, i) => {
            const Icon = directionIcons[i] ?? Target
            return (
            <Reveal
              key={item.title}
              delay={i * 0.1}
              className="flex h-full flex-col rounded-card border border-line bg-card p-8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                <Icon size={24} weight="regular" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-fg-muted">{item.text}</p>
            </Reveal>
            )
          })}
        </div>
      </div>

      <Wave color="fill-bg" />
    </section>
  )
}

function Projection() {
  return (
    <section aria-labelledby="proyeccion" className="section bg-bg">
      <div className="shell">
        <Reveal
          as="h2"
          id="proyeccion"
          className="max-w-[20ch] text-3xl font-semibold leading-tight text-fg md:text-5xl"
        >
          {p.projection.title}
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal as="p" className="text-lg leading-relaxed text-fg-muted">
            {p.projection.body}
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-card border-l-2 border-lime bg-surface p-7 md:p-9"
          >
            <p className="text-lg leading-relaxed text-fg">
              {p.projection.highlight}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Company() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.company}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
        actions={<Button to={routes.contact}>{p.cta}</Button>}
      />

      <Milestone />
      <Team />
      <Direction />
      <Projection />
    </>
  )
}
