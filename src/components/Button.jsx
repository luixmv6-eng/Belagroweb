import { Link } from 'react-router-dom'

// Sin `whitespace-nowrap`: en 375px una etiqueta larga como "Ver soluciones por etapa
// del cultivo" desbordaría horizontalmente. En escritorio hay ancho de sobra y cabe
// en una línea, que es donde la regla de "el CTA no envuelve" importa.
const base =
  'group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-[0.95rem] font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants = {
  // El verde 7488 C es el unico color de accion del sitio. El texto va casi negro
  // (7.1:1). El verde puro no separa del blanco por si solo (2.5:1), asi que el
  // halo verde es el que le da borde perceptible al boton, no es decoracion.
  primary:
    'bg-lime text-on-lime shadow-[var(--shadow-action)] hover:bg-lime-strong hover:shadow-[var(--shadow-action-hover)]',
  outline:
    'border border-line-strong bg-transparent text-fg hover:border-lime hover:bg-lime/10',
  // For use on the deep violet band only.
  onViolet:
    'border border-onviolet-line-strong bg-onviolet-fill text-on-violet backdrop-blur-sm hover:border-lime hover:bg-lime hover:text-on-lime',
}

const sizes = {
  md: '',
  sm: 'px-4 py-2 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  )
}
