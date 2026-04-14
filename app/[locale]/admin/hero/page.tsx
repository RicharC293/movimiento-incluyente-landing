'use client'
import { useState, useEffect, useRef } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function AdminHero() {
  const [lema, setLema] = useState('')
  const [sublemas, setSublemas] = useState('Trabajo, Honradez, Igualdad')
  const [cta, setCta] = useState('Conoce el movimiento')
  const [bgUrl, setBgUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      const [heroDoc, bgDoc] = await Promise.all([
        getDoc(doc(clientDb, 'hero', 'content')),
        getDoc(doc(clientDb, 'hero', 'bg')),
      ])
      if (heroDoc.exists()) {
        const d = heroDoc.data()
        setLema(d.lema ?? '')
        setSublemas((d.sublemas ?? []).join(', '))
        setCta(d.cta ?? '')
      }
      if (bgDoc.exists()) setBgUrl(bgDoc.data()?.url ?? '')
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await setDoc(doc(clientDb, 'hero', 'content'), {
        lema,
        sublemas: sublemas.split(',').map((s) => s.trim()).filter(Boolean),
        cta,
      })
      setMsg('Guardado correctamente.')
    } catch {
      setMsg('Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  async function handleBgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    setMsg('')
    try {
      const storageRef = ref(clientStorage, 'hero/bg.jpg')
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      await setDoc(doc(clientDb, 'hero', 'bg'), { url })
      setBgUrl(url)
      setMsg('Imagen de fondo actualizada.')
    } catch {
      setMsg('Error al subir la imagen.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e0040' }}>Hero</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <Field label="Lema principal">
          <input
            value={lema}
            onChange={(e) => setLema(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
            placeholder="Trabajamos por nuestra gente"
          />
        </Field>

        <Field label='Sublemas (separados por coma)'>
          <input
            value={sublemas}
            onChange={(e) => setSublemas(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
            placeholder="Trabajo, Honradez, Igualdad"
          />
        </Field>

        <Field label="Texto del botón CTA">
          <input
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
          />
        </Field>

        <Field label="Imagen de fondo del hero">
          <div className="space-y-2">
            {bgUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={bgUrl} alt="Hero bg" className="w-full h-32 object-cover rounded-lg" />
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ border: '1px solid #A0359A', color: '#A0359A' }}
            >
              {bgUrl ? 'Cambiar imagen' : 'Subir imagen'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />
          </div>
        </Field>

        {msg && <p className="text-sm" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>{msg}</p>}

        <SaveBtn saving={saving} />
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

function SaveBtn({ saving }: { saving: boolean }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="px-6 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
      style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
    >
      {saving ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
