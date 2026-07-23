import { routes, site } from '../data/site'
import { pages } from '../data/pages'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const p = pages.privacy

const sections = [
  {
    id: 'responsable',
    title: '1. Responsable del Tratamiento',
    type: 'definitions',
    items: [
      { term: 'Razón Social', value: p.legalName },
      { term: 'NIT', value: p.nit },
      { term: 'Domicilio', value: p.domicile },
      { term: 'Correo', value: site.emailComercial },
      { term: 'Teléfono', value: site.phone },
    ],
  },
  {
    id: 'marco-legal',
    title: '2. Marco Legal',
    type: 'list',
    items: [
      'Artículo 15 Constitución Política (Habeas Data)',
      'Ley 1581 de 2012',
      'Decreto 1377 de 2013',
    ],
  },
  {
    id: 'finalidades',
    title: '3. Finalidades del Tratamiento',
    type: 'list',
    items: [
      'Ejecutar la relación contractual derivada de la venta de insumos, maquinaria y servicios agrícolas.',
      'Enviar información sobre estados de cuenta, facturación y cobranza.',
      'Adelantar actividades de mercadeo, promociones y eventos, previa autorización del titular.',
      'Prestar soporte técnico y asesoría sobre los productos.',
    ],
  },
  {
    id: 'derechos',
    title: '4. Derechos de los Titulares',
    type: 'list',
    items: ['Acceso', 'Actualización y Rectificación', 'Prueba de Autorización', 'Revocatoria'],
  },
  {
    id: 'procedimiento',
    title: '5. Procedimiento para el Ejercicio de Derechos',
    type: 'list',
    items: [
      `Las consultas y reclamos se radican por correo a ${site.emailComercial}.`,
      'Consultas atendidas en un máximo de 10 días hábiles.',
      'Reclamos atendidos en un máximo de 15 días hábiles.',
    ],
  },
  {
    id: 'datos-sensibles',
    title: '6. Datos Sensibles y de Menores',
    type: 'text',
    text: 'Belagro no recolecta datos sensibles ni de menores, salvo necesidad estricta y con autorización de sus representantes legales, priorizando siempre el interés superior del menor.',
  },
  {
    id: 'seguridad',
    title: '7. Seguridad de la Información',
    type: 'text',
    text: 'Belagro se compromete a adoptar las medidas técnicas y administrativas necesarias para evitar la adulteración, pérdida o acceso no autorizado a la información de los titulares.',
  },
]

export default function Privacy() {
  return (
    <>
      <Seo
        title={p.seoTitle}
        description={p.seoDescription}
        path={routes.privacy}
      />

      <PageHeader
        kicker={p.kicker}
        title={p.title}
        lead={p.lead}
      />

      <section aria-label="Contenido de la política" className="section bg-bg pt-4 md:pt-8">
        <div className="shell grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Índice de la política" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-violet">
              {p.indexTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 border-l border-line pl-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[0.92rem] leading-snug text-fg-muted transition-colors hover:text-lime-text"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-[70ch]">
            {sections.map((section, i) => (
              <Reveal
                key={section.id}
                delay={i * 0.04}
                className={`scroll-mt-28 ${i > 0 ? 'mt-12 border-t border-line pt-12' : ''}`}
                id={section.id}
              >
                <h2 className="text-2xl font-semibold leading-snug text-fg md:text-3xl">
                  {section.title}
                </h2>

                {section.type === 'text' && (
                  <p className="mt-5 text-lg leading-relaxed text-fg-muted">{section.text}</p>
                )}

                {section.type === 'list' && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-lg leading-relaxed text-fg-muted">
                        <span
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === 'definitions' && (
                  <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-[10rem_1fr]">
                    {section.items.map((item) => (
                      <div key={item.term} className="contents">
                        <dt className="font-semibold text-fg">{item.term}</dt>
                        <dd className="text-fg-muted">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </Reveal>
            ))}

            <Reveal className="mt-12 rounded-card border-l-2 border-lime bg-surface p-6 md:p-8">
              <p className="text-lg font-medium text-fg">
                La presente política rige a partir del 30 de Marzo de 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
