import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  EnvelopeSimple,
  LinkedinLogo,
  MapPin,
  Phone,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { defaultWhatsappUrl, location, nav, routes, site } from '../data/site'
import { pages } from '../data/pages'
import Logo from './Logo'
import Wave from './Wave'

const linkClass =
  'text-on-violet-muted transition-colors duration-200 hover:text-on-violet'

/** Iconos sociales: mismo tratamiento para LinkedIn y WhatsApp, que son pares. */
function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-onviolet-line-strong text-on-violet transition-colors duration-200 hover:border-lime hover:bg-lime hover:text-on-lime"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg">
      <Wave color="fill-surface-violet-deep" />

      <div className="bg-surface-violet-deep text-on-violet">
        {/* Cuatro columnas de peso decreciente: quien somos, a donde ir, que
            tramitar, donde estamos. Antes eran tres muy anchas con mucho aire
            muerto entre ellas. */}
        <div className="shell grid gap-x-8 gap-y-10 py-12 md:py-14 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <Logo onViolet size="md" />
            <p className="mt-4 max-w-[34ch] text-[0.9rem] leading-relaxed text-on-violet-muted">
              {pages.footer.intro}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5 text-[0.9rem]">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} weight="regular" className="mt-0.5 shrink-0 text-lime" />
                <span className="text-on-violet-muted">
                  {site.address}
                  <span className="block">{site.region}</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} weight="regular" className="shrink-0 text-lime" />
                <a href={`tel:${site.phoneRaw}`} className={linkClass}>
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <EnvelopeSimple size={18} weight="regular" className="shrink-0 text-lime" />
                <a href={`mailto:${site.emailComercial}`} className={linkClass}>
                  {site.emailComercial}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              <Social href={site.linkedin} label="Belagro en LinkedIn">
                <LinkedinLogo size={19} weight="fill" />
              </Social>
              <Social href={defaultWhatsappUrl()} label="Escribir a Belagro por WhatsApp">
                <WhatsappLogo size={19} weight="fill" />
              </Social>
            </div>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-on-violet"
            >
              {pages.footer.navHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-atencion">
            <h2
              id="footer-atencion"
              className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-on-violet"
            >
              {pages.footer.careHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
              <li>
                <Link to={routes.pqrs} className={linkClass}>
                  PQRS
                </Link>
              </li>
              <li>
                <Link to={routes.privacy} className={linkClass}>
                  Política de privacidad
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.emailPqrs}`} className={`${linkClass} break-all`}>
                  {site.emailPqrs}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-on-violet">
              {pages.footer.locationHeading}
            </h2>
            {/* Mapa contenido: relacion de aspecto fija para que no crezca, y
                carga diferida para que no penalice el arranque de la pagina. */}
            <div className="mt-4 overflow-hidden rounded-[12px] border border-onviolet-line">
              <iframe
                src={location.embedUrl}
                title="Ubicación de la planta de Belagro"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[16/10] w-full border-0"
              />
            </div>
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-lime transition-colors hover:text-on-violet"
            >
              {pages.footer.directionsCta}
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>

        {/* Barra inferior: solo autoria. Los enlaces legales viven en "Atención",
            repetirlos aqui es lo que hacia que la zona inferior se viera desordenada. */}
        <div className="border-t border-onviolet-line">
          <div className="shell flex flex-col gap-1.5 py-4 text-[0.8rem] text-on-violet-muted md:flex-row md:items-center md:justify-between">
            <p>
              {year} {site.name}. {pages.footer.rights}
            </p>
            <p>{pages.footer.backing}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
