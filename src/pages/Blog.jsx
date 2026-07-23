import { routes } from '../data/site'
import { posts } from '../data/posts'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/Reveal'

const p = pages.blog

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.blog}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
      />

      <section aria-label="Artículos" className="section bg-bg pt-4 md:pt-8">
        <div className="shell">
          <Reveal className="flex flex-wrap gap-2" aria-label="Filtro de artículos">
            <button
              type="button"
              aria-pressed="true"
              className="cursor-pointer rounded-full bg-lime px-4 py-2 text-sm font-semibold text-on-lime"
            >
              {p.filterLabel}
            </button>
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            <ArticleCard post={featured} featured />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
