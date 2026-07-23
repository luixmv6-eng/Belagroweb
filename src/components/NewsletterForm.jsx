import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, PaperPlaneTilt, Spinner, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { routes, site } from '../data/site'
import { submitForm, validate, validators } from '../lib/forms'

const schema = {
  email: [validators.email],
  politica: [
    validators.accepted('Debe aceptar la política de privacidad para continuar.'),
  ],
}

export default function NewsletterForm() {
  const [values, setValues] = useState({ email: '', politica: false })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const revalidate = (next) => {
    if (Object.keys(touched).length) setErrors(validate(next, schema))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values, schema)
    setErrors(found)
    setTouched({ email: true, politica: true })

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector(`#newsletter-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitForm({
        to: site.emailComercial,
        subject: 'Inscripción al boletín de Belagro',
        data: { email: values.email, politica: 'aceptada' },
      })
      setStatus('success')
      setValues({ email: '', politica: false })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-card border border-onviolet-line bg-onviolet-fill px-5 py-4 text-on-violet"
      >
        <CheckCircle size={28} weight="fill" className="shrink-0 text-lime" />
        Listo. Su correo quedó inscrito para recibir las novedades técnicas de Belagro.
      </motion.p>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="text-sm font-semibold text-on-violet">
          Email
          <span className="text-lime" aria-hidden="true">
            {' '}
            *
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            placeholder="nombre@empresa.com"
            aria-invalid={touched.email && errors.email ? 'true' : 'false'}
            aria-describedby={touched.email && errors.email ? 'newsletter-email-error' : undefined}
            onChange={(e) => {
              const next = { ...values, email: e.target.value }
              setValues(next)
              revalidate(next)
            }}
            onBlur={() => {
              setTouched((t) => ({ ...t, email: true }))
              setErrors(validate(values, schema))
            }}
            className={`min-h-[3rem] w-full rounded-input border bg-onviolet-fill-strong px-4 py-3 text-[1rem] text-on-violet placeholder:text-on-violet-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-[var(--surface-violet-deep)] ${
              touched.email && errors.email ? 'border-danger-on-violet' : 'border-onviolet-line-strong'
            }`}
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex min-h-[3rem] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-lime px-6 py-3 font-semibold text-on-lime transition-transform duration-200 hover:-translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Spinner size={18} weight="bold" className="animate-spin" />
                Enviando
              </>
            ) : (
              <>
                <PaperPlaneTilt size={18} weight="fill" />
                Inscribirme
              </>
            )}
          </button>
        </div>

        {touched.email && errors.email && (
          <p
            id="newsletter-email-error"
            role="alert"
            className="flex items-center gap-1.5 text-[0.85rem] font-medium text-danger-on-violet"
          >
            <WarningCircle size={16} weight="fill" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-politica" className="flex cursor-pointer items-start gap-3">
          <input
            id="newsletter-politica"
            name="politica"
            type="checkbox"
            checked={values.politica}
            aria-invalid={touched.politica && errors.politica ? 'true' : 'false'}
            aria-describedby={
              touched.politica && errors.politica ? 'newsletter-politica-error' : undefined
            }
            onChange={(e) => {
              const next = { ...values, politica: e.target.checked }
              setValues(next)
              setTouched((t) => ({ ...t, politica: true }))
              setErrors(validate(next, schema))
            }}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[6px] border border-onviolet-line-strong bg-onviolet-fill-strong accent-[var(--brand-lime)] focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-[var(--surface-violet-deep)]"
          />
          <span className="text-[0.88rem] leading-relaxed text-on-violet-muted">
            Acepto que mis datos sean tratados según la{' '}
            <Link to={routes.privacy} className="font-semibold text-lime underline underline-offset-4">
              politica de privacidad
            </Link>{' '}
            establecidos por Belagro
            <span className="text-lime" aria-hidden="true">
              *
            </span>
          </span>
        </label>

        {touched.politica && errors.politica && (
          <p
            id="newsletter-politica-error"
            role="alert"
            className="flex items-center gap-1.5 text-[0.85rem] font-medium text-danger-on-violet"
          >
            <WarningCircle size={16} weight="fill" />
            {errors.politica}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-[0.88rem] font-medium text-danger-on-violet">
          No pudimos completar la inscripción. Reintente o escríbanos a {site.emailComercial}.
        </p>
      )}
    </form>
  )
}
