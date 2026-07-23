/**
 * React 19 iza <title>, <meta> y <link> al <head> aunque se rendericen aquí,
 * así que no hace falta una librería extra de head management.
 */
export default function Seo({ title, description, path = '/', image, type = 'website', jsonLd }) {
  const full = title ? `${title} | Belagro` : 'Belagro | Fertilizantes líquidos'
  const url = `https://belagro.co${path}`

  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_CO" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  )
}
