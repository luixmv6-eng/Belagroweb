/**
 * Selección del almacenamiento.
 *
 * El resto del servidor no sabe dónde se guardan las cosas: pide leer o escribir
 * y este módulo decide. Así el mismo código corre en Hostinger (disco) y en
 * Vercel (Blob) sin ramas repartidas por toda la aplicación.
 *
 * Detección, en orden:
 *   1. STORAGE_DRIVER=fs|blob   fuerza uno concreto (útil para probar)
 *   2. BLOB_READ_WRITE_TOKEN    presente -> Vercel Blob
 *   3. disco
 *
 * Se mira el token y no `process.env.VERCEL` para que un despliegue en Vercel al
 * que se le olvidó conectar el almacén falle diciendo qué falta, en vez de
 * escribir en un /tmp que se borra sin avisar.
 */

const forced = process.env.STORAGE_DRIVER
const onServerless = Boolean(process.env.VERCEL)
const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

/*
 * En Vercel se elige Blob SIEMPRE, aunque falte el token.
 *
 * Parece contraintuitivo, pero es lo correcto: si no hay token, `blob.init()`
 * falla diciendo exactamente qué falta y cómo arreglarlo. Caer al controlador de
 * disco daría un "ENOENT: mkdir '/var/task/server/data'", que no le dice nada a
 * nadie, porque en Lambda el sistema de archivos es de solo lectura.
 */
const useBlob = forced === 'blob' || (!forced && (hasBlobToken || onServerless))

const driver = useBlob ? await import('./blob.js') : await import('./fs.js')

export const storage = driver
export const {
  name,
  servesUploads,
  init,
  readJson,
  writeJson,
  saveUpload,
  listUploads,
  deleteUpload,
  readSecret,
} = driver

/** Solo tiene sentido en el controlador de disco; el resto no lo usa. */
export const UPLOAD_DIR = driver.UPLOAD_DIR ?? null
export const DATA_DIR = driver.DATA_DIR ?? null
