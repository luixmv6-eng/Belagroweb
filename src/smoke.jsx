/**
 * Smoke test: renderiza cada página en el servidor para detectar errores de runtime
 * que un `vite build` no puede ver (props indefinidas, iconos inexistentes, etc.).
 * Uso: npm run smoke
 */
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { routes } from './data/site'
import { posts } from './data/posts'

import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import Company from './pages/Company'
import FieldSupport from './pages/FieldSupport'
import ProductDev from './pages/ProductDev'
import Maquila from './pages/Maquila'
import Portfolio from './pages/Portfolio'
import Stage from './pages/Stage'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Pqrs from './pages/Pqrs'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

const chrome = (
  <>
    <Nav />
    <Footer />
    <WhatsAppFab />
  </>
)

const cases = [
  ['/ (chrome: nav, footer, whatsapp)', routes.home, chrome],
  [routes.home, routes.home, <Home />],
  [routes.company, routes.company, <Company />],
  [routes.fieldSupport, routes.fieldSupport, <FieldSupport />],
  [routes.productDev, routes.productDev, <ProductDev />],
  [routes.maquila, routes.maquila, <Maquila />],
  [routes.portfolio, routes.portfolio, <Portfolio />],
  [routes.stageRooting, routes.stageRooting, <Stage id="establecimiento" />],
  [routes.stageVegetative, routes.stageVegetative, <Stage id="vegetativo" />],
  [routes.stageRipening, routes.stageRipening, <Stage id="maduracion" />],
  [routes.blog, routes.blog, <Blog />],
  ...posts.map((p) => [
    `${routes.blog}/${p.slug}`,
    `${routes.blog}/${p.slug}`,
    // BlogPost lee el slug con useParams, así que necesita un Route real.
    <Routes key={p.slug}>
      <Route path={`${routes.blog}/:slug`} element={<BlogPost />} />
    </Routes>,
  ]),
  [routes.contact, routes.contact, <Contact />],
  [routes.pqrs, routes.pqrs, <Pqrs />],
  [routes.privacy, routes.privacy, <Privacy />],
  ['404', '/ruta-inexistente', <NotFound />],
]

let failed = 0

for (const [label, path, element] of cases) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[path]}>
        <div>{element}</div>
      </MemoryRouter>,
    )
    const thin = html.length < 1500
    console.log(`${thin ? 'THIN' : 'ok  '} ${label} (${html.length} bytes)`)
    if (thin) failed++
  } catch (error) {
    failed++
    console.log(`FAIL ${label}\n     ${error.message}`)
  }
}

console.log(
  failed ? `\n${failed} caso(s) con problemas` : `\n${cases.length} páginas renderizan sin errores`,
)
