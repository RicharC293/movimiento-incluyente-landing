'use client'
import { useState, useEffect, useRef } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function AdminHistoria() {
  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getDoc(doc(clientDb, 'historia', 'content')).then((d) => {
      if (d.exists()) {
        setTitulo(d.data().titulo ?? '')
        setTexto(d.data().texto ?? '')
        setImgUrl(d.data().imagen ?? '')
      }
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await setDoc(doc(clientDb, 'historia', 'content'), { titulo, texto, imagen: imgUrl })
      setMsg('Guardado correctamente.')
    } catch {
      setMsg('Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  async function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    try {
      const storageRef = ref(clientStorage, `historia/${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setImgUrl(url)
      setMsg('Imagen subida. Guarda los cambios.')
    } catch {
      setMsg('Error al subir imagen.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e0040' }}>Historia</h1>
      <form onSubmit={handleSave} className="space-y-5">
        <Field label="Título">
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }} />
        </Field>
        <Field label="Texto">
          <textarea rows={6} value={texto} onChange={(e) => setTexto(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }} />
        </Field>
        <Field label="Imagen">
          <div className="space-y-2">
            {imgUrl && <img src={imgUrl} alt="Historia" className="w-full h-32 object-cover rounded-lg" />}
            <button type="button" onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-lg text-sm font-medium" style={{ border: '1px solid #A0359A', color: '#A0359A' }}>
              {imgUrl ? 'Cambiar imagen' : 'Subir imagen'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
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
    <button type="submit" disabled={saving}
      className="px-6 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
      style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}>
      {saving ? 'Guardando...' : 'Guardar cambios'}
    </button>
  )
}
