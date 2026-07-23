/**
 * Esquema del panel de administración.
 *
 * Este archivo es la única fuente de verdad de lo que se puede editar. De él
 * salen el menú lateral, los formularios y las validaciones. Para hacer editable
 * algo nuevo basta con añadir un campo aquí; no hay que tocar el panel.
 *
 * Tipos de campo:
 *   text · textarea · number · url · email · tel · image · list
 *
 * `path` es la ruta dentro de los datos, empezando por la sección
 * (`site`, `media`, `pages`, `nav`, `advisors`, `location`, `clients`).
 */

export const groups = [
  {
    id: 'marca',
    label: 'Marca y contacto',
    hint: 'Los datos de la empresa. Aparecen en varias páginas a la vez.',
  },
  {
    id: 'estructura',
    label: 'Estructura del sitio',
    hint: 'Lo que se repite en todas las páginas: barra superior y pie.',
  },
  {
    id: 'inicio',
    label: 'Página de inicio',
    hint: 'Cada bloque de la portada, en el orden en que se ve al bajar.',
  },
  {
    id: 'paginas',
    label: 'Páginas interiores',
    hint: 'Una entrada por página del sitio, en el orden del menú.',
  },
  {
    id: 'contenido',
    label: 'Contenido',
    hint: 'Artículos de Academia e imágenes del sitio.',
  },
]

/** Campos de cabecera que se repiten en todas las páginas interiores. */
const headerFields = (base) => [
  { path: `${base}.kicker`, label: 'Antetítulo', type: 'text' },
  { path: `${base}.title`, label: 'Título', type: 'text' },
  { path: `${base}.lead`, label: 'Descripción', type: 'textarea' },
]

/** Título y descripción para buscadores y para compartir en redes. */
const seoFields = (base) => [
  {
    path: `${base}.seoTitle`,
    label: 'Título para buscadores',
    type: 'text',
    help: 'Lo que aparece en la pestaña del navegador y en Google.',
  },
  {
    path: `${base}.seoDescription`,
    label: 'Descripción para buscadores',
    type: 'textarea',
    help: 'Unas 25 palabras. Es el resumen que se ve bajo el título en Google.',
  },
]

/** Lista de elementos con solo texto (servicios, párrafos legales). */
const textList = (path, label, addLabel) => ({
  path,
  label,
  type: 'list',
  addLabel,
  itemLabel: 'text',
  itemFields: [{ path: 'text', label: 'Texto', type: 'textarea' }],
})

/** Lista de elementos con título y texto (ejes, misión/visión, figuras de PQRS). */
const titledList = (path, label, addLabel, help) => ({
  path,
  label,
  type: 'list',
  addLabel,
  help,
  itemLabel: 'title',
  itemFields: [
    { path: 'title', label: 'Título', type: 'text' },
    { path: 'text', label: 'Texto', type: 'textarea' },
  ],
})

