import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowSquareOut,
  ArrowCounterClockwise,
  Check,
  List,
  SignOut,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { groups, postsSection, sections } from '../content/schema'
import { defaultPosts, defaults } from '../content/store'
import { api, getPath, setPath } from './api'
import { Field, inputClass } from './Fields'
import PostsEditor from './PostsEditor'
import { LogoMark } from '../components/Logo'

/* ------------------------------------------------------------------ login */

function Login({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api.login(password)
      onDone()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-card border border-line bg-card p-8 shadow-[var(--shadow-card)]"
      >
        <LogoMark className="h-10 w-auto" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-fg">Panel de Belagro</h1>
        <p className="mt-1.5 text-[0.9rem] text-fg-muted">
          Introduzca la contraseña para editar el sitio.
        </p>

        <label htmlFor="admin-password" className="mt-6 block text-[0.9rem] font-semibold text-fg">
          Contraseña
        </label>
        <input
          id="admin-password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClass} mt-1.5`}
        />

        {error && (
          <p className="mt-3 flex items-start gap-1.5 text-[0.88rem] font-medium text-danger">
            <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full cursor-pointer rounded-full bg-lime px-5 py-3 font-semibold text-on-lime disabled:opacity-60"
        >
          {busy ? 'Comprobando' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

/* ---------------------------------------------------------------- utilidad */

/** Diferencia profunda contra los valores del código: solo se guarda lo cambiado. */
function diff(current, base) {
  if (Array.isArray(current)) {
    return JSON.stringify(current) === JSON.stringify(base) ? undefined : current
  }
  if (current && typeof current === 'object') {
    const out = {}
    for (const key of Object.keys(current)) {
      const d = diff(current[key], base?.[key])
      if (d !== undefined) out[key] = d
    }
    return Object.keys(out).length ? out : undefined
  }
  return current === base ? undefined : current
}

/* -------------------------------------------------------------------- app */

export default function AdminApp() {
  const [authed, setAuthed] = useState(null)
  const [draft, setDraft] = useState(null)
  const [posts, setPosts] = useState(null)
  const [active, setActive] = useState(sections[0].id)
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    api
      .me()
      .then((r) => setAuthed(r.authenticated))
      .catch(() => setAuthed(false))
  }, [])

  const load = useCallback(async () => {
    const [content, postsPayload] = await Promise.all([
      api.getContent().catch(() => ({})),
      api.getPosts().catch(() => ({ posts: null })),
    ])
    // Se parte de los valores del código y se le superponen los publicados, de
    // modo que el panel siempre muestra exactamente lo que ve el visitante.
    const base = structuredClone(defaults)
    const merged = structuredClone(base)
    const deepAssign = (target, patch) => {
      for (const [k, v] of Object.entries(patch ?? {})) {
        if (Array.isArray(v)) target[k] = structuredClone(v)
        else if (v && typeof v === 'object') {
          target[k] ??= {}
          deepAssign(target[k], v)
        } else target[k] = v
      }
    }
    deepAssign(merged, content)
    setDraft(merged)
    setPosts(postsPayload?.posts ?? structuredClone(defaultPosts))
  }, [])

  useEffect(() => {
    if (authed) load()
  }, [authed, load])

  const dirty = useMemo(() => {
    if (!draft) return false
    return Boolean(diff(draft, defaults)) || JSON.stringify(posts) !== JSON.stringify(defaultPosts)
  }, [draft, posts])

  async function save() {
    setSaving(true)
    setStatus(null)
    try {
      await api.saveContent(diff(draft, defaults) ?? {})
      await api.savePosts(posts)
      setStatus({ ok: true, text: 'Cambios publicados' })
    } catch (err) {
      setStatus({ ok: false, text: err.message })
    } finally {
      setSaving(false)
    }
  }

  if (authed === null) {
    return <div className="min-h-[100dvh] bg-surface" />
  }
  if (!authed) {
    return <Login onDone={() => setAuthed(true)} />
  }
  if (!draft) {
    return <div className="min-h-[100dvh] bg-surface" />
  }

  const section = [...sections, postsSection].find((s) => s.id === active)
  const isPosts = active === postsSection.id

  const nav = (
    <nav aria-label="Secciones del sitio" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.id}>
          <p className="px-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-fg-muted">
            {group.label}
          </p>
          <p className="mt-1 px-3 text-[0.78rem] leading-snug text-fg-muted/80">{group.hint}</p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {[...sections, postsSection]
              .filter((s) => s.group === group.id)
              .map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(s.id)
                      setMenuOpen(false)
                    }}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`w-full cursor-pointer rounded-[10px] px-3 py-2 text-left text-[0.92rem] transition-colors ${
                      active === s.id
                        ? 'bg-lime-tint font-semibold text-lime-text'
                        : 'text-fg-muted hover:bg-surface hover:text-fg'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-[100dvh] bg-surface">
      <header className="sticky top-0 z-30 border-b border-line bg-bg">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 md:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir secciones"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line lg:hidden"
          >
            <List size={19} weight="bold" />
          </button>

          <span className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-auto" />
            <span className="font-display font-semibold text-fg">Panel</span>
          </span>

          <div className="ml-auto flex items-center gap-2">
            {status && (
              <span
                className={`hidden items-center gap-1.5 text-[0.85rem] font-medium sm:inline-flex ${
                  status.ok ? 'text-lime-text' : 'text-danger'
                }`}
              >
                {status.ok ? <Check size={15} weight="bold" /> : <WarningCircle size={15} weight="fill" />}
                {status.text}
              </span>
            )}

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[0.85rem] font-semibold text-fg hover:bg-surface"
            >
              Ver sitio
              <ArrowSquareOut size={14} weight="bold" />
            </a>

            <button
              type="button"
              onClick={save}
              disabled={saving || !dirty}
              className="cursor-pointer rounded-full bg-lime px-5 py-2 text-[0.88rem] font-semibold text-on-lime disabled:opacity-50"
            >
              {saving ? 'Publicando' : dirty ? 'Publicar cambios' : 'Sin cambios'}
            </button>

            <button
              type="button"
              onClick={async () => {
                await api.logout()
                setAuthed(false)
              }}
              aria-label="Cerrar sesión"
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line text-fg-muted hover:text-fg"
            >
              <SignOut size={17} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">{nav}</div>
        </aside>

        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 cursor-default bg-[var(--scrim)]"
            />
            <div className="absolute left-0 top-0 h-full w-[min(20rem,86vw)] overflow-y-auto bg-bg p-5">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display font-semibold text-fg">Secciones</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar"
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
              {nav}
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <div className="rounded-card border border-line bg-bg p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-semibold text-fg">{section.label}</h1>
                {section.description && (
                  <p className="mt-1.5 max-w-[62ch] text-[0.92rem] leading-relaxed text-fg-muted">
                    {section.description}
                  </p>
                )}
              </div>

              {!isPosts && (
                <button
                  type="button"
                  onClick={() => {
                    if (!confirm(`¿Restaurar "${section.label}" a los valores originales?`)) return
                    const next = structuredClone(draft)
                    for (const field of section.fields) {
                      setPath(next, field.path, structuredClone(getPath(defaults, field.path)))
                    }
                    setDraft(next)
                  }}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[0.82rem] font-semibold text-fg-muted hover:text-fg"
                >
                  <ArrowCounterClockwise size={14} weight="bold" />
                  Restaurar
                </button>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {isPosts ? (
                <PostsEditor posts={posts} onChange={setPosts} />
              ) : (
                section.fields.map((field) => (
                  <Field
                    key={field.path}
                    field={field}
                    value={getPath(draft, field.path)}
                    onChange={(value) => {
                      const next = structuredClone(draft)
                      setPath(next, field.path, value)
                      setDraft(next)
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {status && (
            <p
              className={`mt-4 text-[0.9rem] font-medium sm:hidden ${
                status.ok ? 'text-lime-text' : 'text-danger'
              }`}
            >
              {status.text}
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
