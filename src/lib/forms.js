/**
 * Envío de formularios.
 *
 * Primero se intenta `/api/contact`, que manda el correo desde el servidor al
 * destinatario configurado en el panel. Si el servidor responde 501 (no hay SMTP
 * configurado) o no hay servidor, se abre el cliente de correo del visitante.
 *
 * Nunca se responde "enviado" sin haber enviado: si el correo falla de verdad,
 * la función lanza y el formulario muestra el error.
 */
export async function submitForm({ to, subject, data, website = '' }) {
  const openMailClient = () => {
    const body = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return { mode: 'mailto' }
  }

  let res
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ subject, fields: data, replyTo: data.email, website }),
    })
  } catch {
    // Sin red hacia el servidor (sitio servido como estático, API caída).
    return openMailClient()
  }

  if (res.ok) return { mode: 'servidor' }

  // 501: el servidor está, pero no tiene SMTP. Es el caso previsto para caer al
  // cliente de correo. Cualquier otro código sí es un fallo que hay que mostrar.
  if (res.status === 501 || res.status === 404) return openMailClient()

  const payload = await res.json().catch(() => null)
  throw new Error(payload?.error || 'No fue posible enviar el formulario.')
}

export const validators = {
  required: (label) => (v) => (v && String(v).trim() ? '' : `${label} es obligatorio.`),
  email: (v) => {
    if (!v || !v.trim()) return 'El correo es obligatorio.'
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ''
      : 'Escriba un correo válido, por ejemplo nombre@empresa.com'
  },
  minLength: (n, label) => (v) =>
    v && v.trim().length >= n ? '' : `${label} debe tener al menos ${n} caracteres.`,
  accepted: (msg) => (v) => (v ? '' : msg),
}

export function validate(values, schema) {
  const errors = {}
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(values[field])
      if (message) {
        errors[field] = message
        break
      }
    }
  }
  return errors
}
