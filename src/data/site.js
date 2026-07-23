export const site = {
  name: 'Belagro',
  tagline: 'Fertilizantes líquidos',
  /* Logo de la barra superior y del pie. Editable desde el panel. */
  logo: {
    src: '/logo-belagro.png',
    width: 278,
    height: 243,
    alt: '',
  },
  /* Formulario de PQRS en Microsoft Forms. Vacío = la página cae al correo. */
  pqrsFormUrl: '',
  address: 'Km 3,5 Vía Pradera - Florida, Hacienda Potrerillo',
  region: 'Valle del Cauca, Colombia',
  phone: '+57 310 259 2242',
  phoneRaw: '573102592242',
  emailComercial: 'pamejia@agricolas.co',
  emailPqrs: 'contactanos.belagro@agricolas.co',
  linkedin: 'https://www.linkedin.com/company/belagro-fertilizantes-liquidoss/',
  whatsappMessage: 'Hola Belagro, quiero asesoría técnica sobre fertilizantes líquidos.',
  backedBy: 'Castilla Agrícola',
  legalNote:
    'Toda información suministrada será tratada bajo estrictos estándares de confidencialidad conforme a nuestra Política de Protección de Datos Personales (Ley 1581)',
}

/**
 * Asesores comerciales. El boton de WhatsApp no es un chat: solo abre wa.me con
 * el mensaje prellenado, y como hay dos numeros el usuario elige a quien escribe.
 * Para agregar o quitar asesores basta con tocar esta lista.
 */
export const advisors = [
  { name: 'Asesor 1', phone: '+57 313 788 8486', phoneRaw: '573137888486' },
  { name: 'Asesor 2', phone: '+57 310 259 2242', phoneRaw: '573102592242' },
]

export const whatsappLink = (phoneRaw, message = site.whatsappMessage) =>
  `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`

/**
 * Enlace por defecto, para los sitios donde solo cabe un WhatsApp (pie).
 * Es una función y no una constante a propósito: el contenido del panel se funde
 * sobre estos datos al arrancar, y una constante calculada al importar el módulo
 * se quedaría con el número anterior.
 */
export const defaultWhatsappUrl = () => whatsappLink(advisors[0]?.phoneRaw ?? site.phoneRaw)

/**
 * Ubicacion de la planta. `mapQuery` es lo que se le pasa a Google Maps; si
 * alguna vez hay coordenadas exactas, se reemplaza por "lat,lng" y todo lo demas
 * sigue funcionando igual.
 */
export const location = {
  mapQuery: 'Hacienda Potrerillo, Vía Pradera - Florida, Valle del Cauca, Colombia',
  get embedUrl() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&z=13&output=embed`
  },
  get directionsUrl() {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.mapQuery)}`
  },
}

/**
 * Rutas conservadas tal cual del sitio actual para no romper enlaces ni SEO.
 */
export const routes = {
  home: '/',
  company: '/nuestra-compañía',
  fieldSupport: '/general-4',
  productDev: '/general-7',
  maquila: '/services-2-1',
  portfolio: '/portafolio-técnico',
  stageRooting: '/services-2',
  stageVegetative: '/copia-de-servicios',
  stageRipening: '/copia-de-copia-de-servicios',
  blog: '/blog',
  contact: '/contacto',
  pqrs: '/contact-1',
  privacy: '/política-de-privacidad',
}

/**
 * Rutas "pesadas": las que traen bastantes imagenes o secciones largas y por
 * tanto tardan lo suficiente como para que valga la pena una pantalla de carga.
 * Las demas (indices, formularios, textos legales) entran casi al instante y
 * mostrarles una animacion solo aporta parpadeo.
 */
const heavyRoutes = new Set([
  routes.company,
  routes.portfolio,
  routes.stageRooting,
  routes.stageVegetative,
  routes.stageRipening,
  routes.maquila,
  routes.fieldSupport,
  routes.productDev,
])

export const isHeavyRoute = (pathname) =>
  heavyRoutes.has(pathname) ||
  // Las entradas de Academia llevan portada y cuerpo largo.
  (pathname.startsWith(`${routes.blog}/`) && pathname !== `${routes.blog}/`)

export const nav = [
  { label: 'Inicio', to: routes.home },
  { label: 'Nuestra compañía', to: routes.company },
  {
    label: 'Servicios',
    to: routes.fieldSupport,
    children: [
      {
        label: 'Acompañamiento en campo',
        to: routes.fieldSupport,
        hint: 'Estrategias de nutrición basadas en precisión agronómica',
      },
      {
        label: 'Desarrollo de productos',
        to: routes.productDev,
        hint: 'Formulación a la medida del cultivo',
      },
      {
        label: 'Maquila',
        to: routes.maquila,
        hint: 'Producción, envasado y etiquetado industrial',
      },
    ],
  },
  {
    label: 'Portafolio técnico',
    to: routes.portfolio,
    children: [
      {
        label: 'Establecimiento inicial y enraizamiento',
        to: routes.stageRooting,
        hint: 'Radicast, Radicast Hormonal y fórmulas especiales',
      },
      {
        label: 'Desarrollo vegetativo',
        to: routes.stageVegetative,
        hint: 'Nutricast y Nutricast RP',
      },
      {
        label: 'Maduración',
        to: routes.stageRipening,
        hint: 'Maducast y Maducast caña',
      },
    ],
  },
  { label: 'Academia', to: routes.blog },
  { label: 'Contacto', to: routes.contact },
]
