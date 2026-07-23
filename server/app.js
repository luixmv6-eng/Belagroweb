import express from 'express'
import multer from 'multer'
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
import * as storage from './storage/index.js'
import { isConfigured as isMailerConfigured, sendContactEmail } from './mailer.js'
// Valores por defecto del sitio: la misma fuente que usa el frontend, para que
// el destinatario del formulario no se defina en dos sitios distintos.
import { site as defaultSite } from '../src/data/site.js'

/**
 * La aplicación Express, sin arrancar.
 *
 * Se exporta sin `listen` para poder montarla en los dos destinos:
 *   - Hostinger: `server/index.js` la arranca en un puerto.
 *   - Vercel:    `api/index.js` la exporta como función serverless.
 *
 * Dónde se guardan los datos lo decide `server/storage/`, no este archivo.
 */

const here = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(here, '..', 'dist')
const IS_PROD = process.env.NODE_ENV === 'production'

export const app = express()
app.disable('x-powered-by')
// Vercel y Hostinger van detrás de proxy: sin esto, req.ip sería siempre la del
// proxy y el freno de fuerza bruta afectaría a todo el mundo a la vez.
app.set('trust proxy', 1)
app.use(express.json({ limit: '2mb' }))

/* ---------------------------------------------------------------------------
   Login con freno de fuerza bruta
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
  try {
    await issueSession(res, IS_PROD)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
  return res.json({ ok: true })
})

app.post('/api/auth/logout', (req, res) => {
  clearSession(res)
  res.json({ ok: true })
})

app.get('/api/auth/me', async (req, res) => {
  try {
    res.json({ authenticated: await isAuthenticated(req) })
  } catch {
    res.json({ authenticated: false })
  }
})

/* ---------------------------------------------------------------------------
   Diagnóstico

   Dice qué configuración ve el servidor, para no tener que adivinar por qué algo
   no funciona tras un despliegue. Solo devuelve SÍ/NO: ningún valor, ninguna
   clave, ningún correo. Saber que una variable está puesta no le sirve de nada a
   un atacante; a quien despliega le ahorra media hora.
--------------------------------------------------------------------------- */

app.get('/api/health', (req, res) => {
  const smtp = isMailerConfigured()
  res.json({
    almacenamiento: storage.name,
    listo: {
      almacenamiento: storage.name !== 'Vercel Blob' || Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      contrasenaPanel: Boolean(process.env.ADMIN_PASSWORD_HASH),
      // En serverless el secreto no se puede generar al vuelo: debe venir puesto.
      secretoSesion: Boolean(process.env.SESSION_SECRET) || storage.name === 'disco',
      envioDeCorreo: smtp,
    },
    entorno: process.env.VERCEL ? 'Vercel' : 'servidor propio',
  })
})

/* ---------------------------------------------------------------------------
   Contenido

   `content.json` guarda SOLO lo que el usuario cambió. El sitio combina esos
   valores sobre los que trae el código, así que una clave ausente nunca deja un
   hueco: cae al valor original.
--------------------------------------------------------------------------- */

app.get('/api/content', async (req, res) => {
  res.json(await storage.readJson('content.json', {}))
})

app.put('/api/content', requireAuth, async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Se esperaba un objeto de contenido' })
  }
  await storage.writeJson('content.json', req.body)
  return res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Academia
--------------------------------------------------------------------------- */

