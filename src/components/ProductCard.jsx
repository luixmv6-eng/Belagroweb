import { motion, useReducedMotion } from 'motion/react'
import { DownloadSimple, ShieldCheck } from '@phosphor-icons/react'

/**
 * Ficha de producto. Elevación y escala sutiles en hover (feedback táctil),
 * nunca desplazamiento de layout.
 */
export default function ProductCard({ product, index = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="flex h-full flex-col rounded-card border border-line bg-card p-7 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-8"
    >
      <h3 className="font-display text-2xl font-semibold text-fg">{product.name}</h3>

      <p className="mt-3 leading-relaxed text-fg-muted">{product.description}</p>

      <div className="mt-6">
        <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-violet">
          Componentes clave
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.components.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.85rem] text-fg"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-7">
        <a
          href={product.files.tecnica}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-on-lime transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
        >
          <DownloadSimple size={17} weight="bold" />
          Descargar ficha técnica
        </a>
        <a
          href={product.files.seguridad}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-fg transition-[transform,border-color,background-color] duration-200 hover:-translate-y-px hover:border-lime hover:bg-lime/10 active:scale-[0.98]"
        >
          <ShieldCheck size={17} weight="bold" />
          Ficha de seguridad
        </a>
      </div>
    </motion.article>
  )
}
