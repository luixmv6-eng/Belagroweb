async function request(url, options = {}) {
  const res = await fetch(url, { credentials: 'same-origin', ...options })
  let payload = null
  try {
    payload = await res.json()
  } catch {
    /* respuesta sin cuerpo */
  }
  if (!res.ok) {
    throw new Error(payload?.error || `Error ${res.status}`)
  }
  return payload
}

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const api = {
  me: () => request('/api/auth/me'),
  login: (password) => request('/api/auth/login', json('POST', { password })),
  logout: () => request('/api/auth/logout', { method: 'POST' }),

  getContent: () => request('/api/content'),
  saveContent: (content) => request('/api/content', json('PUT', content)),

  getPosts: () => request('/api/posts'),
  savePosts: (posts) => request('/api/posts', json('PUT', { posts })),

  listUploads: () => request('/api/uploads'),
  deleteUpload: (name) => request(`/api/uploads/${encodeURIComponent(name)}`, { method: 'DELETE' }),
  upload: (file) => {
    const data = new FormData()
    data.append('file', file)
    return request('/api/uploads', { method: 'POST', body: data })
  },
}

/* Utilidades de rutas tipo "site.logo.src" sobre objetos anidados. */

export function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

export function setPath(obj, path, value) {
  const keys = path.split('.')
  const last = keys.pop()
  let node = obj
  for (const key of keys) {
    if (node[key] == null || typeof node[key] !== 'object') node[key] = {}
    node = node[key]
  }
  node[last] = value
  return obj
}
