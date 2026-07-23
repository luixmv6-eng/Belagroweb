import { useId, useRef, useState } from 'react'
import { Image as ImageIcon, Plus, SpinnerGap, Trash, UploadSimple } from '@phosphor-icons/react'
import { api } from './api'

const inputClass =
  'w-full rounded-input border border-line bg-card px-3 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-muted transition-colors focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime-strong focus:ring-offset-1 focus:ring-offset-bg'

function Label({ htmlFor, children, help }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-[0.9rem] font-semibold text-fg">
        {children}
      </label>
      {help && <p className="mt-0.5 text-[0.82rem] leading-snug text-fg-muted">{help}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ imagen */

function ImageField({ field, value, onChange }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const id = useId()
  const img = value ?? {}

  const patch = (next) => onChange({ ...img, ...next })

  async function handleFile(file) {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const { url } = await api.upload(file)
      // Se mide la imagen subida para guardar sus dimensiones reales: son las
      // que evitan el salto de layout al cargar la página.
      const dims = await new Promise((resolve) => {
        const probe = new Image()
        probe.onload = () => resolve({ width: probe.naturalWidth, height: probe.naturalHeight })
        probe.onerror = () => resolve({})
        probe.src = url
      })
      patch({ src: url, ...dims })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Label htmlFor={id} help={field.help}>
        {field.label}
        {field.ratio && (
          <span className="ml-2 font-normal text-fg-muted">proporción {field.ratio}</span>
        )}
      </Label>

      <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-3 sm:flex-row">
        <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-card">
          {img.src ? (
            <img src={img.src} alt="" className="size-full object-cover" />
          ) : (
            <ImageIcon size={26} className="text-fg-muted" aria-hidden="true" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            id={id}
            type="url"
            value={img.src ?? ''}
            onChange={(e) => patch({ src: e.target.value })}
            placeholder="/uploads/imagen.jpg"
            className={inputClass}
          />
          <input
            type="text"
            value={img.alt ?? ''}
            onChange={(e) => patch({ alt: e.target.value })}
            placeholder="Texto alternativo, para quien no ve la imagen"
            className={inputClass}
          />

          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-[0.85rem] font-semibold text-on-lime disabled:opacity-60"
            >
              {busy ? (
                <SpinnerGap size={15} weight="bold" className="animate-spin" />
              ) : (
                <UploadSimple size={15} weight="bold" />
              )}
              {busy ? 'Subiendo' : 'Subir imagen'}
            </button>
            {img.width > 0 && (
              <span className="text-[0.8rem] text-fg-muted">
                {img.width} × {img.height}
              </span>
            )}
          </div>

          {error && <p className="text-[0.85rem] font-medium text-danger">{error}</p>}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- lista */

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : []

  const update = (i, next) => onChange(items.map((item, j) => (j === i ? next : item)))
  const remove = (i) => onChange(items.filter((_, j) => j !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const copy = [...items]
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy)
  }
  const add = () =>
    onChange([...items, Object.fromEntries(field.itemFields.map((f) => [f.path, '']))])

  return (
    <div>
      <Label help={field.help}>{field.label}</Label>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-card border border-line bg-surface p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[0.85rem] font-semibold text-fg-muted">
                {item?.[field.itemLabel] || `Elemento ${i + 1}`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Subir"
                  className="cursor-pointer rounded-full px-2 py-1 text-fg-muted hover:bg-card disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Bajar"
                  className="cursor-pointer rounded-full px-2 py-1 text-fg-muted hover:bg-card disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Eliminar"
                  className="cursor-pointer rounded-full p-1.5 text-fg-muted hover:bg-card hover:text-danger"
                >
                  <Trash size={15} weight="bold" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {field.itemFields.map((sub) => (
                <Field
                  key={sub.path}
                  field={sub}
                  value={item?.[sub.path]}
                  onChange={(next) => update(i, { ...item, [sub.path]: next })}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={add}
          className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[0.85rem] font-semibold text-fg hover:border-lime hover:bg-lime-tint"
        >
          <Plus size={15} weight="bold" />
          {field.addLabel ?? 'Añadir'}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- campo */

export function Field({ field, value, onChange }) {
  const id = useId()

  if (field.type === 'image') return <ImageField field={field} value={value} onChange={onChange} />
  if (field.type === 'list') return <ListField field={field} value={value} onChange={onChange} />

  if (field.type === 'textarea') {
    return (
      <div>
        <Label htmlFor={id} help={field.help}>
          {field.label}
        </Label>
        <textarea
          id={id}
          rows={3}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </div>
    )
  }

  return (
    <div>
      <Label htmlFor={id} help={field.help}>
        {field.label}
      </Label>
      <input
        id={id}
        type={field.type === 'number' ? 'number' : field.type}
        value={value ?? ''}
        onChange={(e) =>
          onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)
        }
        className={inputClass}
      />
    </div>
  )
}

export { inputClass }
