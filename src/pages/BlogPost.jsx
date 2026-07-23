import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from '@phosphor-icons/react'
import { routes } from '../data/site'
import { postBySlug, posts } from '../data/posts'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Wave from '../components/Wave'
import NotFound from './NotFound'

function Block({ block }) {
  if (block.type === 'h2') {
    return (
      <h2 className="mt-12 text-2xl font-semibold leading-snug text-fg md:text-3xl">{block.text}</h2>
    )
  }

  if (block.type === 'ul') {
    return (
      <ul className="mt-6 flex flex-col gap-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'quote') {
    return (
      <blockquote className="mt-10 border-l-2 border-lime bg-surface p-6 md:p-8">
        <p className="font-display text-xl font-medium leading-snug text-fg md:text-2xl">
          {block.text}
        </p>
      </blockquote>
    )
  }

  // Imagen intercalada en el cuerpo. `caption` es opcional; el pie solo aparece
  // si de verdad hay algo que decir sobre la foto.
  if (block.type === 'image') {
    if (!block.src) return null
    return (
      <figure className="mt-10">
        <div className="overflow-hidden rounded-card border border-line">
          <Img
            src={block.src}
            alt={block.alt ?? ''}
            width={block.width || 1600}
            height={block.height || 900}
            className="w-full object-cover"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-[0.9rem] leading-relaxed text-fg-muted">
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return <p className="mt-6 text-lg leading-relaxed text-fg-muted">{block.text}</p>
}

/** Enlaces que el autor quiera dejar (LinkedIn, sitio propio, un estudio citado). */
function AuthorLinks({ links }) {
  if (!links?.length) return null
  return (
    <div className="mt-10 border-t border-line pt-6">
      <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-fg-muted">
        Enlaces del autor
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links
          .filter((l) => l?.url)
          .map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.88rem] font-semibold text-fg transition-colors hover:border-lime hover:bg-lime-tint"
              >
                {link.label || link.url}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug[slug]

  if (!post) return <NotFound />

  const index = posts.findIndex((p) => p.slug === slug)
  const next = posts[(index + 1) % posts.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: post.author ? { '@type': 'Person', name: post.author } : undefined,
    image: post.cover,
    publisher: { '@type': 'Organization', name: 'Belagro' },
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`${routes.blog}/${post.slug}`}
        image={post.cover}
        type="article"
        jsonLd={jsonLd}
      />

      <article>
        <header className="bg-surface-violet">
          <div className="shell pb-16 pt-12 md:pb-20 md:pt-16">
            <Link
              to={routes.blog}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-violet"
            >
              <ArrowLeft
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Academia Belagro
            </Link>

            <Reveal
              as="h1"
              className="mt-6 max-w-[24ch] text-3xl font-semibold leading-[1.15] text-fg md:text-5xl"
            >
              {post.title}
            </Reveal>

            <Reveal
              as="p"
              delay={0.08}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9rem] text-fg-muted"
            >
              {post.author && <span className="font-semibold text-violet">{post.author}</span>}
              <span>{post.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} weight="regular" aria-hidden="true" />
                {post.readingTime}
              </span>
            </Reveal>
          </div>

          <Wave color="fill-bg" />
        </header>

        <div className="shell">
          <Reveal y={32} className="-mt-4 overflow-hidden rounded-card border border-line md:-mt-10">
            <Img
              src={post.cover}
              alt=""
              width={1200}
              height={800}
              className="aspect-[16/9] w-full object-cover"
            />
          </Reveal>

          <div className="mx-auto max-w-[68ch] pb-20 pt-12 md:pb-28">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <AuthorLinks links={post.social} />
          </div>
        </div>
      </article>

      <section aria-labelledby="siguiente" className="relative bg-surface-violet">
        <Wave color="fill-bg" flip />

        <div className="shell grid gap-8 pb-20 pt-4 md:grid-cols-2 md:items-center md:pb-28">
          <div>
            <h2 id="siguiente" className="text-2xl font-semibold leading-snug text-fg md:text-3xl">
              Siguiente artículo
            </h2>
            <Link
              to={`${routes.blog}/${next.slug}`}
              className="group mt-4 inline-flex items-start gap-3 font-display text-lg font-semibold leading-snug text-fg md:text-xl"
            >
              {next.title}
              <ArrowRight
                size={20}
                weight="bold"
                className="mt-1 shrink-0 text-lime-text transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="rounded-card border border-line bg-card p-7 md:p-8">
            <h2 className="font-display text-xl font-semibold text-fg">
              ¿Necesita aplicar esto en su lote?
            </h2>
            <p className="mt-3 leading-relaxed text-fg-muted">
              El equipo agronómico de Belagro puede traducir este criterio en un plan de nutrición
              para su cultivo.
            </p>
            <Button to={routes.contact} className="mt-6">
              Hable con nuestro equipo
              <ArrowRight size={18} weight="bold" />
            </Button>
          </div>
        </div>

        <Wave color="fill-bg" />
      </section>
    </>
  )
}
