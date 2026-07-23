import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Popup from './components/Popup'
import ScrollToTop from './components/ScrollToTop'
import RouteLoader from './components/RouteLoader'
import { isHeavyRoute, routes } from './data/site'
import Home from './pages/Home'

// La portada entra en el bundle inicial (es el LCP). El resto se carga por ruta.
const Company = lazy(() => import('./pages/Company'))
const FieldSupport = lazy(() => import('./pages/FieldSupport'))
const ProductDev = lazy(() => import('./pages/ProductDev'))
const Maquila = lazy(() => import('./pages/Maquila'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Stage = lazy(() => import('./pages/Stage'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const Pqrs = lazy(() => import('./pages/Pqrs'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// El panel no entra en el paquete del sitio público: solo lo descarga quien
// visita /admin, así que no penaliza la carga de nadie más.
const AdminApp = lazy(() => import('./admin/AdminApp'))

/** Esqueleto con la forma de una página interior, para no mostrar un spinner vacío. */
function PageSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="bg-surface-violet">
        <div className="shell pb-20 pt-16">
          <div className="h-3 w-28 rounded-full bg-line-strong/50" />
          <div className="mt-6 h-12 w-[min(28rem,90%)] rounded-lg bg-line-strong/50" />
          <div className="mt-4 h-12 w-[min(20rem,70%)] rounded-lg bg-line-strong/40" />
          <div className="mt-8 h-11 w-48 rounded-full bg-line-strong/40" />
        </div>
      </div>
      <div className="shell grid gap-6 py-20 md:grid-cols-2">
        <div className="h-56 rounded-card bg-surface" />
        <div className="h-56 rounded-card bg-surface" />
      </div>
    </div>
  )
}

/**
 * Que se muestra mientras carga la ruta destino. Las paginas con mucho contenido
 * reciben la animacion del logo; las ligeras, solo el esqueleto, que no llama la
 * atencion y evita el salto de layout.
 */
function RouteFallback() {
  const { pathname } = useLocation()
  return isHeavyRoute(pathname) ? <RouteLoader /> : <PageSkeleton />
}

function PublicSite() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <ScrollToTop />
      <Nav />

      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.company} element={<Company />} />
            <Route path={routes.fieldSupport} element={<FieldSupport />} />
            <Route path={routes.productDev} element={<ProductDev />} />
            <Route path={routes.maquila} element={<Maquila />} />
            <Route path={routes.portfolio} element={<Portfolio />} />
            <Route path={routes.stageRooting} element={<Stage id="establecimiento" />} />
            <Route path={routes.stageVegetative} element={<Stage id="vegetativo" />} />
            <Route path={routes.stageRipening} element={<Stage id="maduracion" />} />
            <Route path={routes.blog} element={<Blog />} />
            <Route path={`${routes.blog}/:slug`} element={<BlogPost />} />
            <Route path={routes.contact} element={<Contact />} />
            <Route path={routes.pqrs} element={<Pqrs />} />
            <Route path={routes.privacy} element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFab />
      <Popup />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* El panel va sin barra ni pie: es una herramienta, no una página del sitio. */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-[100dvh] bg-surface" />}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="*" element={<PublicSite />} />
    </Routes>
  )
}
