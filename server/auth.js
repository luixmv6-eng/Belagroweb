import crypto from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { DATA_DIR } from './store.js'

const COOKIE = 'belagro_admin'
const SESSION_HOURS = 12

/* ---------------------------------------------------------------------------
   Contrasena

   Se guarda solo el hash scrypt, nunca el texto plano. El hash se pasa por la
   variable de entorno ADMIN_PASSWORD_HASH y se genera con:

       npm run admin:password -- "su-contrasena"

   scrypt es deliberadamente lento, que es lo que se quiere aqui: encarece
   probar contrasenas por fuerza bruta.
--------------------------------------------------------------------------- */

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const derived = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derived}`
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false
  const [salt, expected] = stored.split(':')
  const derived = crypto.scryptSync(password, salt, 64)
  const expectedBuf = Buffer.from(expected, 'hex')
  if (expectedBuf.length !== derived.length) return false
  // Comparacion en tiempo constante: evita filtrar el hash por temporizacion.
  return crypto.timingSafeEqual(derived, expectedBuf)
}

/* ---------------------------------------------------------------------------
   Sesion

   Cookie firmada con HMAC y sin estado en servidor, para que reiniciar la app
   (algo habitual en hosting compartido) no cierre la sesion de nadie.
--------------------------------------------------------------------------- */

let secretPromise = null

async function getSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET
  // Sin variable de entorno se genera uno y se persiste, para que sobreviva a
  // los reinicios. Si se pierde, solo obliga a volver a entrar.
  secretPromise ??= (async () => {
    const file = path.join(DATA_DIR, '.session-secret')
    try {
      return await fs.readFile(file, 'utf8')
    } catch {
      const secret = crypto.randomBytes(32).toString('hex')
      await fs.writeFile(file, secret, { mode: 0o600 })
      return secret
    }
  })()
  return secretPromise
}

async function sign(value) {
  const secret = await getSecret()
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header
      .split(';')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const i = c.indexOf('=')
        return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))]
      }),
  )
}

export async function issueSession(res, secure) {
  const expires = Date.now() + SESSION_HOURS * 3600 * 1000
  const payload = String(expires)
  const token = `${payload}.${await sign(payload)}`

  res.setHeader(
    'Set-Cookie',
    [
      `${COOKIE}=${encodeURIComponent(token)}`,
      'HttpOnly',
      'Path=/',
      'SameSite=Lax',
      secure ? 'Secure' : '',
      `Max-Age=${SESSION_HOURS * 3600}`,
    ]
      .filter(Boolean)
      .join('; '),
  )
}

export function clearSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`)
}

export async function isAuthenticated(req) {
  const token = parseCookies(req.headers.cookie)[COOKIE]
  if (!token || !token.includes('.')) return false

  const [payload, mac] = token.split('.')
  const expected = await sign(payload)
  const a = Buffer.from(mac, 'hex')
  const b = Buffer.from(expected, 'hex')
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false

  return Number(payload) > Date.now()
}

/** Middleware para todo lo que escribe. Lo publico no pasa por aqui. */
export async function requireAuth(req, res, next) {
  if (await isAuthenticated(req)) return next()
  return res.status(401).json({ error: 'No autorizado' })
}
