/**
 * Genera el hash de la contraseña del panel.
 *
 *     npm run admin:password -- "su-contraseña"
 *
 * Imprime la línea que hay que poner como variable de entorno. La contraseña en
 * claro no se guarda en ninguna parte.
 */
import { hashPassword } from './auth.js'

const password = process.argv[2]

if (!password) {
  console.error('Uso: npm run admin:password -- "su-contraseña"')
  process.exit(1)
}

if (password.length < 10) {
  console.error('Use al menos 10 caracteres. Este panel edita el sitio público entero.')
  process.exit(1)
}

console.log('\nAñada esta variable de entorno al servidor:\n')
console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}\n`)
console.log('En Hostinger: hPanel > su aplicación Node > Variables de entorno.\n')
