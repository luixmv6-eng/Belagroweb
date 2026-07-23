import express from 'express'
import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  clearSession,
  isAuthenticated,
  issueSession,
  requireAuth,
  verifyPassword,
} from './auth.js'
import { DATA_DIR, UPLOAD_DIR, ensureDirs, readJson, writeJson } from './store.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(here, '..', 'dist')
const PORT = process.env.PORT || 3000
const IS_PROD = process.env.NODE_ENV === 'production'

await ensureDirs()

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '2mb' }))

/* ---------------------------------------------------------------------------
   Login con freno de fuerza bruta

   Sin esto, un formulario de contrasena publico es una invitacion. El freno es
   por IP y en memoria: se pierde al reiniciar, que para este tamano sobra.
--------------------------------------------------------------------------- */
const attempts = new Map()
const MAX_ATTEMPTS = 8
const WINDOW_MS = 15 * 60 * 1000

function throttled(ip) {
  const rec = attempts.get(ip)
  if (!rec) return false
  if (Date.now() - rec.first > WINDOW_MS) {
    attempts.delete(ip)
    return false
  }
  return rec.count >= MAX_ATTEMPTS
}

function noteFailure(ip) {
  const rec = attempts.get(ip)
  if (!rec || Date.now() - rec.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: Date.now() })
  } else {
    rec.count += 1
  }
}

app.post('/api/auth/login', async (req, res) => {
  const ip = req.ip || 'desconocida'
  if (throttled(ip)) {
    return res.status(429).json({ error: 'Demasiados intentos. Espere 15 minutos.' })
  }

  const stored = process.env.ADMIN_PASSWORD_HASH
  if (!stored) {
    return res.status(500).json({
      error:
        'Falta ADMIN_PASSWORD_HASH en el servidor. Genérelo con: npm run admin:password -- "su-contraseña"',
    })
  }

  const { password } = req.body ?? {}
  if (typeof password !== 'string' || !verifyPassword(password, stored)) {
    noteFailure(ip)
    return res.status(401).json({ error: 'Contraseña incorrecta' })
  }

  attempts.delete(ip)
  await issueSession(res, IS_PROD)
  return res.json({ ok: true })
})

app.post('/api/auth/logout', (req, res) => {
  clearSession(res)
  res.json({ ok: true })
})

app.get('/api/auth/me', async (req, res) => {
  res.json({ authenticated: await isAuthenticated(req) })
})

/* ---------------------------------------------------------------------------
   Contenido

   `content.json` guarda SOLO lo que el usuario cambio. El sitio combina esos
   valores sobre los que trae el codigo, asi que una clave ausente nunca deja un
   hueco: cae al valor original.
--------------------------------------------------------------------------- */

app.get('/api/content', async (req, res) => {
  res.json(await readJson('content.json', {}))
})

app.put('/api/content', requireAuth, async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Se esperaba un objeto de contenido' })
  }
  await writeJson('content.json', req.body)
  return res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Academia
--------------------------------------------------------------------------- */

app.get('/api/posts', async (req, res) => {
  res.json(await readJson('posts.json', null) ?? { posts: null })
})

app.put('/api/posts', requireAuth, async (req, res) => {
  const { posts } = req.body ?? {}
  if (!Array.isArray(posts)) {
    return res.status(400).json({ error: 'Se esperaba una lista de artículos' })
  }
  const slugs = posts.map((p) => p?.slug).filter(Boolean)
  if (new Set(slugs).size !== slugs.length) {
    return res.status(400).json({ error: 'Hay dos artículos con la misma URL (slug)' })
  }
  await writeJson('posts.json', { posts })
  return res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Subida de imagenes
--------------------------------------------------------------------------- */

const ALLOWED = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/avif', '.avif'],
  ['image/svg+xml', '.svg'],
])

const upload = multer({
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    // Nombre generado, nunca el del usuario: un nombre entrante puede traer
    // rutas ("../") o extensiones enganosas.
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ALLOWED.get(file.mimetype)}`),
  }),
  fileFilter: (req, file, cb) =>
    ALLOWED.has(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Formato no admitido. Use JPG, PNG, WebP, AVIF o SVG.')),
})

app.post('/api/uploads', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo' })
    return res.json({ url: `/uploads/${req.file.filename}`, name: req.file.originalname })
  })
})

app.get('/api/uploads', requireAuth, async (req, res) => {
  const files = await fs.readdir(UPLOAD_DIR).catch(() => [])
  const items = await Promise.all(
    files.map(async (name) => {
      const stat = await fs.stat(path.join(UPLOAD_DIR, name)).catch(() => null)
      return stat?.isFile() ? { url: `/uploads/${name}`, size: stat.size, at: stat.mtimeMs } : null
    }),
  )
  res.json({ files: items.filter(Boolean).sort((a, b) => b.at - a.at) })
})

app.delete('/api/uploads/:name', requireAuth, async (req, res) => {
  // basename corta cualquier intento de salir de la carpeta de subidas.
  const name = path.basename(req.params.name)
  await fs.unlink(path.join(UPLOAD_DIR, name)).catch(() => {})
  res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Estaticos y SPA
--------------------------------------------------------------------------- */

app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d', index: false }))
app.use(express.static(DIST, { index: false, maxAge: '1h' }))

// Cualquier ruta no-API la resuelve el enrutador del cliente.
app.get(/^(?!\/api\/).*/, async (req, res) => {
  try {
    res.type('html').send(await fs.readFile(path.join(DIST, 'index.html'), 'utf8'))
  } catch {
    res.status(500).send('Falta la compilación. Ejecute: npm run build')
  }
})

app.listen(PORT, () => {
  console.log(`Belagro escuchando en http://localhost:${PORT}`)
  console.log(`  datos    ${DATA_DIR}`)
  console.log(`  subidas  ${UPLOAD_DIR}`)
  if (!process.env.ADMIN_PASSWORD_HASH) {
    console.warn('\n  AVISO: sin ADMIN_PASSWORD_HASH no se puede entrar al panel.')
    console.warn('  Genérelo con: npm run admin:password -- "su-contraseña"\n')
  }
})
