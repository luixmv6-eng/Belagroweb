import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { presentations, stageById, stages } from '../data/products'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Wave from '../components/Wave'

const p = pages.stage

const routeById = {
  establecimiento: routes.stageRooting,
  vegetativo: routes.stageVegetative,
  maduracion: routes.stageRipening,
}

export default function Stage({ id }) {
  const stage = stageById[id]
  const others = stages.filter((s) => s.id !== id)

  return (
    <>
      <Seo
        title={stage.title}
        description={stage.portfolioIntro}
        path={routeById[id]}
        image={stage.image.src}
      />

      <PageHeader
        kicker={stage.kicker}
        title={stage.title}
        lead={stage.portfolioIntro}
        actions={
          <>
            <Button to={routes.contact}>
              {p.primaryCta}
              <ArrowRight size={18} weight="bold" />
            </Button>
            <Button to={routes.portfolio} variant="outline">
              {p.secondaryCta}
            </Button>
          </>
        }
        aside={
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
            <Img
              src={stage.image.src}
              alt={stage.image.alt}
              width={stage.image.width}
              height={stage.image.height}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        }
      />

      <section aria-label="Beneficios de la etapa" className="bg-bg pb-4">
        <div className="shell">
          <ul className="grid gap-4 sm:grid-cols-3">
            {stage.claims.map((claim, i) => (
              <Reveal
                key={claim}
                as="li"
                delay={i * 0.08}
                className="flex items-start gap-3 rounded-card border border-line bg-surface p-5"
              >
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-lime-text"
                  aria-hidden="true"
                />
                <span className="font-medium leading-snug text-fg">{claim}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="productos" className="section bg-bg">
        <div className="shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal
              as="h2"
              id="productos"
              className="text-3xl font-semibold leading-tight text-fg md:text-4xl"
            >
              {p.productsTitle}
            </Reveal>

            <Reveal delay={0.06} className="flex flex-wrap items-center gap-2">
              <span className="text-[0.85rem] font-medium text-fg-muted">{p.availableIn}</span>
              {presentations.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-[0.82rem] font-semibold text-fg"
                >
                  {p}
                </span>
              ))}
            </Reveal>
          </div>

          <div
            className={`mt-10 grid gap-6 ${
              stage.products.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {stage.products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="otras-etapas" className="relative bg-surface-violet">
        <Wave color="fill-bg" flip />

        <div className="shell pb-20 pt-4 md:pb-28">
          <Reveal
            as="h2"
            id="otras-etapas"
            className="text-2xl font-semibold leading-tight text-fg md:text-3xl"
          >
            {p.othersTitle}
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.id} delay={i * 0.08}>
                <Link
                  to={other.to}
                  className="group flex items-center justify-between gap-6 rounded-card border border-line bg-card p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold text-fg">
                      {other.portfolioTitle}
                    </span>
                    <span className="mt-1 block text-sm text-fg-muted">
                      {other.portfolioProducts.join(', ')}
                    </span>
                  </span>
                  <ArrowRight
                    size={22}
                    weight="bold"
                    className="shrink-0 text-lime-text transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Wave color="fill-bg" />
      </section>
    </>
  )
}
