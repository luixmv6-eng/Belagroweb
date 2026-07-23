import { promises as fs } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

/**
 * Almacenamiento en disco. Es el de Hostinger y el de desarrollo local: hay un
 * sistema de archivos de verdad, persistente entre reinicios.
 */

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, '..')

export const DATA_DIR = process.env.BELAGRO_DATA_DIR || path.join(root, 'data')
export const UPLOAD_DIR = process.env.BELAGRO_UPLOAD_DIR || path.join(root, 'uploads')

export const name = 'disco'

/** El servidor sirve /uploads como estáticos, así que las URL son relativas. */
export const servesUploads = true

export async function init() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
  } catch (err) {
    // ENOENT/EROFS/EACCES aquí casi siempre significan un entorno serverless con
    // el disco de solo lectura. El mensaje del sistema no lo explica, así que se
    // traduce a algo accionable.
    if (['ENOENT', 'EROFS', 'EACCES', 'EPERM'].includes(err.code)) {
      throw new Error(
        `No se puede escribir en ${DATA_DIR} (${err.code}). Si esto corre en un ` +
          'entorno sin disco persistente (Vercel, Lambda, Cloud Run), configure un ' +
          'almacén externo: conecte Vercel Blob al proyecto para que exista ' +
          'BLOB_READ_WRITE_TOKEN.',
      )
    }
    throw err
  }
}

export async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, file), 'utf8'))
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`[almacenamiento] ${file} ilegible, se usa el valor por defecto:`, err.message)
    }
    return fallback
  }
}

/** Escritura atómica: si el proceso muere a mitad, el archivo anterior queda intacto. */
export async function writeJson(file, value) {
  const target = path.join(DATA_DIR, file)
  const tmp = `${target}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), 'utf8')
  await fs.rename(tmp, target)
}

export async function saveUpload(buffer, ext) {
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)
  return { url: `/uploads/${filename}`, name: filename }
}

export async function listUploads() {
  const files = await fs.readdir(UPLOAD_DIR).catch(() => [])
  const items = await Promise.all(
    files.map(async (file) => {
      const stat = await fs.stat(path.join(UPLOAD_DIR, file)).catch(() => null)
      return stat?.isFile()
        ? { url: `/uploads/${file}`, name: file, size: stat.size, at: stat.mtimeMs }
        : null
    }),
  )
  return items.filter(Boolean).sort((a, b) => b.at - a.at)
}

export async function deleteUpload(nameOrUrl) {
  // basename corta cualquier intento de salir de la carpeta de subidas.
  await fs.unlink(path.join(UPLOAD_DIR, path.basename(nameOrUrl))).catch(() => {})
}

/**
 * El secreto de sesión se persiste para que reiniciar no cierre las sesiones
 * abiertas. Si hay variable de entorno, manda esa.
 */
export async function readSecret() {
  const file = path.join(DATA_DIR, '.session-secret')
  try {
    return await fs.readFile(file, 'utf8')
  } catch {
    const secret = crypto.randomBytes(32).toString('hex')
    await fs.writeFile(file, secret, { mode: 0o600 })
    return secret
  }
}
