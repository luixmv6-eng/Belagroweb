import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const DATA_DIR = process.env.BELAGRO_DATA_DIR || path.join(here, 'data')
export const UPLOAD_DIR = process.env.BELAGRO_UPLOAD_DIR || path.join(here, 'uploads')

export async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
}

/**
 * Lectura tolerante: si el archivo no existe todavia (primer arranque) o quedo
 * corrupto, se devuelve el valor por defecto en vez de tumbar el servidor. El
 * sitio publico debe seguir en pie aunque el contenido editado falle.
 */
export async function readJson(name, fallback) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, name), 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`[store] ${name} ilegible, se usa el valor por defecto:`, err.message)
    }
    return fallback
  }
}

/**
 * Escritura atomica: se escribe a un temporal y se renombra. Si el proceso muere
 * a mitad, el archivo anterior queda intacto en vez de truncado.
 */
export async function writeJson(name, value) {
  const target = path.join(DATA_DIR, name)
  const tmp = `${target}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), 'utf8')
  await fs.rename(tmp, target)
}
