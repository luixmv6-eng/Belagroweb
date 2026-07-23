import { useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

const STORAGE_KEY = 'belagro-theme'

/**
 * La web arranca SIEMPRE en modo claro.
 *
 * No se sigue `prefers-color-scheme`: la identidad de Belagro se construyó sobre
 * fondo claro, y quien entra por primera vez debe verla así. El modo oscuro está
 * disponible, pero es una elección explícita del visitante.
 *
 * La única excepción es haber elegido antes: esa preferencia se respeta y manda
 * sobre el arranque en claro.
 */
export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  document.documentElement.dataset.theme = stored === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined' ? 'light' : document.documentElement.dataset.theme || 'light',
  )

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
