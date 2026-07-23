import { useState } from 'react'
import { ArrowLeft, FileText, Plus, Trash } from '@phosphor-icons/react'
import { Field, inputClass } from './Fields'

/** Tipos de bloque que sabe pintar el artículo (ver `Block` en BlogPost.jsx). */
const BLOCK_TYPES = [
  { type: 'p', label: 'Párrafo' },
  { type: 'h2', label: 'Subtítulo' },
  { type: 'ul', label: 'Lista' },
  { type: 'quote', label: 'Cita destacada' },
  { type: 'image', label: 'Imagen' },
]

const emptyBlock = (type) => {
  if (type === 'ul') return { type, items: [''] }
  if (type === 'image') return { type, src: '', alt: '', caption: '' }
  return { type, text: '' }
}

const emptyPost = () => ({
  slug: '',
  title: '',
  author: '',
  date: '',
  readingTime: '',
  cover: '',
  excerpt: '',
  body: [{ type: 'p', text: '' }],
  social: [],
})

/** Convierte un título en una URL limpia, sin tildes ni signos. */
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // marcas diacríticas
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

function BlockEditor({ block, onChange, onRemove, onMove, isFirst, isLast }) {
  const label = BLOCK_TYPES.find((b) => b.type === block.type)?.label ?? block.type

  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-fg-muted">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={isFirst}
            aria-label="Subir bloque"
            className="cursor-pointer rounded-full px-2 py-1 text-fg-muted hover:bg-card disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={isLast}
            aria-label="Bajar bloque"
            className="cursor-pointer rounded-full px-2 py-1 text-fg-muted hover:bg-card disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Eliminar bloque"
            className="cursor-pointer rounded-full p-1.5 text-fg-muted hover:bg-card hover:text-danger"
          >
            <Trash size={15} weight="bold" />
          </button>
        </div>
      </div>

      {block.type === 'ul' ? (
        <div className="flex flex-col gap-2">
          {(block.items ?? []).map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const items = [...block.items]
                  items[i] = e.target.value
                  onChange({ ...block, items })
                }}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({ ...block, items: block.items.filter((_, j) => j !== i) })
                }
                aria-label="Quitar punto"
                className="shrink-0 cursor-pointer rounded-full p-2 text-fg-muted hover:text-danger"
              >
                <Trash size={15} weight="bold" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...block, items: [...(block.items ?? []), ''] })}
            className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[0.82rem] font-semibold text-fg hover:border-lime hover:bg-lime-tint"
          >
            <Plus size={13} weight="bold" />
            Añadir punto
          </button>
        </div>
      ) : block.type === 'image' ? (
        <div className="flex flex-col gap-3">
          <Field
            field={{ label: 'Imagen', type: 'image', ratio: '16/9' }}
            value={block}
            onChange={(next) => onChange({ ...block, ...next })}
          />
          <Field
            field={{ label: 'Pie de foto (opcional)', type: 'text' }}
            value={block.caption}
            onChange={(caption) => onChange({ ...block, caption })}
          />
        </div>
      ) : (
        <textarea
          rows={block.type === 'p' ? 5 : 2}
          value={block.text ?? ''}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          className={`${inputClass} resize-y`}
        />
      )}
    </div>
  )
}

