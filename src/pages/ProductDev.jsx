import {
  ArrowRight,
  ArrowsClockwise,
  Atom,
  Drop,
  Flask,
  SlidersHorizontal,
  TrendUp,
} from '@phosphor-icons/react'
import { routes } from '../data/site'
import { media } from '../data/media'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Wave from '../components/Wave'

const p = pages.productDev

/* Iconos por posicion. El primer servicio ocupa dos columnas. */
const serviceIcons = [Atom, TrendUp, Drop, SlidersHorizontal, ArrowsClockwise]

export default function ProductDev() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.productDev}
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
            <Img {...media.lab} className="aspect-[4/3] w-full object-cover" />
          </div>
        }
      />

      <section aria-labelledby="servicios-desarrollo" className="relative bg-bg">
        <div className="shell section pt-0 md:pt-0">
          <div className="flex items-center gap-3">
            <Flask size={22} weight="fill" className="text-lime-text" aria-hidden="true" />
            <Reveal
              as="h2"
              id="servicios-desarrollo"
              className="text-3xl font-semibold leading-tight text-fg md:text-4xl"
            >
              {p.servicesTitle}
            </Reveal>
          </div>

          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {p.services.map((service, i) => {
              const Icon = serviceIcons[i] ?? Drop
              const wide = i === 0
              return (
              <RevealItem
                key={service.text}
                className={`flex items-start gap-4 rounded-card border border-line bg-card p-7 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${
                  wide ? 'md:col-span-2' : ''
                }`}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                  <Icon size={22} weight="regular" aria-hidden="true" />
                </span>
                <p
                  className={`leading-relaxed text-fg ${
                    wide ? 'text-lg md:text-xl' : 'text-base'
                  }`}
                >
                  {service.text}
                </p>
              </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <section aria-label="Contacto para desarrollo de productos" className="relative bg-surface-violet">
        <Wave color="fill-bg" flip />

        <div className="shell flex flex-col items-start gap-6 pb-20 pt-4 md:flex-row md:items-center md:justify-between md:pb-28">
          <Reveal as="h2" className="max-w-[26ch] text-2xl font-semibold leading-snug text-fg md:text-3xl">
            {p.closingTitle}
          </Reveal>
          <Reveal delay={0.08}>
            <Button to={routes.contact} size="lg">
              {p.closingCta}
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Reveal>
        </div>

        <Wave color="fill-bg" />
      </section>
    </>
  )
}
