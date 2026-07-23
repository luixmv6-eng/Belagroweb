/**
 * Envío de formularios.
 *
 * Si define VITE_FORM_ENDPOINT (Formspree, Getform, una Lambda propia, etc.)
 * el formulario hace POST allí. Si no la define, se abre el cliente de correo
 * del usuario con el mensaje ya redactado, de modo que el formulario nunca
 * queda en un "gracias" falso que no envía nada.
 */
export async function submitForm({ to, subject, data }) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _to: to, ...data }),
    })
    if (!res.ok) throw new Error('No fue posible enviar el formulario.')
    return { mode: 'endpoint' }
  }

  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { mode: 'mailto' }
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