app.get('/api/posts', async (req, res) => {
  res.json((await storage.readJson('posts.json', null)) ?? { posts: null })
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
  await storage.writeJson('posts.json', { posts })
  return res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Formulario de contacto

   Endpoint público, así que lleva freno propio y trampa antibots. El destinatario
   sale del contenido editable, para que se pueda cambiar desde el panel sin tocar
   código ni variables de entorno.
--------------------------------------------------------------------------- */

const mailAttempts = new Map()
const MAIL_MAX = 5
const MAIL_WINDOW_MS = 10 * 60 * 1000

app.post('/api/contact', async (req, res) => {
  if (!isMailerConfigured()) {
    // 501: no es un error del visitante. El navegador lo interpreta y abre el
    // cliente de correo, en vez de decir "enviado" sin haber enviado nada.
    return res.status(501).json({ error: 'El envío por correo no está configurado en el servidor.' })
  }

  const ip = req.ip || 'desconocida'
  const rec = mailAttempts.get(ip)
  if (rec && Date.now() - rec.first < MAIL_WINDOW_MS && rec.count >= MAIL_MAX) {
    return res.status(429).json({ error: 'Demasiados envíos. Inténtelo más tarde.' })
  }

  const { subject, fields, replyTo, website } = req.body ?? {}

  // Campo trampa: invisible para las personas, irresistible para los bots. Si
  // viene relleno se responde 200 para no darles pistas, pero no se envía nada.
  if (website) return res.json({ ok: true })

  if (!fields || typeof fields !== 'object' || !Object.keys(fields).length) {
    return res.status(400).json({ error: 'Faltan los datos del formulario.' })
  }

  // `content.json` solo guarda lo que se editó, así que si nadie tocó el correo
  // hay que caer a los valores del código. El destinatario NUNCA sale de la
  // petición: aceptarlo del cliente convertiría el formulario en un relé abierto
  // desde el que cualquiera podría mandar correo a quien quisiera.
  const content = await storage.readJson('content.json', {})
  const to =
    content?.site?.formRecipient?.trim() ||
    content?.site?.emailComercial?.trim() ||
    defaultSite.formRecipient?.trim() ||
    defaultSite.emailComercial?.trim() ||
    process.env.CONTACT_FALLBACK_EMAIL
  if (!to) {
    return res.status(500).json({ error: 'No hay un correo de destino configurado.' })
  }

  try {
    await sendContactEmail({
      to,
      subject: typeof subject === 'string' && subject.trim() ? subject : 'Nuevo mensaje desde la web',
      fields,
      replyTo: typeof replyTo === 'string' ? replyTo : undefined,
    })
  } catch (err) {
    console.error('[correo] fallo al enviar:', err.message)
    return res.status(502).json({ error: 'No fue posible enviar el mensaje.' })
  }

  const now = Date.now()
  if (!rec || now - rec.first > MAIL_WINDOW_MS) mailAttempts.set(ip, { count: 1, first: now })
  else rec.count += 1

  return res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Subida de imágenes

   Se recibe en memoria y se entrega a la capa de almacenamiento, que decide si
   acaba en disco o en Blob. El nombre lo genera el servidor: un nombre entrante
   puede traer rutas ("../") o extensiones engañosas.
--------------------------------------------------------------------------- */

const ALLOWED = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/avif', '.avif'],
  ['image/svg+xml', '.svg'],
])

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) =>
    ALLOWED.has(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Formato no admitido. Use JPG, PNG, WebP, AVIF o SVG.')),
})

app.post('/api/uploads', requireAuth, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo' })
    try {
      const saved = await storage.saveUpload(
        req.file.buffer,
        ALLOWED.get(req.file.mimetype),
        req.file.mimetype,
      )
      return res.json({ ...saved, originalName: req.file.originalname })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  })
})

app.get('/api/uploads', requireAuth, async (req, res) => {
  res.json({ files: await storage.listUploads() })
})

app.delete('/api/uploads/:name', requireAuth, async (req, res) => {
  await storage.deleteUpload(req.params.name)
  res.json({ ok: true })
})

/* ---------------------------------------------------------------------------
   Estáticos y SPA

   En Vercel esto no llega a usarse: la plataforma sirve `dist/` y los blobs por
   su cuenta, y solo enruta /api/* hasta aquí. Se deja porque es lo que hace
   funcionar el mismo código en Hostinger, donde no hay nada delante.
--------------------------------------------------------------------------- */

if (storage.servesUploads && storage.UPLOAD_DIR) {
  app.use('/uploads', express.static(storage.UPLOAD_DIR, { maxAge: '30d', index: false }))
}

app.use(express.static(DIST, { index: false, maxAge: '1h' }))

app.get(/^(?!\/api\/).*/, async (req, res) => {
  try {
    res.type('html').send(await fs.readFile(path.join(DIST, 'index.html'), 'utf8'))
  } catch {
    res.status(500).send('Falta la compilación. Ejecute: npm run build')
  }
})

export default app
