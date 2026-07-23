/**
 * Arranque para servidores con proceso propio: Hostinger, VPS, desarrollo local.
 *
 * En Vercel no se usa este archivo; allí el punto de entrada es `api/index.js`.
 */
import { app } from './app.js'
import * as storage from './storage/index.js'

const PORT = process.env.PORT || 3000

await storage.init()

app.listen(PORT, () => {
  console.log(`Belagro escuchando en http://localhost:${PORT}`)
  console.log(`  almacenamiento  ${storage.name}`)
  if (storage.DATA_DIR) console.log(`  datos           ${storage.DATA_DIR}`)
  if (storage.UPLOAD_DIR) console.log(`  subidas         ${storage.UPLOAD_DIR}`)

  if (!process.env.ADMIN_PASSWORD_HASH) {
    console.warn('\n  AVISO: sin ADMIN_PASSWORD_HASH no se puede entrar al panel.')
    console.warn('  Genérelo con: npm run admin:password -- "su-contraseña"\n')
  }
})
