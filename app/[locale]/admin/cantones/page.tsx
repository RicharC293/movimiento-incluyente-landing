'use client'
import { useState, useEffect, useRef } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { CANTONES_COTOPAXI } from '@/lib/types'
import type { Canton } from '@/lib/types'

const DEFAULT_COORD = { nombre: '', profesion: '', frase: '', iniciales: '', foto: '' }

export default function AdminCantones() {
  const [cantones, setCantones] = useState<(typeof CANTONES_COTOPAXI[0] & { coordinador: Canton['coordinador'] })[]>([])
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(DEFAULT_COORD)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const results = await Promise.all(
      CANTONES_COTOPAXI.map(async (c) => {
        const snap = await getDoc(doc(clientDb, 'cantones', c.id))
        const coord = snap.exists() ? snap.data()?.coordinador ?? null : null
        return { ...c, coordinador: coord }
      })
    )
    setCantones(results)
  }

  useEffect(() => { load() }, [])

  function startEdit(canton: typeof cantones[0]) {
    setEditId(canton.id)
    setForm(
      canton.coordinador
        ? {
            nombre: canton.coordinador.nombre,
            profesion: canton.coordinador.profesion,
            frase: canton.coordinador.frase,
            iniciales: canton.coordinador.iniciales,
            foto: canton.coordinador.foto ?? '',
          }
        : DEFAULT_COORD
    )
  }

  async function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    try {
      const storageRef = ref(clientStorage, `cantones/${Date.now()}-${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setForm((f) => ({ ...f, foto: url }))
      setMsg('Foto subida. Guarda los cambios.')
    } catch {
      setMsg('Error al subir foto.')
    } finally {
      setSaving(false)
    }
  }

  async function handleSave(canton: typeof cantones[0]) {
    setSaving(true)
    setMsg('')
    try {
      const coord = form.nombre.trim()
        ? {
            nombre: form.nombre,
            profesion: form.profesion,
            frase: form.frase,
            iniciales: form.iniciales,
            ...(form.foto ? { foto: form.foto } : {}),
          }
        : null
      await setDoc(doc(clientDb, 'cantones', canton.id), {
        nombre: canton.nombre,
        coordinador: coord,
      })
      setMsg('Guardado.')
      setEditId(null)
      load()
    } catch {
      setMsg('Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  async function handleQuitar(canton: typeof cantones[0]) {
    if (!confirm(`¿Quitar el coordinador de ${canton.nombre}?`)) return
    await setDoc(doc(clientDb, 'cantones', canton.id), {
      nombre: canton.nombre,
      coordinador: null,
    })
    load()
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e0040' }}>Coordinaciones cantonales</h1>
      <p className="text-sm mb-6" style={{ color: '#6a5080' }}>
        Los 7 cantones de Cotopaxi. Asigna o edita el coordinador de cada uno.
      </p>

      {msg && (
        <p className="text-sm mb-4" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>
          {msg}
        </p>
      )}

      <div className="space-y-3">
        {cantones.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #e0d0ee' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={
                    c.coordinador
                      ? { background: 'linear-gradient(135deg, #A0359A, #3D1066)', color: '#fff' }
                      : { background: '#ede6f5', color: '#9a9089' }
                  }
                >
                  {c.coordinador?.iniciales ?? '—'}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#A0359A' }}>
                    {c.nombre}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: c.coordinador ? '#1e0040' : '#9a9089' }}>
                    {c.coordinador?.nombre ?? 'Sin coordinador'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editId === c.id ? setEditId(null) : startEdit(c)}
                  className="px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ border: '1px solid #e0d0ee', color: '#6a5080' }}
                >
                  {editId === c.id ? 'Cancelar' : c.coordinador ? 'Editar' : 'Asignar'}
                </button>
                {c.coordinador && (
                  <button
                    onClick={() => handleQuitar(c)}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ border: '1px solid #fca5a5', color: '#dc2626' }}
                  >
                    Quitar
                  </button>
                )}
              </div>
            </div>

            {editId === c.id && (
              <div className="border-t pt-4 mt-2 space-y-3" style={{ borderColor: '#e0d0ee' }}>
                <p className="text-xs" style={{ color: '#9a9089' }}>
                  Deja el nombre vacío para marcar como "Por designar"
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Nombre', key: 'nombre' },
                    { label: 'Iniciales', key: 'iniciales' },
                    { label: 'Profesión', key: 'profesion' },
                    { label: 'Frase', key: 'frase' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>
                        {label}
                      </label>
                      <input
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg text-sm"
                        style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Foto</label>
                  <div className="flex items-center gap-3">
                    {form.foto && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.foto} alt="" className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ border: '1px solid #A0359A', color: '#A0359A' }}
                    >
                      {form.foto ? 'Cambiar' : 'Subir foto'}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
                  </div>
                </div>

                <button
                  onClick={() => handleSave(c)}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
                  style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
                >
                  {saving ? 'Guardando...' : 'Guardar coordinador'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
