/**
 * Imagen con dimensiones declaradas (evita CLS) y lazy loading por defecto.
 * `priority` se usa solo en el hero para no retrasar el LCP.
 */
export default function Img({ src, alt, width, height, className = '', priority = false, sizes }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}
