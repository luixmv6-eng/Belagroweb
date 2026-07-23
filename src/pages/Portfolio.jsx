import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { presentations, stages } from '../data/products'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const p = pages.portfolio

function StageBlock({ stage, index }) {
  return (
    <article className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
      <div className="hidden md:block">
        <div className="sticky top-28 flex flex-col items-center gap-4">
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-line bg-card font-display text-base font-semibold text-violet">
            {stage.order}
          </span>
          {index < stages.length - 1 && (
            <span className="h-40 w-px bg-line" aria-hidden="true" />
          )}
        </div>
      </div>

      <Reveal y={32} className="pb-4 md:pb-16">
        <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
          <Img
            src={stage.image.src}
            alt={stage.image.alt}
            width={stage.image.width}
            height={stage.image.height}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <h3 className="mt-8 font-display text-2xl font-semibold leading-snug text-fg md:text-[2rem]">
          {stage.portfolioTitle}
        </h3>

        <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-fg-muted">
          {stage.portfolioIntro}
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {stage.portfolioProducts.map((name) => (
            <li
              key={name}
              className="group flex flex-col gap-4 rounded-card border border-line bg-card p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <h4 className="font-display text-xl font-semibold text-fg">{name}</h4>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[0.82rem] font-medium text-fg-muted">{p.availableIn}</span>
                {presentations.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-[0.8rem] font-semibold text-fg"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <Link
                to={stage.to}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-lime-text"
              >
                {p.specsCta}
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  )
}

export default function Portfolio() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.portfolio}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
      />

      <section aria-label="Familias de producto por etapa" className="section bg-bg pt-4 md:pt-8">
        <div className="shell flex flex-col gap-12 md:gap-0">
          {stages.map((stage, i) => (
            <StageBlock key={stage.id} stage={stage} index={i} />
          ))}
        </div>
      </section>

      <section aria-labelledby="metodo" className="section bg-bg pt-0 md:pt-0">
        <div className="shell">
          <Reveal y={36}>
            <div className="rounded-card bg-surface-violet-deep p-8 text-on-violet md:p-14">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-lime/20 text-lime">
                <Sparkle size={24} weight="fill" aria-hidden="true" />
              </span>

              <h2 id="metodo" className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">
                {p.method.title}
              </h2>

              <p className="mt-5 max-w-[70ch] text-lg leading-relaxed text-on-violet-muted">
                {p.method.body}
              </p>

              <div className="mt-9">
                <Button to={routes.contact} variant="onViolet" size="lg">
                  {p.method.cta}
                  <ArrowRight size={18} weight="bold" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
