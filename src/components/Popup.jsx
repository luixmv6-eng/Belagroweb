import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, X } from '@phosphor-icons/react'
import { pages } from '../data/pages'

const STORAGE_KEY = 'belagro-popup-visto'

/**
 * Aviso emergente al entrar en la web. Todo se configura desde el panel:
 * si aparece, qué dice, a dónde lleva el botón y con qué frecuencia se muestra.
 *
 * Reglas de frecuencia:
 *   once    una vez y no vuelve a salir (localStorage)
 *   session una vez por visita (sessionStorage)
 *   always  cada vez que se carga la página
 */
function alreadySeen(frequency) {
  try {
    if (frequency === 'always') return false
    if (frequency === 'session') return sessionStorage.getItem(STORAGE_KEY) === '1'
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // Navegación privada con almacenamiento bloqueado: mejor no insistir.
    return true
  }
}

function remember(frequency) {
  try {
    if (frequency === 'session') sessionStorage.setItem(STORAGE_KEY, '1')
    else if (frequency !== 'always') localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* sin almacenamiento no se puede recordar; no es motivo para romper nada */
  }
}

export default function Popup() {
  const config = pages.popup ?? {}
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFocus = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!config.enabled || alreadySeen(config.frequency)) return undefined
    const delay = Math.max(0, Number(config.delaySeconds) || 0) * 1000
    const timer = setTimeout(() => setOpen(true), delay)
    return () => clearTimeout(timer)
  }, [config.enabled, config.frequency, config.delaySeconds])

  const close = () => {
    remember(config.frequency)
    setOpen(false)
    restoreFocus.current?.focus?.()
  }

  // Al abrir: bloquear el fondo, llevar el foco dentro y atraparlo ahí. Un diálogo
  // del que se puede salir con el tabulador deja al teclado navegando a ciegas.
  useEffect(() => {
    if (!open) return undefined

    restoreFocus.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!config.enabled) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Cerrar aviso"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-[var(--scrim)] backdrop-blur-[2px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-titulo"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative w-[min(30rem,100%)] rounded-card border border-line bg-card p-7 shadow-[var(--shadow-card-hover)] md:p-9"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Cerrar aviso"
              className="absolute right-3 top-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              <X size={17} weight="bold" />
            </button>

            <h2
              id="popup-titulo"
              className="max-w-[22ch] pr-8 font-display text-2xl font-semibold leading-snug text-fg"
            >
              {config.title}
            </h2>

            {config.body && (
              <p className="mt-3 leading-relaxed text-fg-muted">{config.body}</p>
            )}

            {config.buttonLabel && config.buttonTarget && (
              <Link
                to={config.buttonTarget}
                onClick={close}
                className="group mt-7 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-[0.95rem] font-semibold text-on-lime shadow-[var(--shadow-action)] transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
              >
                {config.buttonLabel}
                <ArrowRight
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