function PostForm({ post, onChange, onBack, onDelete }) {
  const set = (key, value) => onChange({ ...post, [key]: value })

  const setBlock = (i, next) => set('body', post.body.map((b, j) => (j === i ? next : b)))
  const moveBlock = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= post.body.length) return
    const copy = [...post.body]
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    set('body', copy)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[0.9rem] font-semibold text-fg-muted hover:text-fg"
        >
          <ArrowLeft size={16} weight="bold" />
          Todos los artículos
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.85rem] font-semibold text-danger hover:bg-surface"
        >
          <Trash size={15} weight="bold" />
          Eliminar artículo
        </button>
      </div>

      <Field
        field={{ label: 'Título', type: 'text' }}
        value={post.title}
        onChange={(title) => {
          // El slug solo se autogenera mientras esté vacío: cambiarlo después
          // rompería el enlace de un artículo ya publicado.
          onChange({ ...post, title, slug: post.slug || slugify(title) })
        }}
      />

      <Field
        field={{
          label: 'URL del artículo',
          type: 'text',
          help: 'Se publica en /blog/esta-url. Evite cambiarla si el artículo ya circula.',
        }}
        value={post.slug}
        onChange={(slug) => set('slug', slugify(slug))}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          field={{ label: 'Autor', type: 'text' }}
          value={post.author}
          onChange={(v) => set('author', v)}
        />
        <Field
          field={{ label: 'Fecha', type: 'text', help: 'Por ejemplo: 11 jun' }}
          value={post.date}
          onChange={(v) => set('date', v)}
        />
        <Field
          field={{ label: 'Tiempo de lectura', type: 'text', help: '3 min de lectura' }}
          value={post.readingTime}
          onChange={(v) => set('readingTime', v)}
        />
      </div>

      <Field
        field={{
          label: 'Imagen de portada',
          type: 'image',
          ratio: '16/9',
          help: 'Es la vista previa en la lista de Academia y la cabecera del artículo.',
        }}
        value={typeof post.cover === 'string' ? { src: post.cover } : post.cover}
        onChange={(img) => set('cover', img?.src ?? '')}
      />

      <Field
        field={{
          label: 'Resumen',
          type: 'textarea',
          help: 'El texto que acompaña a la portada en los listados. Dos o tres líneas.',
        }}
        value={post.excerpt}
        onChange={(v) => set('excerpt', v)}
      />

      <div>
        <p className="mb-1.5 text-[0.9rem] font-semibold text-fg">Contenido</p>
        <div className="flex flex-col gap-3">
          {post.body.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              isFirst={i === 0}
              isLast={i === post.body.length - 1}
              onChange={(next) => setBlock(i, next)}
              onMove={(dir) => moveBlock(i, dir)}
              onRemove={() => set('body', post.body.filter((_, j) => j !== i))}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {BLOCK_TYPES.map((b) => (
            <button
              key={b.type}
              type="button"
              onClick={() => set('body', [...post.body, emptyBlock(b.type)])}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.85rem] font-semibold text-fg hover:border-lime hover:bg-lime-tint"
            >
              <Plus size={13} weight="bold" />
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <Field
        field={{
          label: 'Enlaces del autor',
          type: 'list',
          addLabel: 'Añadir enlace',
          itemLabel: 'label',
          help: 'Redes o referencias que aparecen al final del artículo.',
          itemFields: [
            { path: 'label', label: 'Texto', type: 'text' },
            { path: 'url', label: 'Enlace', type: 'url' },
          ],
        }}
        value={post.social}
        onChange={(v) => set('social', v)}
      />
    </div>
  )
}

export default function PostsEditor({ posts, onChange }) {
  const [editing, setEditing] = useState(null)

  if (editing !== null && posts[editing]) {
    return (
      <PostForm
        post={posts[editing]}
        onBack={() => setEditing(null)}
        onChange={(next) => onChange(posts.map((p, i) => (i === editing ? next : p)))}
        onDelete={() => {
          if (!confirm('¿Eliminar este artículo? No se puede deshacer.')) return
          onChange(posts.filter((_, i) => i !== editing))
          setEditing(null)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => {
          onChange([emptyPost(), ...posts])
          setEditing(0)
        }}
        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[0.9rem] font-semibold text-on-lime"
      >
        <Plus size={16} weight="bold" />
        Nuevo artículo
      </button>

      {posts.length === 0 ? (
        <div className="rounded-card border border-dashed border-line-strong p-10 text-center">
          <FileText size={28} className="mx-auto text-fg-muted" aria-hidden="true" />
          <p className="mt-3 font-display font-semibold text-fg">Todavía no hay artículos</p>
          <p className="mt-1 text-[0.9rem] text-fg-muted">
            Cree el primero con el botón de arriba.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {posts.map((post, i) => (
            <li key={post.slug || i}>
              <button
                type="button"
                onClick={() => setEditing(i)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-card border border-line bg-card p-3 text-left transition-colors hover:border-lime hover:bg-lime-tint"
              >
                <div className="size-14 shrink-0 overflow-hidden rounded-[10px] bg-surface">
                  {post.cover && <img src={post.cover} alt="" className="size-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold text-fg">
                    {post.title || 'Artículo sin título'}
                  </p>
                  <p className="mt-0.5 truncate text-[0.85rem] text-fg-muted">
                    {[post.author, post.date].filter(Boolean).join(' · ') || 'Sin datos'}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
