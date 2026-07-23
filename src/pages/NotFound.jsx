import { ArrowRight } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import Button from '../components/Button'

const p = pages.notFound

export default function NotFound() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path="/404"
      />

      <section className="section bg-bg">
        <div className="shell flex max-w-[52ch] flex-col items-start">
          <p className="font-display text-6xl font-semibold text-lime-text md:text-7xl">{p.code}</p>

          <h1 className="mt-6 text-3xl font-semibold leading-tight text-fg md:text-4xl">
            {p.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-fg-muted">
            {p.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={routes.home}>
              {p.primaryCta}
              <ArrowRight size={18} weight="bold" />
            </Button>
            <Button to={routes.portfolio} variant="outline">
              {p.secondaryCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
