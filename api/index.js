/**
 * Punto de entrada en Vercel.
 *
 * Vercel no arranca un proceso que escuche en un puerto: invoca esta función por
 * cada petición. Express funciona tal cual porque su firma es (req, res), la
 * misma que espera la plataforma.
 *
 * `vercel.json` enruta aquí solo /api/*. El sitio estático y las imágenes los
 * sirve Vercel por su cuenta, sin pasar por esta función.
 */
import { app } from '../server/app.js'
import * as storage from '../server/storage/index.js'

// `init` valida que el almacén esté configurado. Se hace una vez por instancia,
// no en cada petición.
const ready = storage.init().catch((err) => {
  console.error('[almacenamiento] no se pudo inicializar:', err.message)
  return err
})

export default async function handler(req, res) {
  const problem = await ready

  // /api/health tiene que responder AUNQUE el almacén esté mal configurado: es
  // justo el momento en que hace falta saber qué ve el servidor. Si se bloqueara
  // aquí, el diagnóstico solo funcionaría cuando ya no hace falta.
  const isHealth = (req.url || '').startsWith('/api/health')

  if (problem instanceof Error && !isHealth) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: problem.message }))
    return
  }
  return app(req, res)
}
