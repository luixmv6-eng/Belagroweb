import { routes } from './site'
import { media } from './media'

export const presentations = ['20L', '4L', '1L']

/**
 * TODO (Belagro): subir las fichas reales a /public/fichas/ con estos nombres,
 * o cambiar las rutas aquí. Los botones se deshabilitan solos si la ruta es null.
 */
const sheet = (slug) => ({
  tecnica: `/fichas/${slug}-ficha-tecnica.pdf`,
  seguridad: `/fichas/${slug}-ficha-seguridad.pdf`,
})

export const stages = [
  {
    id: 'establecimiento',
    to: routes.stageRooting,
    order: '01',
    title: 'Establecimiento inicial y enraizamiento',
    portfolioTitle: 'Establecimiento y activación inicial',
    portfolioIntro:
      'Soluciones orientadas a estimular la generación radicular, acelerar el arranque fisiológico y fortalecer la capacidad de absorción en las primeras etapas del cultivo.',
    kicker: 'FORMULACIÓN ESPECIAL',
    claims: ['Arranque Seguro', 'Respuesta Antiestrés', 'Activación Metabólica'],
    image: media.rooting,
    portfolioProducts: ['Formulación especial'],
    products: [
      {
        name: 'Radicast',
        slug: 'radicast',
        description:
          'Aplicación en etapas iniciales del cultivo para estimular formación radicular, mejorar absorción de nutrientes y asegurar un establecimiento uniforme.',
        components: ['Aminoácidos libres', 'Fitohormonas', 'Nitrógeno', 'Fósforo'],
        files: sheet('radicast'),
      },
      {
        name: 'Fórmulas especiales',
        slug: 'formulas-especiales',
        description:
          'Aplicación foliar durante el inicio del cultivo o en situaciones de estrés fisiológico, cuando se requiere recuperación activa y estabilización del desarrollo.',
        components: [
          'Formulado con NPK',
          'Aminoácidos libres',
          'Hormonas y vitaminas',
          'Micronutrientes',
        ],
        files: sheet('formulas-especiales'),
      },
      {
        name: 'Radicast Hormonal',
        slug: 'radicast-hormonal',
        description:
          'Activa el desarrollo radicular de tus plantas con nuestra fórmula con aminoácidos y fitohormonas. Mejora la absorción de nutrientes desde etapas tempranas y garantiza un crecimiento rápido, vigoroso y de alta productividad.',
        components: ['Fósforo', 'Nitrógeno', 'Zinc', 'Carbono orgánico'],
        files: sheet('radicast-hormonal'),
      },
    ],
  },
  {
    id: 'vegetativo',
    to: routes.stageVegetative,
    order: '02',
    title: 'Desarrollo vegetativo',
    portfolioTitle: 'Desarrollo Vegetativo',
    portfolioIntro:
      'Formulaciones diseñadas para sostener crecimiento activo, elongación celular y fortalecimiento estructural durante las etapas medias del cultivo.',
    kicker: 'NUTRICAST',
    claims: [
      'Fortalece el crecimiento vegetativo',
      'Mejora la resistencia del cultivo',
      'Optimiza el desarrollo estructural de la planta',
    ],
    image: media.vegetative,
    portfolioProducts: ['Nutricast', 'Nutricast RP'],
    products: [
      {
        name: 'Nutricast RP',
        slug: 'nutricast-rp',
        description:
          'Aplicación foliar en etapas medias y de desarrollo activo del cultivo, especialmente cuando se busca estimular elongación celular, macollamiento y expansión vegetativa. Ideal para cultivo de caña de azúcar.',
        components: [
          'Nitrógeno, fósforo y potasio',
          'Secundarios: Azufre y Magnesio',
          'Microelementos: Boro y Zinc',
        ],
        files: sheet('nutricast-rp'),
      },
      {
        name: 'Nutricast',
        slug: 'nutricast',
        description:
          'Aplicación durante etapas medias y de desarrollo, cuando se busca mantener crecimiento activo con mayor estabilidad estructural y fisiológica.',
        components: ['Silicio', 'Aminoácidos', 'Macro y microelementos (B, Zn, Mn)'],
        files: sheet('nutricast'),
      },
    ],
  },
  {
    id: 'maduracion',
    to: routes.stageRipening,
    order: '03',
    title: 'Maduración y calidad del fruto',
    portfolioTitle: 'Maduración',
    portfolioIntro:
      'Intervenciones enfocadas en movilización de azúcares, fijación de sólidos y optimización del rendimiento final.',
    kicker: 'FORMULACIÓN ESPECIAL',
    claims: [
      'Activación metabólica',
      'Movilización de carbohidratos',
      'Calidad y uniformidad del fruto',
    ],
    image: media.ripening,
    portfolioProducts: ['Maducast caña', 'Maducast'],
    products: [
      {
        name: 'Maducast',
        slug: 'maducast',
        description:
          'Aplicación en etapas finales del cultivo y durante la fase de fructificación, orientada a mejorar metabolismo, favorecer fotosíntesis activa y contribuir a mayor producción y calidad de fruto. Puede aplicarse vía foliar y/o edáfica.',
        components: [
          'Formulación a base de Fósforo y Potasio',
          'Complementada con Boro',
          'Carbono Orgánico Oxidable',
          'Aminoácidos libres',
        ],
        files: sheet('maducast'),
      },
      {
        name: 'Maducast caña',
        slug: 'maducast-cana',
        description:
          'Aplicación foliar durante etapas finales del cultivo, especialmente en fase de maduración, cuando se busca optimizar movilización de azúcares, favorecer acumulación de sacarosa y mejorar calidad de cosecha. Ideal para cultivo de caña de azúcar.',
        components: [
          'Formulación a base de Fósforo y Potasio',
          'Complementada con Boro',
          'Carbono Orgánico Oxidable',
          'Aminoácidos libres',
        ],
        files: sheet('maducast-cana'),
      },
    ],
  },
]

export const stageById = Object.fromEntries(stages.map((s) => [s.id, s]))
