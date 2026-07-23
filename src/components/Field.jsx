import { WarningCircle } from '@phosphor-icons/react'

const inputBase =
  'w-full rounded-input border bg-card px-4 py-3 text-[1rem] text-fg placeholder:text-fg-muted transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-lime-strong focus:ring-offset-2 focus:ring-offset-bg'

export default function Field({
  id,
  label,
  type = 'text',
  as = 'input',
  rows = 5,
  value,
  onChange,
  onBlur,
  error,
  required,
  hint,
  autoComplete,
  inputMode,
  placeholder,
  className = '',
}) {
  const Tag = as
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-fg">
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      <Tag
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy || undefined}
        className={`${inputBase} ${as === 'textarea' ? 'min-h-[8rem] resize-y' : 'min-h-[3rem]'} ${
          error ? 'border-danger' : 'border-line-strong hover:border-line-strong'
        }`}
      />

      {hint && !error && (
        <p id={`${id}-hint`} className="text-[0.82rem] text-fg-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-[0.85rem] font-medium text-danger"
        >
          <WarningCircle size={16} weight="fill" className="mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
