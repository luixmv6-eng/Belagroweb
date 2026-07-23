import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { CaretDown, List, X } from '@phosphor-icons/react'
import { nav, routes } from '../data/site'
import { pages } from '../data/pages'
import Logo from './Logo'
import Button from './Button'
import ThemeToggle from './ThemeToggle'

function Dropdown({ item }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const reduce = useReducedMotion()

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <li
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className="inline-flex cursor-pointer items-center gap-1 py-2 text-[0.9rem] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
      >
        {item.label}
        <CaretDown
          size={14}
          weight="bold"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.99, transition: { duration: 0.14 } }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <ul className="overflow-hidden rounded-card border border-line bg-card p-2 shadow-[var(--shadow-card-hover)]">
              {item.children.map((child) => (
                <li key={child.to}>
                  <Link
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-[12px] px-3 py-2.5 transition-colors duration-200 hover:bg-surface-violet"
                  >
                    <span className="block text-[0.95rem] font-semibold text-fg">{child.label}</span>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug text-fg-muted">
                      {child.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

const linkClass = ({ isActive }) =>
  `py-2 text-[0.9rem] font-medium transition-colors duration-200 ${
    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
  }`

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-2 focus:font-semibold focus:text-on-lime"
      >
        {pages.header.skipLabel}
      </a>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-b border-line bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent bg-bg'
        }`}
      >
        <div className="shell flex h-14 items-center justify-between gap-6 md:h-[60px]">
          <Link to={routes.home} aria-label="Belagro, ir al inicio" className="shrink-0">
            <Logo size="sm" />
          </Link>

          <nav aria-label="Navegación principal" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} />
                ) : (
                  <li key={item.to}>
                    <NavLink to={item.to} className={linkClass} end={item.to === routes.home}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button to={routes.contact} size="sm" className="hidden sm:inline-flex">
              {pages.header.ctaLabel}
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line text-fg xl:hidden"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              tabIndex={-1}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 cursor-default bg-[var(--scrim)] backdrop-blur-[2px]"
            />
            <motion.nav
              aria-label="Navegación principal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[min(24rem,88vw)] flex-col overflow-y-auto bg-bg p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-fg"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end={item.to === routes.home}
                      className={({ isActive }) =>
                        `block rounded-[12px] px-3 py-3 font-display text-lg font-semibold transition-colors ${
                          isActive ? 'text-lime-text' : 'text-fg hover:bg-surface'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <ul className="mb-2 ml-3 border-l border-line pl-4">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              className="block py-2.5 text-[0.95rem] text-fg-muted transition-colors hover:text-fg"
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3 pt-8">
                <Button to={routes.contact} className="flex-1">
                  {pages.header.ctaLabel}
                </Button>
                <ThemeToggle />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
