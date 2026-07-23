import { site, advisors, location, routes, nav } from '../data/site'
import { media } from '../data/media'
import { posts } from '../data/posts'
import { stages, presentations } from '../data/products'
import { clients, partners } from '../data/clients'
import { pages } from '../data/pages'

/**
 * Capa de contenido editable.
 *
 * Decision de diseno: en vez de pasar todo el sitio a React context (lo que
 * obligaria a tocar las trece paginas), el contenido publicado se funde sobre
 * los objetos de `src/data/*` ANTES del primer render. Los componentes siguen
 * importando `site`, `media`, `posts`... y ven ya los valores editados.
 *
 * Esto funciona porque los datos se exportan como objetos y arreglos mutables,
 * y porque la hidratacion ocurre antes de que React lea nada. El precio es que
 * los cambios no son reactivos en caliente: tras guardar, el panel recarga.
 */

/** Nombres de seccion -> objeto vivo que se puede editar. */
export const targets = {
  site,
  pages,
  media,
  advisors,
  location,
  nav,
  stages,
  clients,
  partners,
  presentations,
}

/** Copia profunda de los valores originales, para poder ofrecer "restaurar". */
export const defaults = structuredClone({
  site,
  pages,
  media,
  advisors,
  location,
  nav,
  stages,
  clients,
  partners,
  presentations,
})

export const defaultPosts = structuredClone(posts)

/** Fusion profunda. Los arreglos se reemplazan enteros, no se fusionan por indice:
 *  fusionar arreglos por posicion hace imposible borrar un elemento. */
function merge(target, patch) {
  if (!patch || typeof patch !== 'object') return target

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue

    if (Array.isArray(value)) {
      if (Array.isArray(target[key])) {
        target[key].length = 0
        target[key].push(...structuredClone(value))
      } else {
        target[key] = structuredClone(value)
      }
    } else if (value && typeof value === 'object') {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {}
      merge(target[key], value)
    } else {
      target[key] = value
    }
  }
  return target
}

export function applyContent(overrides) {
  if (!overrides || typeof overrides !== 'object') return
  for (const [section, patch] of Object.entries(overrides)) {
    const target = targets[section]
    if (!target) continue
    if (Array.isArray(target) && Array.isArray(patch)) {
      target.length = 0
      target.push(...structuredClone(patch))
    } else {
      merge(target, patch)
    }
  }
}

export function applyPosts(list) {
  if (!Array.isArray(list)) return
  posts.length = 0
  posts.push(...structuredClone(list))
}

/**
 * Se llama una vez, antes de montar React. Si la API no responde (sitio servido
 * como estatico, backend caido, desarrollo sin servidor) el sitio arranca con el
 * contenido del codigo: nunca se queda en blanco por esto.
 */
export async function hydrateContent() {
  const get = async (url) => {
    try {
      const res = await fetch(url, { credentials: 'same-origin' })
      return res.ok ? await res.json() : null
    } catch {
      return null
    }
  }

  const [content, postsPayload] = await Promise.all([get('/api/content'), get('/api/posts')])

  applyContent(content)
  if (postsPayload?.posts) applyPosts(postsPayload.posts)
}
