import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/outfit'
import '@fontsource-variable/source-sans-3'
import './styles/index.css'
import App from './App'
import { initTheme } from './components/ThemeToggle'
import { hydrateContent } from './content/store'

initTheme()

/**
 * El contenido publicado desde el panel se funde sobre los datos del código
 * ANTES de montar React, para que la primera pintura ya salga con los textos e
 * imágenes correctos y no haya un parpadeo de contenido viejo.
 *
 * `hydrateContent` nunca lanza: si la API no responde (sitio servido como
 * estático, backend caído, desarrollo sin servidor) se monta igual con el
 * contenido del código. Se usa `.then` y no `await` de nivel superior porque
 * este último no está disponible en el objetivo de compilación.
 */
hydrateContent().finally(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
