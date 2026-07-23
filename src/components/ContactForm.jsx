import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowClockwise, CheckCircle, PaperPlaneTilt, Spinner } from '@phosphor-icons/react'
import { site } from '../data/site'
import { submitForm, validate, validators } from '../lib/forms'
import Field from './Field'
import Button from './Button'

const empty = { nombre: '', apellido: '', email: '', mensaje: '' }

const schema = {
  nombre: [validators.required('El nombre')],
  apellido: [validators.required('El apellido')],
  email: [validators.email],
  mensaje: [validators.required('El mensaje'), validators.minLength(10, 'El mensaje')],
}

export default function ContactForm({
  idPrefix = 'contacto',
  to = site.emailComercial,
  subject = 'Nueva solicitud desde belagro.co',
  submitLabel = 'Enviar',
}) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const field = (name) => ({
    id: `${idPrefix}-${name}`,
    value: values[name],
    error: touched[name] ? errors[name] : undefined,
    onChange: (e) => {
      const next = { ...values, [name]: e.target.value }
      setValues(next)
      if (touched[name]) setErrors(validate(next, schema))
    },
    onBlur: () => {
      setTouched((t) => ({ ...t, [name]: true }))
      setErrors(validate(values, schema))
    },
  })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values, schema)
    setErrors(found)
    setTouched({ nombre: true, apellido: true, email: true, mensaje: true })

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector(`#${idPrefix}-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitForm({ to, subject, data: values })
      setStatus('success')
      setValues(empty)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-4 rounded-card border border-line bg-card p-8"
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={40} weight="fill" className="text-lime-text" />
        <div>
          <h3 className="font-display text-xl font-semibold text-fg">Solicitud registrada</h3>
          <p className="mt-2 max-w-md leading-relaxed text-fg-muted">
            Su mensaje quedó en camino a {to}. Un miembro del equipo técnico le responde en horario
            laboral.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Enviar otro mensaje
        </Button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" required autoComplete="given-name" {...field('nombre')} />
        <Field label="Apellido" required autoComplete="family-name" {...field('apellido')} />
      </div>

      <Field
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        {...field('email')}
      />

      <Field
        label="Mensaje"
        as="textarea"
        required
        hint="Cuéntenos cultivo, área y etapa fenológica para responderle con criterio técnico."
        {...field('mensaje')}
      />

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-center justify-between gap-4 rounded-input border border-danger/40 bg-danger/8 px-4 py-3 text-[0.9rem] text-danger"
        >
          No pudimos enviar el formulario. Reintente o escríbanos a {to}.
          <button
            type="submit"
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 font-semibold underline underline-offset-4"
          >
            <ArrowClockwise size={16} weight="bold" />
            Reintentar
          </button>
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Spinner size={18} weight="bold" className="animate-spin" />
              Enviando
            </>
          ) : (
            <>
              <PaperPlaneTilt size={18} weight="fill" />
              {submitLabel}
            </>
          )}
        </Button>
      </div>

      <p className="max-w-xl text-[0.82rem] leading-relaxed text-fg-muted">{site.legalNote}</p>
    </form>
  )
}
