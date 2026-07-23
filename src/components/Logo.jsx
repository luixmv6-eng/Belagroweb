import { site } from '../data/site'

/**
 * Marca Belagro. Usa el archivo oficial del logo (triangulo lavanda con los tres
 * vertices naranja, verde y violeta), no una reconstruccion en SVG: el manual
 * manda sobre cualquier aproximacion nuestra.
 *
 * El PNG tiene transparencia real y va recortado a su bounding box, asi que
 * funciona igual sobre blanco, sobre la banda violeta oscura y en tema oscuro.
 * Lleva `width`/`height` intrinsecos para que no haya salto de layout (CLS).
 */
export function LogoMark({ className = 'h-8 w-auto' }) {
  return (
    <img
      src={site.logo.src}
      alt={site.logo.alt || ''}
      width={site.logo.width}
      height={site.logo.height}
      decoding="async"
      className={className}
    />
  )
}

/**
 * `size` controla marca y palabra a la vez para que nunca se descompensen.
 * `sm` es el de la barra de navegacion, que debe ocupar poco alto.
 */
const sizes = {
  sm: { mark: 'h-7 w-auto', word: 'text-[1.05rem]', gap: 'gap-2' },
  md: { mark: 'h-8 w-auto', word: 'text-lg', gap: 'gap-2.5' },
  lg: { mark: 'h-10 w-auto', word: 'text-xl', gap: 'gap-3' },
}

export default function Logo({ className = '', onViolet = false, size = 'md' }) {
  const s = sizes[size] ?? sizes.md

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <LogoMark className={s.mark} />
      <span
        className={`font-display font-semibold tracking-tight ${s.word} ${
          onViolet ? 'text-on-violet' : 'text-fg'
        }`}
      >
        {site.name}
      </span>
    </span>
  )
}
