import {
  ArrowRight,
  ArrowsClockwise,
  Drop,
  MapPin,
  Package,
  SlidersHorizontal,
  Tag,
} from '@phosphor-icons/react'
import { routes, site } from '../data/site'
import { media } from '../data/media'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import CountUp from '../components/CountUp'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Wave from '../components/Wave'
import ContactForm from '../components/ContactForm'

const p = pages.maquila

/* Iconos por posicion. El primer servicio ocupa dos columnas. */
const serviceIcons = [Drop, Package, Tag, Drop, SlidersHorizontal, ArrowsClockwise]

export default function Maquila() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.maquila}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
        actions={
          <Button href="#contacto-maquila">
            {p.cta}
            <ArrowRight size={18} weight="bold" />
          </Button>
        }
        aside={
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
            <Img {...media.filling} className="aspect-[4/3] w-full object-cover" />
          </div>
        }
      />

      <section aria-labelledby="capacidad" className="bg-bg">
        <div className="shell section pt-0 md:pt-0">
          <Reveal y={36}>
            <div className="grid items-center gap-10 rounded-card bg-surface-violet-deep p-8 text-on-violet md:grid-cols-[auto_1fr] md:gap-16 md:p-12">
              <p className="flex items-baseline gap-2">
                <CountUp
                  to={p.capacity.value}
                  className="font-display text-6xl font-semibold leading-none md:text-7xl"
                />
                <span className="font-display text-4xl font-semibold leading-none text-lime md:text-5xl">
                  +
                </span>
              </p>

              <div>
                <h2 id="capacidad" className="text-xl font-normal text-on-violet-muted md:text-2xl">
                  {p.capacity.title}
                </h2>
                <p className="mt-4 max-w-[54ch] leading-relaxed text-on-violet-muted">
                  {p.capacity.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="servicios-maquila" className="relative bg-surface-violet">
        <Wave color="fill-bg" flip />

        <div className="shell pb-20 pt-4 md:pb-28">
          <Reveal
            as="h2"
            id="servicios-maquila"
            className="text-3xl font-semibold leading-tight text-fg md:text-4xl"
          >
            {p.servicesTitle}
          </Reveal>

          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {p.services.map((service, i) => {
              const Icon = serviceIcons[i] ?? Drop
              const wide = i === 0
              return (
              <RevealItem
                key={`${service.text}-${i}`}
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

        <Wave color="fill-bg" />
      </section>

      <section
        id="contacto-maquila"
        aria-labelledby="contacto-maquila-titulo"
        className="section scroll-mt-24 bg-bg"
      >
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal
              as="h2"
              id="contacto-maquila-titulo"
              className="text-3xl font-semibold leading-tight text-fg md:text-4xl"
            >
              {p.contactTitle}
            </Reveal>

            <Reveal delay={0.08} className="mt-8 flex items-start gap-3">
              <MapPin size={22} weight="regular" className="mt-0.5 shrink-0 text-lime-text" />
              <p className="text-lg leading-relaxed text-fg">
                {site.address}
                <span className="mt-1 block text-base text-fg-muted">{site.region}</span>
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8 overflow-hidden rounded-card border border-line">
              <Img {...media.contact} className="aspect-[16/10] w-full object-cover" />
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <ContactForm
              idPrefix="maquila"
              subject="Solicitud de maquila desde belagro.co"
              submitLabel={p.submitLabel}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
