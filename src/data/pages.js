/**
 * Textos de página editables desde el panel de administración.
 *
 * Todo lo que aquí figure aparece en el panel y puede cambiarse sin tocar
 * código. Al añadir un texto nuevo a una página, tráigalo a este archivo y
 * declárelo en `src/content/schema.js`: con eso queda editable.
 */
export const pages = {
  home: {
    seoTitle: 'Fertilizantes líquidos',
    seoDescription:
      'Belagro desarrolla fertilizantes líquidos bajo criterios técnicos definidos y procesos estandarizados, con el respaldo industrial de Castilla Agrícola. Valle del Cauca, Colombia.',

    hero: {
      eyebrow: 'Belagro',
      titleTop: 'Fertilizantes',
      titleBottom: 'líquidos',
      lead: 'Porque cada etapa del cultivo exige una decisión técnica precisa.',
      primaryCta: 'Ver soluciones por etapa del cultivo',
      secondaryCta: 'Servicio técnico',
    },

    stat: {
      eyebrow: 'Desde 2019 hasta 2026',
      value: 17,
      suffix: '+',
      caption: 'Millones de litros vendidos',
      srLabel: 'Más de 17 millones de litros vendidos',
    },

    backing: {
      label: 'Con el respaldo de:',
    },

    about: {
      eyebrow: 'Sobre Belagro',
      title: 'Fertilizantes Líquidos',
      body:
        'Belagro nace con el propósito de desarrollar soluciones agrícolas bajo criterios técnicos definidos y procesos estandarizados. Conoce cómo hemos construido nuestra capacidad productiva y respaldo industrial.',
      cta: 'Nuestra trayectoria',
    },

    stages: {
      eyebrow: 'Fertilizamos con inteligencia',
      title: 'Una solución por cada etapa del cultivo',
      cardCta: 'Ver soluciones',
    },

    clients: {
      title: 'Nuestros clientes',
      lead:
        'Empresas líderes que confían en nuestras soluciones para potenciar el rendimiento del campo colombiano',
    },

    academy: {
      title: 'Academia Belagro',
      lead: 'Formación y criterio técnico para el campo.',
      cta: 'Empezar a aprender',
    },

    newsletter: {
      title: 'Inscríbete',
      lead:
        'Ingresa tu dirección de correo y recibe las últimas noticias, notificaciones de productos nuevos e información general.',
      highlight: 'Recibe consejos de nutrición para tus cultivos',
    },
  },

  company: {
    seoTitle: 'Nuestra compañía',
    seoDescription:
      'Belagro nace en 2019 dentro de la planta de fertilizantes de Castilla Agrícola. Equipo multidisciplinario, dirección estratégica y compromiso con los ODS 2 y 12.',
    kicker: 'Nuestra compañía',
    title: 'Capacidad productiva y respaldo industrial',
    lead: 'Belagro integra formulación, control industrial y acompañamiento en campo dentro de una misma estructura técnica.',
    cta: 'Solicitar asesoría',

    milestone: {
      year: '2019',
      title: 'Nace la planta de fertilizantes de Castilla Agrícola',
      value: 881,
      valueLabel: 'mil L vendidos',
      srLabel: 'Más de 881 mil litros vendidos',
    },

    team: {
      eyebrow: 'Equipo',
      title: 'Agrónomos, químicos y expertos en agroindustria',
      body: 'Belagro integra un equipo multidisciplinario de agrónomos, químicos y expertos en agroindustria, responsables del diseño, formulación y fabricación de fertilizantes bajo los más estrictos estándares técnicos. Nuestra estructura garantiza un control productivo de excelencia, que se complementa con un acompañamiento técnico especializado directamente en el campo.',
    },

    direction: {
      title: 'Dirección estratégica',
      items: [
        {
          title: 'Misión',
          text: 'Desarrollar, producir y suministrar fertilizantes líquidos con enfoque técnico e industrial, orientados a una nutrición vegetal eficiente y precisa, respaldados por la infraestructura y la experiencia de Castilla Agrícola.',
        },
        {
          title: 'Visión',
          text: 'Ser para el año 2030 el principal aliado estratégico de los productores agrícolas de la región, a través de la generación de fertilizantes liquidos, diseñados para potencializar el cultivo en cada una de sus etapas.',
        },
      ],
    },

    projection: {
      title: 'Proyección y compromiso',
      body: 'Belagro continúa fortaleciendo su modelo técnico y productivo, orientado a acompañar al sector agrícola con soluciones consistentes, eficientes y diseñadas para responder a los retos actuales del campo.',
      highlight:
        'Alineamos nuestra estrategia técnica con el ODS 2 y el ODS 12, impulsando una producción agrícola que maximiza rendimientos sin comprometer el suelo. Nuestra tecnología en insumos es el motor para una seguridad alimentaria basada en la responsabilidad y el rigor científico.',
    },
  },

  fieldSupport: {
    seoTitle: 'Acompañamiento en campo',
    seoDescription:
      'Estrategias de nutrición basadas en precisión agronómica: optimización de la biodisponibilidad y programación nutricional por etapa fenológica.',
    kicker: 'Servicios',
    title: 'Acompañamiento en campo',
    lead: 'Estrategias de nutrición basadas en precisión agronómica',
    cta: 'Solicitar asesoría',

    approachTitle: 'La nutrición vegetal trasciende la aplicación convencional de insumos.',
    approachBody:
      'En Belagro, la nutrición vegetal trasciende la aplicación convencional de insumos, es una estrategia de precisión. Nuestra división técnica, integrada por especialistas en ingeniería agronómica, convierte el rigor científico en protocolos operativos diseñados para elevar la rentabilidad de su unidad productiva.',

    /* El icono de cada eje se mantiene en el código; aquí solo el texto. */
    pillars: [
      {
        title: 'Optimización de la Biodisponibilidad',
        text: 'Identificamos las principales restricciones físico-químicas del suelo que condicionan la absorción de nutrientes.',
      },
      {
        title: 'Programación Nutricional por etapa fenológica',
        text: 'Diseñamos planes basados en la curva de extracción real y las etapas críticas de desarrollo del cultivo.',
      },
    ],

    closingTitle: 'Llevamos el protocolo hasta su lote.',
    closingCta: 'Solicitar asesoría',
  },

  productDev: {
    seoTitle: 'Desarrollo de productos',
    seoDescription:
      'Diseño y formulación de fertilizantes personalizados, escalamiento de laboratorio a producción industrial, ajuste de fórmulas y reformulación de productos existentes.',
    kicker: 'Servicios',
    title: 'Desarrollo de productos',
    lead: 'Transformamos la ciencia en nutrición avanzada para maximizar el potencial de cada cultivo',
    cta: 'Solicitar desarrollo de productos',

    servicesTitle: 'Servicios',
    services: [
      {
        text: 'Diseño y formulación de fertilizantes personalizados (NPK, mezclas especiales, micronutrientes).',
      },
      { text: 'Escalamiento de formulaciones de laboratorio a producción industrial.' },
      { text: 'Desarrollo de fertilizantes líquidos' },
      { text: 'Ajuste de fórmulas según cultivo, suelo o necesidad.' },
      { text: 'Reformulación de productos existentes.' },
    ],

    closingTitle: 'Cuéntenos qué necesita el cultivo y lo formulamos.',
    closingCta: 'Solicitar desarrollo de productos',
  },

  maquila: {
    seoTitle: 'Maquila industrial',
    seoDescription:
      'Servicios de maquila de fertilizantes líquidos: producción, envasado en botellas o garrafas, sellado y etiquetado bajo estándares de calidad controlados.',
    kicker: 'Servicios',
    title: 'Maquila industrial',
    lead: 'I & D, formulación y producción bajo estándares de calidad y técnicos controlados',
    cta: 'Solicitar maquila',

    capacity: {
      /* PENDIENTE (Belagro): el sitio actual muestra 0. Ponga aquí la capacidad
         instalada real. No se inventó una cifra porque sería falsa. */
      value: 0,
      title: 'Millones de capacidad instalada (litros)/año',
      body: 'En Belagro ofrecemos servicios de maquila para empresas que buscan escalar su producción con los más altos estándares de calidad y cumplimiento',
    },

    servicesTitle: 'Servicios',
    services: [
      { text: 'Producción de fertilizantes líquidos.' },
      { text: 'Envasado de fertilizantes líquidos en botellas o garrafas.' },
      { text: 'Sellado y etiquetado' },
      { text: 'Desarrollo de fertilizantes líquidos' },
      { text: 'Ajuste de fórmulas según cultivo, suelo o necesidad.' },
      { text: 'Reformulación de productos existentes.' },
    ],

    contactTitle: 'Contacto',
    submitLabel: 'Enviar',
  },

  portfolio: {
    seoTitle: 'Portafolio técnico',
    seoDescription:
      'Formulaciones diseñadas para integrarse estratégicamente a la etapa fisiológica y al objetivo productivo: establecimiento, desarrollo vegetativo y maduración.',
    kicker: 'Portafolio técnico',
    title: 'Soluciones técnicas para cada momento del cultivo',
    lead: 'Formulaciones diseñadas para integrarse estratégicamente a la etapa fisiológica y al objetivo productivo.',

    availableIn: 'Disponible en:',
    specsCta: 'Ver especificaciones',

    method: {
      title: 'El Método Belagro',
      body: 'Desarrollamos cada solución bajo un esquema que integra formulación especializada, control industrial y nuestra tecnología BYO-SYNC. Esta sinergia biotecnológica transforma una formulación líquida en una herramienta de precisión, logrando una sincronización perfecta entre el criterio agronómico y el desempeño productivo del cultivo.',
      cta: 'Hable con nuestro equipo',
    },
  },

  stage: {
    primaryCta: 'Hable con nuestro equipo',
    secondaryCta: 'Volver al portafolio',
    productsTitle: 'Productos de la etapa',
    availableIn: 'Disponible en:',
    othersTitle: 'Otras etapas del cultivo',
  },

  contact: {
    seoTitle: 'Contacto',
    seoDescription:
      'Asesoría técnica especializada de Belagro. Km 3,5 Vía Pradera - Florida, Hacienda Potrerillo.',
    kicker: 'Contacto',
    title: 'Aquí comienza su próximo avance productivo',
    lead: 'Transformamos los desafíos del sector en oportunidades de crecimiento. A través de nuestra asesoría técnica especializada, acompañamos a los productores en la implementación de estrategias eficientes que aseguran el éxito en mercados cada vez más exigentes.',

    labelAddress: 'Dirección',
    labelPhone: 'Teléfono',
    labelEmail: 'Email',
    labelSocial: 'Redes sociales',
    socialName: 'Linkedin',

    pqrs: {
      title: '¿Una petición, queja, reclamo o sugerencia?',
      body: 'Gestionamos cada caso bajo protocolos de atención con respuesta en un máximo de 48 horas hábiles.',
      cta: 'Radicar solicitud',
    },
  },

  blog: {
    seoTitle: 'Academia Belagro',
    seoDescription:
      'Formación y criterio técnico para el campo: fisiología vegetal, nutrición, suelos y manejo del estrés en cultivos del Valle del Cauca.',
    kicker: 'Academia',
    title: 'Academia Belagro',
    lead: 'Formación y criterio técnico para el campo.',
    filterLabel: 'Todos los artículos',
  },

  pqrs: {
    seoTitle: 'PQRS',
    seoDescription:
      'Radique su petición, queja, reclamo o sugerencia ante Belagro y conozca el tratamiento legal que damos a cada solicitud.',
    kicker: 'Atención',
    title: 'PQRS',
    lead: 'Peticiones, quejas, reclamos y sugerencias. Aquí encontrará qué cubre cada figura, cómo tratamos sus datos y por dónde radicar su solicitud',
    headerCta: 'Radicar solicitud',

    kindsTitle: 'Qué puede radicar',
    kinds: [
      {
        title: 'Petición',
        text: 'Solicitud de información, documentación o una actuación concreta por parte de Belagro.',
      },
      {
        title: 'Queja',
        text: 'Manifestación de inconformidad por la conducta o la atención de una persona de la organización.',
      },
      {
        title: 'Reclamo',
        text: 'Exigencia relacionada con un producto o un servicio que no cumplió lo ofrecido.',
      },
      {
        title: 'Sugerencia',
        text: 'Propuesta de mejora sobre nuestros productos, procesos o canales de atención.',
      },
    ],

    fileTitle: 'Cómo radicar su solicitud',
    fileBody:
      'El formulario recoge los datos mínimos para identificarle, entender el caso y responderle. Recibirá acuse en el correo que registre.',
    formCta: 'Abrir formulario',

    legalTitle: 'Información legal',
    /* Revisado por Belagro antes de publicar. Cada párrafo es un elemento. */
    legalParagraphs: [
      {
        text: 'Los datos personales que suministre se recogen y tratan conforme al Régimen General de Protección de Datos Personales (Ley 1581 de 2012 y sus decretos reglamentarios) y a nuestra Política de Protección de Datos Personales.',
      },
      {
        text: 'Usted puede conocer, actualizar y rectificar sus datos, y solicitar prueba de la autorización otorgada, escribiendo al correo de PQRS.',
      },
      {
        text: 'Las solicitudes relacionadas con la calidad o la idoneidad de un producto se atienden en el marco del Estatuto del Consumidor (Ley 1480 de 2011).',
      },
      {
        text: 'Belagro responde cada radicación dentro de los términos legales aplicables a cada tipo de solicitud, y notifica la respuesta por el canal que usted indique.',
      },
    ],
    legalFootnote: 'Consulte el detalle completo en la',
    legalLinkLabel: 'Política de privacidad',
  },

  privacy: {
    seoTitle: 'Política de privacidad',
    seoDescription:
      'Política de tratamiento de datos personales de Belagro en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013.',
    kicker: 'Legal',
    title: 'Política de privacidad',
    lead: 'En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, La empresa BELAGRO, establece la presente política para garantizar el derecho constitucional de los ciudadanos a conocer, actualizar y rectificar la información que se haya recogido sobre ellos en nuestras bases de datos.',
    indexTitle: 'Contenido',
    nit: '8090300440',
    legalName: 'Castilla Agrícola',
    domicile: '[Dirección física en Colombia]',
  },

  notFound: {
    seoTitle: 'Página no encontrada',
    seoDescription: 'La página que busca no existe o cambió de dirección.',
    code: '404',
    title: 'Esta página no existe',
    body: 'Es posible que el enlace haya cambiado. Puede volver al inicio o revisar el portafolio técnico por etapa del cultivo.',
    primaryCta: 'Volver al inicio',
    secondaryCta: 'Portafolio técnico',
  },

  footer: {
    intro:
      'Fertilizantes líquidos con enfoque técnico e industrial, respaldados por Castilla Agrícola.',
    navHeading: 'Navegación',
    careHeading: 'Atención',
    locationHeading: 'Ubicación',
    directionsCta: 'Cómo llegar',
    rights: 'Todos los derechos reservados.',
    backing: 'Con el respaldo de Castilla Agrícola.',
  },

  header: {
    ctaLabel: 'Solicitar asesoría',
    skipLabel: 'Saltar al contenido',
  },

  whatsapp: {
    invite: 'Contáctate con un asesor para que te brinden más información.',
  },

  /**
   * Aviso emergente al entrar. Llega desactivado a propósito: un pop-up que
   * aparece sin que nadie lo haya decidido es intrusivo.
   */
  popup: {
    enabled: false,
    title: 'Novedad de temporada',
    body: 'Conozca las formulaciones disponibles para la etapa en la que está su cultivo.',
    buttonLabel: 'Ver portafolio',
    buttonTarget: '/portafolio-técnico',
    /* once = una vez y no vuelve · session = una vez por visita · always = siempre */
    frequency: 'once',
    /* Segundos antes de que aparezca. Deja leer la página primero. */
    delaySeconds: 3,
  },
}
