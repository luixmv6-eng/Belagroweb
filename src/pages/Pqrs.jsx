import {
  ArrowUpRight,
  ChatCircleDots,
  EnvelopeSimple,
  Lightbulb,
  MapPin,
  Phone,
  Scales,
  ShieldCheck,
  Warning,
} from '@phosphor-icons/react'
import { routes, site } from '../data/site'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Wave from '../components/Wave'

const p = pages.pqrs

/* Un icono por figura, emparejado por posicion con los textos editables. */
const kindIcons = [ChatCircleDots, Warning, Scales, Lightbulb]

const details = [
  { icon: MapPin, value: site.address, href: null },
  { icon: Phone, value: site.phone, href: `tel:${site.phoneRaw}` },
  { icon: EnvelopeSimple, value: site.emailPqrs, href: `mailto:${site.emailPqrs}` },
]

export default function Pqrs() {
  const hasForm = Boolean(site.pqrsFormUrl)
  const formHref = hasForm ? site.pqrsFormUrl : `mailto:${site.emailPqrs}`

  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.pqrs}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
        actions={
          <Button href={formHref} {...(hasForm ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {p.headerCta}
            <ArrowUpRight size={18} weight="bold" />
          </Button>
        }
      />

      <section aria-labelledby="figuras" className="section bg-bg pt-4 md:pt-8">
        <div className="shell">
          <Reveal
            as="h2"
            id="figuras"
            className="max-w-[22ch] text-3xl font-semibold leading-tight text-fg md:text-4xl"
          >
            {p.kindsTitle}
          </Reveal>

          {/* `items-stretch` + `h-full`: las cuatro tarjetas miden lo mismo aunque
              el texto sea desigual. Sin esto quedan de alturas distintas y la
              retícula se ve rota. */}
          <ul className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.kinds.map((kind, i) => {
              const Icon = kindIcons[i] ?? ChatCircleDots
              return (
              <Reveal
                key={kind.title}
                as="li"
                delay={i * 0.08}
                className="flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                  <Icon size={21} weight="regular" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">
                  {kind.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fg-muted">
                  {kind.text}
                </p>
              </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        id="formulario-pqr"
        aria-labelledby="radicar"
        className="relative scroll-mt-24 bg-surface-violet"
      >
        <Wave color="fill-bg" flip />

        <div className="shell grid gap-12 pb-20 pt-4 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal
              as="h2"
              id="radicar"
              className="text-3xl font-semibold leading-tight text-fg md:text-4xl"
            >
              {p.fileTitle}
            </Reveal>

            <Reveal as="p" delay={0.06} className="mt-4 max-w-[54ch] leading-relaxed text-fg-muted">
              {p.fileBody}
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <Button
                href={formHref}
                size="lg"
                {...(hasForm ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {hasForm ? p.formCta : `Escribir a ${site.emailPqrs}`}
                <ArrowUpRight size={18} weight="bold" />
              </Button>
            </Reveal>

            <ul className="mt-10 flex flex-col gap-4">
              {details.map((item, i) => (
                <Reveal
                  key={item.value}
                  as="li"
                  delay={0.16 + i * 0.06}
                  className="flex items-center gap-4"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                    <item.icon size={19} weight="regular" aria-hidden="true" />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-fg transition-colors hover:text-lime-text"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-medium text-fg">{item.value}</span>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal
            y={36}
            delay={0.1}
            className="flex h-full flex-col rounded-card border border-line bg-card p-7 shadow-[var(--shadow-card)] md:p-9"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-lime-tint text-lime-text">
              <ShieldCheck size={21} weight="regular" aria-hidden="true" />
            </span>

            <h3 className="mt-5 font-display text-xl font-semibold text-fg">
              {p.legalTitle}
            </h3>

            <div className="prose-belagro mt-4 flex flex-col gap-4 text-[0.95rem]">
              {p.legalParagraphs.map((item) => (
                <p key={item.text}>{item.text}</p>
              ))}
            </div>

            <p className="mt-auto pt-6 text-[0.85rem] leading-relaxed text-fg-muted">
              {p.legalFootnote}{' '}
              <a
                href={routes.privacy}
                className="font-semibold text-lime-text underline underline-offset-2"
              >
                {p.legalLinkLabel}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Wave color="fill-bg" />
      </section>
    </>
  )
}
