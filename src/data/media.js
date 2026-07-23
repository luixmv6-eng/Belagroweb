/**
 * TODO (Belagro): reemplazar cada URL por la fotografía real correspondiente.
 * Todas las imágenes del sitio se resuelven desde este archivo, así que basta con
 * cambiar la ruta aquí (por ejemplo '/img/hero-planta.webp' dentro de /public/img).
 *
 * Mientras tanto se usan placeholders estables de picsum.photos con semilla fija,
 * para que el layout, el lazy loading y las relaciones de aspecto queden correctos.
 *
 * REGLA: la proporción declarada aquí debe ser la misma con la que se muestra la
 * imagen en pantalla. Si no coinciden, `object-cover` recorta en silencio y la
 * foto pierde el encuadre. Al sustituir por fotos reales, respete la proporción
 * indicada en cada entrada o ajuste también la clase `aspect-[...]` que la pinta.
 *
 * Proporciones en uso:
 *   4/3    fotos de apoyo en secciones (equipo, campo, laboratorio, envasado)
 *   16/9   banners anchos y portadas de Academia
 *   16/10  imágenes de contacto y ubicación
 */
const ph = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const media = {
  // Vista aérea de la planta: bodegas de techo rojo entre campos verdes.
  heroPlant: {
    src: ph('belagro-planta-aerea', 1600, 1200),
    width: 1600,
    height: 1200,
    alt: 'Vista aérea de la planta de fertilizantes de Belagro entre campos de cultivo del Valle del Cauca',
  },
  plantWide: {
    src: ph('belagro-bodegas-techo-rojo', 1600, 900),
    width: 1600,
    height: 900,
    alt: 'Bodegas de producción de Belagro en la Hacienda Potrerillo',
  },
  team: {
    src: ph('belagro-equipo-agronomos', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Equipo de agrónomos y químicos de Belagro revisando una formulación',
  },
  field: {
    src: ph('belagro-cana-campo', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Cultivo de caña de azúcar en desarrollo vegetativo',
  },
  rooting: {
    src: ph('belagro-raices-enraizamiento', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Raíces jóvenes de un cultivo recién establecido',
  },
  vegetative: {
    src: ph('belagro-follaje-vegetativo', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Follaje en pleno crecimiento vegetativo',
  },
  ripening: {
    src: ph('belagro-maduracion-cosecha', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Cultivo en fase de maduración previo a cosecha',
  },
  lab: {
    src: ph('belagro-laboratorio-formulacion', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Laboratorio de formulación de fertilizantes líquidos',
  },
  filling: {
    src: ph('belagro-envasado-garrafas', 1200, 900),
    width: 1200,
    height: 900,
    alt: 'Línea de envasado de fertilizantes líquidos en garrafas',
  },
  contact: {
    src: ph('belagro-valle-del-cauca-vias', 1600, 1000),
    width: 1600,
    height: 1000,
    alt: 'Vía de acceso a la Hacienda Potrerillo, Valle del Cauca',
  },
  posts: {
    vertisoles: ph('belagro-vertisoles-suelo-sodico', 1600, 900),
    fotosintesis: ph('belagro-fotosintesis-hoja', 1600, 900),
    estres: ph('belagro-estres-fisiologico-planta', 1600, 900),
    transpiracion: ph('belagro-transpiracion-estomas', 1600, 900),
  },
}
