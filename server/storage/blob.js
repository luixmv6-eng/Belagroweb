import crypto from 'node:crypto'

/**
 * Almacenamiento en Vercel Blob.
 *
 * En Vercel el sistema de archivos es de solo lectura salvo /tmp, y /tmp es
 * efímero y no se comparte entre instancias: escribir ahí daría la falsa
 * impresión de que se guardó. Por eso el contenido y las imágenes viven en Blob.
 *
 * Requiere la variable BLOB_READ_WRITE_TOKEN, que Vercel inyecta sola al
 * conectar un almacén Blob al proyecto.
 */

const DATA_PREFIX = 'contenido/'
const UPLOAD_PREFIX = 'subidas/'

export const name = 'Vercel Blob'

/** Blob devuelve URL absolutas y públicas: no hay que servirlas desde el servidor. */
export const servesUploads = false

/**
 * Localiza el token.
 *
 * Vercel permite conectar un almacén con prefijo, y entonces la variable se
 * llama `MIPREFIJO_BLOB_READ_WRITE_TOKEN`. El SDK solo mira el nombre sin
 * prefijo, así que aquí se busca cualquiera que termine igual y se le pasa
 * explícitamente en cada llamada.
 */
export function findToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN
  const key = Object.keys(process.env).find((k) => k.endsWith('BLOB_READ_WRITE_TOKEN'))
  return key ? process.env[key] : null
}

let blob = null

async function lib() {
  if (!blob) {
    try {
      blob = await import('@vercel/blob')
    } catch {
      throw new Error(
        'Falta el paquete @vercel/blob. Instálelo con: npm install @vercel/blob',
      )
    }
  }
  return blob
}

export async function init() {
  if (!findToken()) {
    throw new Error(
      'Falta BLOB_READ_WRITE_TOKEN. En Vercel: Storage > Blob > Projects > Connect Project. ' +
        'Vercel añade esa variable sola; no hay que escribirla a mano ni renombrarla.',
    )
  }
  await lib()
}

/** Localiza un blob por su ruta exacta. `list` es la vía fiable para obtener su URL. */
async function findBlob(pathname) {
  const { list } = await lib()
  const { blobs } = await list({ prefix: pathname, limit: 1, token: findToken() })
  return blobs.find((b) => b.pathname === pathname) ?? null
}

export async function readJson(file, fallback) {
  try {
    const found = await findBlob(DATA_PREFIX + file)
    if (!found) return fallback
    // `no-store`: tras guardar hay que leer el valor nuevo, no el de la CDN.
    const res = await fetch(found.url, { cache: 'no-store' })
    if (!res.ok) return fallback
    return await res.json()
  } catch (err) {
    console.error(`[almacenamiento] ${file} ilegible, se usa el valor por defecto:`, err.message)
    return fallback
  }
}

export async function writeJson(file, value) {
  const { put } = await lib()
  await put(DATA_PREFIX + file, JSON.stringify(value, null, 2), {
    token: findToken(),
    access: 'public',
    contentType: 'application/json',
    // Ruta estable y sin caché: este archivo se sobrescribe constantemente.
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  })
}

export async function saveUpload(buffer, ext, mime) {
  const { put } = await lib()
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`
  const result = await put(UPLOAD_PREFIX + filename, buffer, {
    token: findToken(),
    access: 'public',
    contentType: mime,
    addRandomSuffix: false,
  })
  return { url: result.url, name: filename }
}

export async function listUploads() {
  const { list } = await lib()
  const { blobs } = await list({ prefix: UPLOAD_PREFIX, token: findToken() })
  return blobs
    .map((b) => ({
      url: b.url,
      name: b.pathname.slice(UPLOAD_PREFIX.length),
      size: b.size,
      at: new Date(b.uploadedAt).getTime(),
    }))
    .sort((a, b) => b.at - a.at)
}

export async function deleteUpload(nameOrUrl) {
  const { del } = await lib()
  // `del` acepta la URL completa; si llega solo el nombre, se busca primero.
  if (nameOrUrl.startsWith('http')) {
    await del(nameOrUrl, { token: findToken() }).catch(() => {})
    return
  }
  const found = await findBlob(UPLOAD_PREFIX + nameOrUrl)
  if (found) await del(found.url, { token: findToken() }).catch(() => {})
}

/**
 * En serverless no se puede persistir un secreto generado al vuelo: cada
 * instancia generaría el suyo y las sesiones no valdrían entre unas y otras.
 * Aquí SESSION_SECRET es obligatorio.
 */
export async function readSecret() {
  throw new Error(
    'Falta SESSION_SECRET. En Vercel es obligatoria: sin ella cada instancia usaría ' +
      'un secreto distinto y las sesiones no funcionarían. Genérela con: ' +
      'node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
  )
}
