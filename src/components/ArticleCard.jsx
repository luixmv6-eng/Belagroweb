import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Clock } from '@phosphor-icons/react'
import { routes } from '../data/site'
import Img from './Img'

export default function ArticleCard({ post, featured = false, index = 0 }) {
  const reduce = useReducedMotion()
  const to = `${routes.blog}/${post.slug}`

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <div className={`overflow-hidden bg-surface ${featured ? 'md:w-[46%]' : ''}`}>
        <Img
          src={post.cover}
          alt=""
          width={1600}
          height={900}
          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            featured ? 'aspect-[16/9] md:h-full' : 'aspect-[16/9]'
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] text-fg-muted">
          {post.author && <span className="font-semibold text-violet">{post.author}</span>}
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} weight="regular" aria-hidden="true" />
            {post.readingTime}
          </span>
        </p>

        <h3
          className={`mt-3 font-display font-semibold leading-snug text-fg ${
            featured ? 'text-2xl md:text-[1.75rem]' : 'text-xl'
          }`}
        >
          <Link to={to} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 leading-relaxed text-fg-muted">{post.excerpt}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-lime-text">
          Leer artículo
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.article>
  )
}
