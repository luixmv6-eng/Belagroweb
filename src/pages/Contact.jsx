import { Link } from 'react-router-dom'
import { ArrowRight, EnvelopeSimple, LinkedinLogo, MapPin, Phone } from '@phosphor-icons/react'
import { routes, site } from '../data/site'
import { media } from '../data/media'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Img from '../components/Img'
import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Wave from '../components/Wave'

const p = pages.contact

const details = [
  {
    icon: MapPin,
    label: p.labelAddress,
    value: site.address,
    sub: site.region,
    href: null,
  },
  {
    icon: Phone,
    label: p.labelPhone,
    value: site.phone,
    href: `tel:${site.phoneRaw}`,
  },
  {
    icon: EnvelopeSimple,
    label: p.labelEmail,
    value: site.emailComercial,
    href: `mailto:${site.emailComercial}`,
  },
]

export default function Contact() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.contact}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
      />

      <section aria-labelledby="datos" className="section bg-bg pt-4 md:pt-8">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <h2 id="datos" className="sr-only">
              Datos de contacto
            </h2>

            <ul className="flex flex-col gap-6">
              {details.map((item, i) => (
                <Reveal key={item.label} as="li" delay={i * 0.06} className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                    <item.icon size={21} weight="regular" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-violet">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-lg font-medium text-fg transition-colors hover:text-lime-text"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-lg font-medium text-fg">{item.value}</span>
                    )}
                    {item.sub && <span className="block text-base text-fg-muted">{item.sub}</span>}
                  </span>
                </Reveal>
              ))}

              <Reveal as="li" delay={0.2} className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                  <LinkedinLogo size={21} weight="regular" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-violet">
                    {p.labelSocial}
                  </span>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-lg font-medium text-fg transition-colors hover:text-lime-text"
                  >
                    {p.socialName}
                  </a>
                </span>
              </Reveal>
            </ul>

            <Reveal delay={0.26} className="mt-10 overflow-hidden rounded-card border border-line">
              <Img {...media.contact} className="aspect-[16/10] w-full object-cover" />
            </Reveal>
          </div>

          <Reveal y={36} delay={0.1}>
            <ContactForm idPrefix="contacto" subject="Nueva solicitud desde belagro.co" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pqrs-cta" className="relative bg-surface-violet">
        <Wave color="fill-bg" flip />

        <div className="shell flex flex-col items-start gap-6 pb-20 pt-4 md:flex-row md:items-center md:justify-between md:pb-28">
          <div>
            <h2 id="pqrs-cta" className="text-2xl font-semibold leading-snug text-fg md:text-3xl">
              {p.pqrs.title}
            </h2>
            <p className="mt-3 max-w-[54ch] leading-relaxed text-fg-muted">
              {p.pqrs.body}
            </p>
          </div>

          <Link
            to={routes.pqrs}
            className="group inline-flex shrink-0 items-center gap-2 text-base font-semibold text-lime-text"
          >
            {p.pqrs.cta}
            <ArrowRight
              size={18}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <Wave color="fill-bg" />
      </section>
    </>
  )
}
