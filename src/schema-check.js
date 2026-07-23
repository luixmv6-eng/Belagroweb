import { sections, groups, postsSection } from './content/schema'
import { defaults } from './content/store'

const get = (obj, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj)

let fallos = 0
const err = (msg) => {
  fallos++
  console.log('  FALLA ' + msg)
}

console.log('== Cada ruta del esquema existe en los datos ==')
let campos = 0
for (const section of sections) {
  for (const field of section.fields) {
    campos++
    const value = get(defaults, field.path)
    if (value === undefined) {
      err(`${section.id}: la ruta "${field.path}" no existe`)
      continue
    }
    if (field.type === 'image' && (typeof value !== 'object' || !('src' in value))) {
      err(`${section.id}: "${field.path}" es tipo imagen pero no tiene src`)
    }
    if (field.type === 'list') {
      if (!Array.isArray(value)) {
        err(`${section.id}: "${field.path}" es tipo lista pero no es un arreglo`)
      } else if (value.length && typeof value[0] !== 'object') {
        err(`${section.id}: "${field.path}" contiene cadenas; el editor de listas espera objetos`)
      }
    }
    if (field.type === 'number' && typeof value !== 'number') {
      err(`${section.id}: "${field.path}" es tipo número pero vale ${typeof value}`)
    }
  }
}
console.log(`  ${campos} campos revisados`)

console.log('== Sin identificadores ni rutas repetidas ==')
const ids = [...sections, postsSection].map((s) => s.id)
if (new Set(ids).size !== ids.length) err('hay secciones con el mismo id')
for (const section of sections) {
  const paths = section.fields.map((f) => f.path)
  if (new Set(paths).size !== paths.length) err(`${section.id}: campos repetidos`)
}

console.log('== Cada sección pertenece a un grupo declarado ==')
const groupIds = new Set(groups.map((g) => g.id))
for (const s of [...sections, postsSection]) {
  if (!groupIds.has(s.group)) err(`${s.id}: grupo desconocido "${s.group}"`)
}

console.log('== Ningún grupo del menú queda vacío ==')
for (const g of groups) {
  const n = [...sections, postsSection].filter((s) => s.group === g.id).length
  if (n === 0) err(`el grupo "${g.id}" no tiene secciones`)
  else console.log(`  ${g.label}: ${n} secciones`)
}

console.log(`\n${fallos} fallos`)
if (fallos) process.exit(1)
