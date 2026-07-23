import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

const STORAGE_KEY = 'belagro-theme'

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  document.documentElement.dataset.theme = stored || systemTheme()
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined' ? 'light' : document.documentElement.dataset.theme || 'light',
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (localStorage.getItem(STORAGE_KEY)) return
      const next = e.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-200 hover:border-lime hover:text-fg ${className}`}
    >
      {theme === 'dark' ? <Sun size={20} weight="regular" /> : <Moon size={20} weight="regular" />}
    </button>
  )
}
