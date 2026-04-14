'use client'
import { useState, useEffect, useRef, use } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import type { BuroMember, BuroRolFijo } from '@/lib/types'
import { LABELS_FIJOS } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

const DEFAULT: Omit<BuroMember, 'id'> = {
  nombre: '',
  profesion: '',
  frase: '',
  iniciales: '',
  tipo: 'fijo',
  orden: 99,
  visible: true,
}

export default function AdminBuroForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const isNew = id === 'new'
  const tipoParam = (searchParams.get('tipo') ?? 'fijo') as 'fijo' | 'dinamico'
  const rolFijoParam = searchParams.get('rolFijo') as BuroRolFijo | null

  const [form, setForm] = useState<Omit<BuroMember, 'id'>>({
    ...DEFAULT,
    tipo: tipoParam,
    rolFijo: rolFijoParam ?? undefined,
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    if (!isNew) {
      getDoc(doc(clientDb, 'buro', id)).then((d) => {
        if (d.exists()) setForm(d.data() as Omit<BuroMember, 'id'>)
      })
    }
  }, [id, isNew])

  function set<K extends keyof typeof form>(field: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    try {
      const storageRef = ref(clientStorage, `equipo/${Date.now()}-${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      set('foto', url)
      setMsg('Foto subida. Guarda los cambios.')
    } catch {
      setMsg('Error al subir foto.')
    } finally {
      setSaving(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      if (form.tipo === 'fijo') {
        // Para fijos: usar rolFijo como doc id para lookup directo
        const docId = form.rolFijo ?? id
        await setDoc(doc(clientDb, 'buro', docId), { ...form })
      } else if (isNew) {
        await addDoc(collection(clientDb, 'buro'), form)
      } else {
        await setDoc(doc(clientDb, 'buro', id), form)
      }
      setMsg('Guardado correctamente.')
      setTimeout(() => router.push(`/${locale}/admin/buro`), 800)
    } catch {
      setMsg('Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  const isDinamico = form.tipo === 'dinamico'
  const pageTitle = isNew
    ? isDinamico
      ? 'Nuevo miembro adicional'
      : `Asignar: ${form.rolFijo ? LABELS_FIJOS[form.rolFijo] : 'Rol fijo'}`
    : isDinamico
      ? 'Editar miembro'
      : `Editar: ${form.rolFijo ? LABELS_FIJOS[form.rolFijo] : 'Rol fijo'}`

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e0040' }}>{pageTitle}</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre completo">
            <input
              required
              value={form.nombre ?? ''}
              onChange={(e) => set('nombre', e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
            />
          </Field>
          <Field label="Iniciales (ej: AB)">
            <input
              required
              maxLength={3}
              value={form.iniciales ?? ''}
              onChange={(e) => set('iniciales', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
            />
          </Field>
        </div>

        <Field label="Profesión">
          <input
            value={form.profesion ?? ''}
            onChange={(e) => set('profesion', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
          />
        </Field>

        <Field label="Frase">
          <textarea
            rows={3}
            value={form.frase ?? ''}
            onChange={(e) => set('frase', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm resize-none"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
          />
        </Field>

        {/* Cargo libre — solo para dinámicos */}
        {isDinamico && (
          <Field label="Cargo (ej: Asesor jurídico, Comunicación…)">
            <input
              value={form.cargo ?? ''}
              onChange={(e) => set('cargo', e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
              placeholder="Ej: Asesor jurídico"
            />
          </Field>
        )}

        <Field label="Orden">
          <input
            type="number"
            value={form.orden}
            onChange={(e) => set('orden', Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
          />
        </Field>

        <Field label="Foto">
          <div className="flex items-center gap-3">
            {form.foto && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.foto} alt="" className="w-14 h-14 rounded-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ border: '1px solid #A0359A', color: '#A0359A' }}
            >
              {form.foto ? 'Cambiar foto' : 'Subir foto'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
          </div>
        </Field>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => set('visible', e.target.checked)}
            className="w-4 h-4"
            style={{ accentColor: '#A0359A' }}
          />
          <span className="text-sm" style={{ color: '#1e0040' }}>Visible en el sitio</span>
        </label>

        {msg && (
          <p className="text-sm" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>
            {msg}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
            style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg text-sm font-medium"
            style={{ border: '1px solid #e0d0ee', color: '#6a5080' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>{label}</label>
      {children}
    </div>
  )
}
