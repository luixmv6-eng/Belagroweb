import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Drop, Leaf, Plant } from '@phosphor-icons/react'
import { routes, site } from '../data/site'
import { media } from '../data/media'
import { stages } from '../data/products'
import { posts } from '../data/posts'
import { pages } from '../data/pages'
import { clients, partners } from '../data/clients'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Img from '../components/Img'
import Wave from '../components/Wave'
import CountUp from '../components/CountUp'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import LogoWall, { PartnerRow } from '../components/LogoWall'
import ArticleCard from '../components/ArticleCard'
import NewsletterForm from '../components/NewsletterForm'

const stageIcons = {
  establecimiento: Plant,
  vegetativo: Leaf,
  maduracion: Drop,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Belagro',
  description: 'Fertilizantes líquidos con enfoque técnico e industrial.',
  url: 'https://belagro.co',
  telephone: site.phone,
  email: site.emailComercial,
  parentOrganization: { '@type': 'Organization', name: 'Castilla Agrícola' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address,
    addressRegion: 'Valle del Cauca',
    addressCountry: 'CO',
  },
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-bg pb-4 pt-10 md:pt-16">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-32 size-[36rem] rounded-full bg-surface-violet blur-[90px] md:-right-24"
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-violet">
              {pages.home.hero.eyebrow}
            </span>
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[2.75rem] font-semibold leading-[1.04] text-fg sm:text-6xl lg:text-7xl"
          >
            {pages.home.hero.titleTop}
            <br />
            {pages.home.hero.titleBottom}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg-muted md:text-xl"
          >
            {pages.home.hero.lead}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to={routes.portfolio} size="lg">
              {pages.home.hero.primaryCta}
              <ArrowRight size={18} weight="bold" />
            </Button>
            <Button to={routes.fieldSupport} variant="outline" size="lg">
              {pages.home.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[40%_40%_36%_36%/12%_12%_8%_8%] border border-line shadow-[var(--shadow-card-hover)]">
            <Img
              {...media.heroPlant}
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatBand() {
  return (
    <section aria-labelledby="cifra" className="relative">
      <Wave color="fill-surface-violet-deep" />

      <div className="bg-surface-violet-deep py-16 text-on-violet md:py-20">
        <div className="shell flex flex-col items-center gap-4 text-center">
          <Reveal as="p" className="text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-lime">
            {pages.home.stat.eyebrow}
          </Reveal>

          <Reveal delay={0.08} className="flex items-baseline gap-2">
            <CountUp
              to={pages.home.stat.value}
              className="font-display text-7xl font-semibold leading-none md:text-8xl"
              aria-label={pages.home.stat.srLabel}
            />
            <span className="font-display text-5xl font-semibold leading-none text-lime md:text-6xl">
              {pages.home.stat.suffix}
            </span>
          </Reveal>

          <Reveal
            as="h2"
            id="cifra"
            delay={0.14}
            className="text-xl font-normal text-on-violet-muted md:text-2xl"
          >
            {pages.home.stat.caption}
          </Reveal>
        </div>
      </div>

      <Wave color="fill-bg" bg="bg-surface-violet-deep" />
    </section>
  )
}

function Backing() {
  return (
    <section aria-label="Respaldo industrial" className="bg-bg pb-16 md:pb-20">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <Reveal as="p" className="text-lg font-medium text-fg-muted md:shrink-0">
          {pages.home.backing.label}
        </Reveal>
        <Reveal delay={0.08}>
          <PartnerRow items={partners} />
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <section aria-labelledby="sobre-belagro" className="section bg-bg pt-0 md:pt-0">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal y={36} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-card)]">
            <Img {...media.plantWide} className="aspect-[16/9] w-full object-cover" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal as="p" className="flex items-center gap-3">
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-violet">
              {pages.home.about.eyebrow}
            </span>
          </Reveal>

          <Reveal
            as="h2"
            id="sobre-belagro"
            delay={0.06}
            className="mt-5 text-3xl font-semibold leading-tight text-fg md:text-5xl"
          >
            {pages.home.about.title}
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-muted">
            {pages.home.about.body}
          </Reveal>

          <Reveal delay={0.18} className="mt-8">
            <Link
              to={routes.company}
              className="group inline-flex items-center gap-2 text-base font-semibold text-lime-text"
            >
              {pages.home.about.cta}
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stages() {
  const [first, ...rest] = stages

  return (
    <section aria-labelledby="etapas" className="relative bg-surface-violet">
      <Wave color="fill-bg" flip />

      <div className="shell pb-20 pt-4 md:pb-28">
        <Reveal as="p" className="flex items-center gap-3">
          <span className="h-px w-8 bg-lime" aria-hidden="true" />
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-violet">
            {pages.home.stages.eyebrow}
          </span>
        </Reveal>

        <Reveal
          as="h2"
          id="etapas"
          delay={0.06}
          className="mt-5 max-w-[16ch] text-3xl font-semibold leading-tight text-fg md:text-5xl"
        >
          {pages.home.stages.title}
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 md:grid-rows-2">
          {[first, ...rest].map((stage, i) => {
            const Icon = stageIcons[stage.id]
            const isFirst = i === 0

            return (
              <RevealItem
                key={stage.id}
                as="article"
                className={isFirst ? 'md:row-span-2' : ''}
              >
                <Link
                  to={stage.to}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${
                    isFirst ? '' : 'md:flex-row'
                  }`}
                >
                  <div
                    className={`shrink-0 overflow-hidden bg-surface ${
                      isFirst
                        ? 'aspect-[16/9] w-full md:aspect-[4/3]'
                        : 'aspect-[16/9] w-full md:h-auto md:w-[42%]'
                    }`}
                  >
                    <Img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      width={stage.image.width}
                      height={stage.image.height}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-lime-tint text-lime-text">
                      <Icon size={22} weight="regular" aria-hidden="true" />
                    </span>

                    <h3
                      className={`mt-5 font-display font-semibold leading-snug text-fg ${
                        isFirst ? 'text-2xl md:text-[2rem]' : 'text-xl'
                      }`}
                    >
                      {stage.title}
                    </h3>

                    {isFirst && (
                      <p className="mt-3 max-w-[46ch] leading-relaxed text-fg-muted">
                        {stage.portfolioIntro}
                      </p>
                    )}

                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-lime-text">
                      {pages.home.stages.cardCta}
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>

      <Wave color="fill-bg" />
    </section>
  )
}

function Clients() {
  return (
    <section aria-labelledby="clientes" className="section bg-bg">
      <div className="shell">
        <div className="flex flex-col gap-5 md:max-w-[60ch]">
          <Reveal as="h2" id="clientes" className="text-3xl font-semibold leading-tight text-fg md:text-4xl">
            {pages.home.clients.title}
          </Reveal>
          <Reveal as="p" delay={0.06} className="text-lg leading-relaxed text-fg-muted">
            {pages.home.clients.lead}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-12">
          <LogoWall items={clients} />
        </Reveal>
      </div>
    </section>
  )
}

function Academy() {
  const [featured, ...rest] = posts.slice(0, 3)

  return (
    // Lavanda con curvas, igual que "Etapas". Antes era la unica seccion gris de
    // toda la web y entraba con borde recto: eso es lo que hacia que el scroll se
    // sintiera como recortes pegados en vez de una pagina continua.
    <section aria-labelledby="academia" className="relative bg-surface-violet">
      <Wave color="fill-bg" flip />

      <div className="shell pb-20 pt-4 md:pb-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[46ch]">
            <Reveal
              as="h2"
              id="academia"
              className="text-3xl font-semibold leading-tight text-fg md:text-5xl"
            >
              {pages.home.academy.title}
            </Reveal>
            <Reveal as="p" delay={0.06} className="mt-4 text-lg leading-relaxed text-fg-muted">
              {pages.home.academy.lead}
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Button to={routes.blog}>
              {pages.home.academy.cta}
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          <ArticleCard post={featured} featured />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>

      <Wave color="fill-bg" />
    </section>
  )
}

function Newsletter() {
  return (
    <section aria-labelledby="inscribete" className="section bg-bg">
      <div className="shell">
        <Reveal y={36}>
          <div className="grid gap-10 rounded-card bg-surface-violet-deep p-8 text-on-violet md:grid-cols-[1fr_1.15fr] md:items-center md:gap-16 md:p-14">
            <div>
              <h2 id="inscribete" className="text-3xl font-semibold leading-tight md:text-4xl">
                {pages.home.newsletter.title}
              </h2>
              <p className="mt-4 max-w-[42ch] leading-relaxed text-on-violet-muted">
                {pages.home.newsletter.lead}
              </p>
              <p className="mt-6 flex items-center gap-2.5 font-display text-lg font-medium text-lime">
                <Leaf size={20} weight="fill" aria-hidden="true" />
                {pages.home.newsletter.highlight}
              </p>
            </div>

            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
title={pages.home.seoTitle}
        description={pages.home.seoDescription}
        path="/"
        jsonLd={jsonLd}
      />

      <Hero />
      <StatBand />
      <Backing />
      <About />
      <Stages />
      <Clients />
      <Academy />
      <Newsletter />
    </>
  )
}