export const sections = [
  /* ---------------------------------------------------------------- marca */
  {
    id: 'identidad',
    group: 'marca',
    label: 'Identidad',
    description: 'Nombre y descripción corta de la empresa.',
    fields: [
      { path: 'site.name', label: 'Nombre', type: 'text' },
      { path: 'site.tagline', label: 'Descriptor', type: 'text' },
      {
        path: 'site.backedBy',
        label: 'Respaldado por',
        type: 'text',
        help: 'Aparece en el pie de página y en la portada.',
      },
    ],
  },
  {
    id: 'contacto',
    group: 'marca',
    label: 'Datos de contacto',
    description: 'Dirección, teléfono y correos. Se usan en pie, contacto y PQRS.',
    fields: [
      { path: 'site.address', label: 'Dirección', type: 'text' },
      { path: 'site.region', label: 'Región', type: 'text' },
      { path: 'site.phone', label: 'Teléfono visible', type: 'tel' },
      {
        path: 'site.phoneRaw',
        label: 'Teléfono para enlaces',
        type: 'text',
        help: 'Solo dígitos con indicativo, sin espacios ni signos. Ejemplo: 573102592242',
      },
      { path: 'site.emailComercial', label: 'Correo comercial', type: 'email' },
      { path: 'site.emailPqrs', label: 'Correo de PQRS', type: 'email' },
    ],
  },
  {
    id: 'asesores',
    group: 'marca',
    label: 'Asesores de WhatsApp',
    description: 'Quiénes aparecen al pulsar el botón flotante de WhatsApp.',
    fields: [
      { path: 'pages.whatsapp.invite', label: 'Mensaje del panel', type: 'textarea' },
      {
        path: 'site.whatsappMessage',
        label: 'Texto prellenado del chat',
        type: 'textarea',
        help: 'Lo que aparece ya escrito cuando se abre WhatsApp.',
      },
      {
        path: 'advisors',
        label: 'Asesores',
        type: 'list',
        addLabel: 'Añadir asesor',
        itemLabel: 'name',
        itemFields: [
          { path: 'name', label: 'Nombre', type: 'text' },
          { path: 'phone', label: 'Teléfono visible', type: 'tel' },
          {
            path: 'phoneRaw',
            label: 'Número para el enlace',
            type: 'text',
            help: 'Solo dígitos con indicativo. Ejemplo: 573137888486',
          },
        ],
      },
    ],
  },
  {
    id: 'enlaces',
    group: 'marca',
    label: 'Redes y formularios',
    description: 'Enlaces externos del sitio.',
    fields: [
      { path: 'site.linkedin', label: 'LinkedIn', type: 'url' },
      {
        path: 'site.pqrsFormUrl',
        label: 'Formulario de PQRS',
        type: 'url',
        help: 'Enlace del formulario de Microsoft Forms. Si se deja vacío, el botón escribe al correo de PQRS.',
      },
    ],
  },
  {
    id: 'ubicacion',
    group: 'marca',
    label: 'Ubicación',
    description: 'Lo que se busca en el mapa del pie de página.',
    fields: [
      {
        path: 'location.mapQuery',
        label: 'Dirección para el mapa',
        type: 'text',
        help: 'Puede ser una dirección o unas coordenadas "latitud,longitud" para mayor precisión.',
      },
    ],
  },

  /* ----------------------------------------------------------- estructura */
  {
    id: 'encabezado',
    group: 'estructura',
    label: 'Encabezado',
    description: 'Logo, botón y menú de la barra superior.',
    fields: [
      {
        path: 'site.logo',
        label: 'Logo',
        type: 'image',
        help: 'Se muestra en la barra superior y en el pie. Use PNG o SVG con fondo transparente.',
      },
      { path: 'pages.header.ctaLabel', label: 'Texto del botón', type: 'text' },
      {
        path: 'nav',
        label: 'Menú de navegación',
        type: 'list',
        addLabel: 'Añadir entrada',
        itemLabel: 'label',
        itemFields: [
          { path: 'label', label: 'Texto', type: 'text' },
          { path: 'to', label: 'Enlace', type: 'text', help: 'Ruta interna, por ejemplo /contacto' },
          {
            path: 'children',
            label: 'Submenú',
            type: 'list',
            addLabel: 'Añadir subentrada',
            itemLabel: 'label',
            itemFields: [
              { path: 'label', label: 'Texto', type: 'text' },
              { path: 'to', label: 'Enlace', type: 'text' },
              { path: 'hint', label: 'Descripción', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pie',
    group: 'estructura',
    label: 'Pie de página',
    description: 'Textos del pie. Los datos de contacto se editan en "Datos de contacto".',
    fields: [
      { path: 'pages.footer.intro', label: 'Texto introductorio', type: 'textarea' },
      { path: 'pages.footer.navHeading', label: 'Título de navegación', type: 'text' },
      { path: 'pages.footer.careHeading', label: 'Título de atención', type: 'text' },
      { path: 'pages.footer.locationHeading', label: 'Título de ubicación', type: 'text' },
      { path: 'pages.footer.directionsCta', label: 'Enlace del mapa', type: 'text' },
      { path: 'pages.footer.rights', label: 'Derechos reservados', type: 'text' },
      { path: 'pages.footer.backing', label: 'Línea de respaldo', type: 'text' },
    ],
  },

  /* ---------------------------------------------------------------- inicio */
  {
    id: 'inicio-portada',
    group: 'inicio',
    label: 'Portada',
    description: 'El primer bloque que se ve al entrar.',
    fields: [
      { path: 'pages.home.hero.eyebrow', label: 'Antetítulo', type: 'text' },
      { path: 'pages.home.hero.titleTop', label: 'Título, primera línea', type: 'text' },
      { path: 'pages.home.hero.titleBottom', label: 'Título, segunda línea', type: 'text' },
      {
        path: 'pages.home.hero.lead',
        label: 'Descripción',
        type: 'textarea',
        help: 'Máximo unas 20 palabras: debe caber sin empujar los botones fuera de pantalla.',
      },
      { path: 'pages.home.hero.primaryCta', label: 'Botón principal', type: 'text' },
      { path: 'pages.home.hero.secondaryCta', label: 'Botón secundario', type: 'text' },
      { path: 'media.heroPlant', label: 'Imagen de portada', type: 'image', ratio: '4/3' },
    ],
  },
  {
    id: 'inicio-cifra',
    group: 'inicio',
    label: 'Cifra destacada',
    description: 'La banda violeta con el contador.',
    fields: [
      { path: 'pages.home.stat.eyebrow', label: 'Antetítulo', type: 'text' },
      { path: 'pages.home.stat.value', label: 'Número', type: 'number' },
      { path: 'pages.home.stat.suffix', label: 'Símbolo posterior', type: 'text' },
      { path: 'pages.home.stat.caption', label: 'Descripción', type: 'text' },
      {
        path: 'pages.home.stat.srLabel',
        label: 'Texto para lectores de pantalla',
        type: 'text',
        help: 'La cifra completa en palabras, para quien no ve la animación del contador.',
      },
      { path: 'pages.home.backing.label', label: 'Texto de respaldo', type: 'text' },
    ],
  },
  {
    id: 'inicio-sobre',
    group: 'inicio',
    label: 'Sobre Belagro',
    fields: [
      { path: 'pages.home.about.eyebrow', label: 'Antetítulo', type: 'text' },
      { path: 'pages.home.about.title', label: 'Título', type: 'text' },
      { path: 'pages.home.about.body', label: 'Texto', type: 'textarea' },
      { path: 'pages.home.about.cta', label: 'Enlace', type: 'text' },
      { path: 'media.plantWide', label: 'Imagen', type: 'image', ratio: '16/9' },
    ],
  },
  {
    id: 'inicio-etapas',
    group: 'inicio',
    label: 'Etapas del cultivo',
    description: 'Encabezado del bloque. Las etapas se editan en "Productos".',
    fields: [
      { path: 'pages.home.stages.eyebrow', label: 'Antetítulo', type: 'text' },
      { path: 'pages.home.stages.title', label: 'Título', type: 'text' },
      { path: 'pages.home.stages.cardCta', label: 'Enlace de cada tarjeta', type: 'text' },
    ],
  },
  {
    id: 'inicio-clientes',
    group: 'inicio',
    label: 'Clientes',
    fields: [
      { path: 'pages.home.clients.title', label: 'Título', type: 'text' },
      { path: 'pages.home.clients.lead', label: 'Descripción', type: 'textarea' },
      {
        path: 'clients',
        label: 'Logos de clientes',
        type: 'list',
        addLabel: 'Añadir cliente',
        itemLabel: 'name',
        itemFields: [{ path: 'name', label: 'Nombre', type: 'text' }],
      },
    ],
  },
  {
    id: 'inicio-academia',
    group: 'inicio',
    label: 'Bloque de Academia',
    description: 'Encabezado. Los artículos se editan en "Academia".',
    fields: [
      { path: 'pages.home.academy.title', label: 'Título', type: 'text' },
      { path: 'pages.home.academy.lead', label: 'Descripción', type: 'textarea' },
      { path: 'pages.home.academy.cta', label: 'Botón', type: 'text' },
    ],
  },
  {
    id: 'inicio-boletin',
    group: 'inicio',
    label: 'Boletín',
    fields: [
      { path: 'pages.home.newsletter.title', label: 'Título', type: 'text' },
      { path: 'pages.home.newsletter.lead', label: 'Descripción', type: 'textarea' },
      { path: 'pages.home.newsletter.highlight', label: 'Línea destacada', type: 'text' },
    ],
  },

  /* --------------------------------------------------------------- páginas */
  {
    id: 'pag-compania',
    group: 'paginas',
    label: 'Nuestra compañía',
    fields: [
      ...headerFields('pages.company'),
      { path: 'pages.company.cta', label: 'Botón de cabecera', type: 'text' },
      { path: 'pages.company.milestone.year', label: 'Hito: año', type: 'text' },
      { path: 'pages.company.milestone.title', label: 'Hito: título', type: 'text' },
      { path: 'pages.company.milestone.value', label: 'Hito: cifra', type: 'number' },
      { path: 'pages.company.milestone.valueLabel', label: 'Hito: unidad', type: 'text' },
      {
        path: 'pages.company.milestone.srLabel',
        label: 'Hito: texto para lectores de pantalla',
        type: 'text',
      },
      { path: 'pages.company.team.eyebrow', label: 'Equipo: antetítulo', type: 'text' },
      { path: 'pages.company.team.title', label: 'Equipo: título', type: 'text' },
      { path: 'pages.company.team.body', label: 'Equipo: texto', type: 'textarea' },
      { path: 'media.team', label: 'Equipo: imagen', type: 'image', ratio: '4/3' },
      { path: 'pages.company.direction.title', label: 'Dirección: título', type: 'text' },
      titledList(
        'pages.company.direction.items',
        'Dirección: misión y visión',
        'Añadir elemento',
        'El icono de cada tarjeta lo pone el código, según su posición.',
      ),
      { path: 'pages.company.projection.title', label: 'Proyección: título', type: 'text' },
      { path: 'pages.company.projection.body', label: 'Proyección: texto', type: 'textarea' },
      { path: 'pages.company.projection.highlight', label: 'Proyección: destacado', type: 'textarea' },
      ...seoFields('pages.company'),
    ],
  },
  {
    id: 'pag-campo',
    group: 'paginas',
    label: 'Acompañamiento en campo',
    fields: [
      ...headerFields('pages.fieldSupport'),
      { path: 'pages.fieldSupport.cta', label: 'Botón de cabecera', type: 'text' },
      { path: 'media.field', label: 'Imagen de cabecera', type: 'image', ratio: '4/3' },
      { path: 'pages.fieldSupport.approachTitle', label: 'Enfoque: título', type: 'textarea' },
      { path: 'pages.fieldSupport.approachBody', label: 'Enfoque: texto', type: 'textarea' },
      titledList('pages.fieldSupport.pillars', 'Ejes del acompañamiento', 'Añadir eje'),
      { path: 'pages.fieldSupport.closingTitle', label: 'Cierre: título', type: 'text' },
      { path: 'pages.fieldSupport.closingCta', label: 'Cierre: botón', type: 'text' },
      ...seoFields('pages.fieldSupport'),
    ],
  },
  {
    id: 'pag-desarrollo',
    group: 'paginas',
    label: 'Desarrollo de productos',
    fields: [
      ...headerFields('pages.productDev'),
      { path: 'pages.productDev.cta', label: 'Botón de cabecera', type: 'text' },
      { path: 'media.lab', label: 'Imagen de cabecera', type: 'image', ratio: '4/3' },
      { path: 'pages.productDev.servicesTitle', label: 'Servicios: título', type: 'text' },
      textList('pages.productDev.services', 'Servicios', 'Añadir servicio'),
      { path: 'pages.productDev.closingTitle', label: 'Cierre: título', type: 'text' },
      { path: 'pages.productDev.closingCta', label: 'Cierre: botón', type: 'text' },
      ...seoFields('pages.productDev'),
    ],
  },
  {
    id: 'pag-maquila',
    group: 'paginas',
    label: 'Maquila industrial',
    fields: [
      ...headerFields('pages.maquila'),
      { path: 'pages.maquila.cta', label: 'Botón de cabecera', type: 'text' },
      { path: 'media.filling', label: 'Imagen de cabecera', type: 'image', ratio: '4/3' },
      {
        path: 'pages.maquila.capacity.value',
        label: 'Capacidad instalada',
        type: 'number',
        help: 'En millones de litros al año. Hoy está en 0 porque no se ha facilitado la cifra real.',
      },
      { path: 'pages.maquila.capacity.title', label: 'Capacidad: título', type: 'text' },
      { path: 'pages.maquila.capacity.body', label: 'Capacidad: texto', type: 'textarea' },
      { path: 'pages.maquila.servicesTitle', label: 'Servicios: título', type: 'text' },
      textList('pages.maquila.services', 'Servicios', 'Añadir servicio'),
      { path: 'pages.maquila.contactTitle', label: 'Contacto: título', type: 'text' },
      { path: 'pages.maquila.submitLabel', label: 'Contacto: botón de envío', type: 'text' },
      ...seoFields('pages.maquila'),
    ],
  },
  {
    id: 'pag-portafolio',
    group: 'paginas',
    label: 'Portafolio técnico',
    fields: [
      ...headerFields('pages.portfolio'),
      { path: 'pages.portfolio.availableIn', label: 'Etiqueta de presentaciones', type: 'text' },
      { path: 'pages.portfolio.specsCta', label: 'Enlace de cada producto', type: 'text' },
      { path: 'pages.portfolio.method.title', label: 'Método: título', type: 'text' },
      { path: 'pages.portfolio.method.body', label: 'Método: texto', type: 'textarea' },
      { path: 'pages.portfolio.method.cta', label: 'Método: botón', type: 'text' },
      ...seoFields('pages.portfolio'),
    ],
  },
  {
    id: 'pag-etapas',
    group: 'paginas',
    label: 'Páginas de etapa',
    description:
      'Textos comunes a las tres etapas del cultivo. Los productos se editan en el código.',
    fields: [
      { path: 'pages.stage.primaryCta', label: 'Botón principal', type: 'text' },
      { path: 'pages.stage.secondaryCta', label: 'Botón secundario', type: 'text' },
      { path: 'pages.stage.productsTitle', label: 'Título de productos', type: 'text' },
      { path: 'pages.stage.availableIn', label: 'Etiqueta de presentaciones', type: 'text' },
      { path: 'pages.stage.othersTitle', label: 'Título de otras etapas', type: 'text' },
      { path: 'media.rooting', label: 'Imagen: enraizamiento', type: 'image', ratio: '4/3' },
      { path: 'media.vegetative', label: 'Imagen: vegetativo', type: 'image', ratio: '4/3' },
      { path: 'media.ripening', label: 'Imagen: maduración', type: 'image', ratio: '4/3' },
    ],
  },
  {
    id: 'pag-contacto',
    group: 'paginas',
    label: 'Contacto',
    description: 'Los datos (dirección, teléfono, correo) se editan en "Datos de contacto".',
    fields: [
      ...headerFields('pages.contact'),
      { path: 'pages.contact.labelAddress', label: 'Etiqueta de dirección', type: 'text' },
      { path: 'pages.contact.labelPhone', label: 'Etiqueta de teléfono', type: 'text' },
      { path: 'pages.contact.labelEmail', label: 'Etiqueta de correo', type: 'text' },
      { path: 'pages.contact.labelSocial', label: 'Etiqueta de redes', type: 'text' },
      { path: 'pages.contact.socialName', label: 'Nombre de la red', type: 'text' },
      { path: 'media.contact', label: 'Imagen', type: 'image', ratio: '16/10' },
      { path: 'pages.contact.pqrs.title', label: 'Bloque PQRS: título', type: 'text' },
      { path: 'pages.contact.pqrs.body', label: 'Bloque PQRS: texto', type: 'textarea' },
      { path: 'pages.contact.pqrs.cta', label: 'Bloque PQRS: enlace', type: 'text' },
      ...seoFields('pages.contact'),
    ],
  },
  {
    id: 'pag-academia',
    group: 'paginas',
    label: 'Academia (portada)',
    description: 'La cabecera del listado. Los artículos se editan en "Academia".',
    fields: [
      ...headerFields('pages.blog'),
      { path: 'pages.blog.filterLabel', label: 'Texto del filtro', type: 'text' },
      ...seoFields('pages.blog'),
    ],
  },
  {
    id: 'pag-pqrs',
    group: 'paginas',
    label: 'PQRS',
    description:
      'Revise el texto legal con su asesor antes de publicarlo. El enlace del formulario se edita en "Redes y formularios".',
    fields: [
      ...headerFields('pages.pqrs'),
      { path: 'pages.pqrs.headerCta', label: 'Botón de cabecera', type: 'text' },
      { path: 'pages.pqrs.kindsTitle', label: 'Figuras: título', type: 'text' },
      titledList('pages.pqrs.kinds', 'Figuras de la sigla', 'Añadir figura'),
      { path: 'pages.pqrs.fileTitle', label: 'Radicación: título', type: 'text' },
      { path: 'pages.pqrs.fileBody', label: 'Radicación: texto', type: 'textarea' },
      { path: 'pages.pqrs.formCta', label: 'Radicación: botón', type: 'text' },
      { path: 'pages.pqrs.legalTitle', label: 'Legal: título', type: 'text' },
      textList('pages.pqrs.legalParagraphs', 'Legal: párrafos', 'Añadir párrafo'),
      { path: 'pages.pqrs.legalFootnote', label: 'Legal: nota final', type: 'text' },
      { path: 'pages.pqrs.legalLinkLabel', label: 'Legal: texto del enlace', type: 'text' },
      ...seoFields('pages.pqrs'),
    ],
  },
  {
    id: 'pag-privacidad',
    group: 'paginas',
    label: 'Política de privacidad',
    description: 'El articulado de la política se edita en el código, por su naturaleza legal.',
    fields: [
      ...headerFields('pages.privacy'),
      { path: 'pages.privacy.indexTitle', label: 'Título del índice', type: 'text' },
      { path: 'pages.privacy.legalName', label: 'Razón social', type: 'text' },
      { path: 'pages.privacy.nit', label: 'NIT', type: 'text' },
      { path: 'pages.privacy.domicile', label: 'Domicilio', type: 'text' },
      ...seoFields('pages.privacy'),
    ],
  },
  {
    id: 'pag-404',
    group: 'paginas',
    label: 'Página no encontrada',
    description: 'Lo que ve alguien que llega a una dirección que ya no existe.',
    fields: [
      { path: 'pages.notFound.code', label: 'Código', type: 'text' },
      { path: 'pages.notFound.title', label: 'Título', type: 'text' },
      { path: 'pages.notFound.body', label: 'Texto', type: 'textarea' },
      { path: 'pages.notFound.primaryCta', label: 'Botón principal', type: 'text' },
      { path: 'pages.notFound.secondaryCta', label: 'Botón secundario', type: 'text' },
      ...seoFields('pages.notFound'),
    ],
  },

  /* ------------------------------------------------------------- contenido */
  {
    id: 'imagenes',
    group: 'contenido',
    label: 'Imágenes',
    description:
      'Fotografías del sitio. Respete la proporción indicada en cada una: si no coincide, la imagen se recorta.',
    fields: [
      { path: 'media.team', label: 'Equipo', type: 'image', ratio: '4/3' },
      { path: 'media.field', label: 'Campo', type: 'image', ratio: '4/3' },
      { path: 'media.lab', label: 'Laboratorio', type: 'image', ratio: '4/3' },
      { path: 'media.filling', label: 'Envasado', type: 'image', ratio: '4/3' },
      { path: 'media.rooting', label: 'Enraizamiento', type: 'image', ratio: '4/3' },
      { path: 'media.vegetative', label: 'Desarrollo vegetativo', type: 'image', ratio: '4/3' },
      { path: 'media.ripening', label: 'Maduración', type: 'image', ratio: '4/3' },
      { path: 'media.contact', label: 'Contacto', type: 'image', ratio: '16/10' },
    ],
  },
]

/** Academia se edita con un formulario propio, no con el genérico. */
export const postsSection = {
  id: 'academia',
  group: 'contenido',
  label: 'Academia',
  description: 'Artículos del blog. Se publican en cuanto guarda.',
}

export const allSections = [...sections, postsSection]
