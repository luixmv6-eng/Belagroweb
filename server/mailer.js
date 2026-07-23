import nodemailer from 'nodemailer'

/**
 * Envío de los formularios de contacto por SMTP.
 *
 * Se configura con variables de entorno. Si faltan, el endpoint lo dice y el
 * navegador cae al cliente de correo del visitante, de modo que un formulario
 * nunca responde "enviado" sin haber enviado nada.
 *
 *   SMTP_HOST      smtp.hostinger.com
 *   SMTP_PORT      465 (SSL) o 587 (STARTTLS)
 *   SMTP_USER      la cuenta de correo
 *   SMTP_PASSWORD  su contraseña
 *   SMTP_FROM      remitente; si falta, se usa SMTP_USER
 */

export const isConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)

let transport = null

function getTransport() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT) || 465
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 es SSL directo; 587 empieza en claro y sube a TLS con STARTTLS.
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })
  }
  return transport
}

/** Escapa el texto del visitante antes de meterlo en el HTML del correo. */
const escape = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function sendContactEmail({ to, subject, fields, replyTo }) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#575065;vertical-align:top;white-space:nowrap">${escape(key)}</td>` +
        `<td style="padding:6px 0;color:#17141c">${escape(value).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('')

  await getTransport().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    // Responder al correo lleva directamente al visitante, no al buzón del sitio.
    replyTo: replyTo || undefined,
    subject,
    text: Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
    html:
      `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">` +
      `<p style="margin:0 0 16px;color:#575065">${escape(subject)}</p>` +
      `<table style="border-collapse:collapse">${rows}</table>` +
      `</div>`,
  })
}
