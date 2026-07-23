import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al cambiar de ruta, vuelve arriba y mueve el foco al contenido principal
 * para que un lector de pantalla anuncie la página nueva.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const main = document.getElementById('contenido')
    if (main) main.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
