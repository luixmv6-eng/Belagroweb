import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo, X } from '@phosphor-icons/react'
import { advisors, whatsappLink } from '../data/site'
import { pages } from '../data/pages'

/**
 * Boton flotante de WhatsApp. No es un chat: despliega los asesores disponibles
 * y cada uno abre wa.me en una pestana nueva con el mensaje prellenado.
 *
 * El panel se abre solo al pulsar, nunca por temporizador: un panel que salta
 * solo mientras alguien lee tapa contenido y se percibe como publicidad.
 */
export default function WhatsAppFab() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const reduce = useReducedMotion()

  // Cerrar con Escape y al pulsar fuera, que es lo que espera cualquiera de un
  // desplegable flotante.
  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="relative w-[min(20rem,calc(100vw-2.5rem))] rounded-card border border-line bg-card p-5 shadow-[var(--shadow-card-hover)]"
            role="dialog"
            aria-label="Contacto por WhatsApp"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
              aria-label="Cerrar"
              className="absolute right-2 top-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              <X size={16} weight="bold" />
            </button>

            <p className="pr-6 font-display text-base font-semibold leading-snug text-fg">
              {pages.whatsapp.invite}
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {advisors.map((advisor) => (
                <li key={advisor.phoneRaw}>
                  <a
                    href={whatsappLink(advisor.phoneRaw)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex cursor-pointer items-center gap-3 rounded-[12px] border border-line px-3 py-2.5 transition-colors duration-200 hover:border-lime hover:bg-lime-tint"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-tint text-lime-text transition-colors group-hover:bg-lime group-hover:text-on-lime">
                      <WhatsappLogo size={18} weight="fill" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.95rem] font-semibold text-fg">
                        {advisor.name}
                      </span>
                      <span className="block text-[0.82rem] text-fg-muted">
                        {advisor.phone}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Contactar a un asesor por WhatsApp"
        className="inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-lime text-on-lime shadow-[var(--shadow-action-fab)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.96]"
      >
        <WhatsappLogo size={28} weight="fill" />
      </button>
    </div>
  )
}
