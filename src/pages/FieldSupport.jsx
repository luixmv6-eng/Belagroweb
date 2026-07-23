import { ArrowRight, Flask, Path } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { media } from '../data/media'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Wave from '../components/Wave'

const p = pages.fieldSupport

/* Los iconos viven en el codigo y se emparejan por posicion con los textos
   editables: un icono no es algo que se pueda escribir en un formulario. */
const pillarIcons = [Flask, Path]

export default function FieldSupport() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.fieldSupport}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
        actions={
          <Button to={routes.contact}>
            {p.cta}
            <ArrowRight size={18} weight="bold" />
          </Button>
        }
        aside={
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
            <Img {...media.field} className="aspect-[4/3] w-full object-cover" />
          </div>
        }
      />

      <section aria-labelledby="enfoque" className="section bg-bg pb-0 md:pb-0">
        <div className="shell">
          <Reveal
            as="h2"
            id="enfoque"
            className="max-w-[24ch] text-2xl font-semibold leading-snug text-fg md:text-[2.5rem] md:leading-[1.2]"
          >
            {p.approachTitle}
          </Reveal>

          <Reveal as="p" delay={0.08} className="mt-6 max-w-[68ch] text-lg leading-relaxed text-fg-muted">
            {p.approachBody}
          </Reveal>
        </div>
      </section>

      <section aria-label="Ejes del acompañamiento" className="relative mt-20 bg-surface-violet md:mt-28">
        <Wave color="fill-bg" flip />

        <div className="shell grid gap-6 pb-20 pt-4 md:grid-cols-2 md:pb-28">
          {p.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Flask
            return (
            <Reveal
              key={pillar.title}
              delay={i * 0.1}
              className="flex h-full flex-col rounded-card border border-line bg-card p-8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                <Icon size={24} weight="regular" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-fg md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">{pillar.text}</p>
            </Reveal>
            )
          })}
        </div>

        <Wave color="fill-bg" />
      </section>

      <section className="section bg-bg">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal as="h2" className="max-w-[24ch] text-2xl font-semibold leading-snug text-fg md:text-3xl">
            {p.closingTitle}
          </Reveal>
          <Reveal delay={0.08}>
            <Button to={routes.contact} size="lg">
              {p.closingCta}
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
