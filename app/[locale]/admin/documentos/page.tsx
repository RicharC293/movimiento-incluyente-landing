'use client'
import { useState, useEffect, useRef } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { collection, getDocs, doc, addDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import type { Documento } from '@/lib/types'

const TIPOS = [
  { value: 'regimen-organico', label: 'Régimen Orgánico' },
  { value: 'propuesta', label: 'Propuesta' },
  { value: 'otro', label: 'Otro' },
]

export default function AdminDocumentos() {
  const [docs, setDocs] = useState<Documento[]>([])
  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState<Documento['tipo']>('regimen-organico')
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const snap = await getDocs(collection(clientDb, 'documentos'))
    setDocs(snap.docs.map((d) => ({
      id: d.id, ...d.data(),
      fecha: d.data().fecha?.toDate?.()?.toISOString() ?? '',
    } as Documento)))
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !titulo.trim()) {
      setMsg('Completa el título antes de subir.')
      return
    }
    setUploading(true)
    setMsg('')
    try {
      const storageRef = ref(clientStorage, `documentos/${Date.now()}-${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      await addDoc(collection(clientDb, 'documentos'), {
        titulo: titulo.trim(), tipo, url, fecha: serverTimestamp(),
      })
      setMsg('Documento subido correctamente.')
      setTitulo('')
      load()
    } catch {
      setMsg('Error al subir el documento.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDelete(item: Documento) {
    if (!confirm('¿Eliminar este documento?')) return
    try {
      const decoded = decodeURIComponent(item.url)
      const match = decoded.match(/\/o\/(.+?)\?/)
      if (match) await deleteObject(ref(clientStorage, match[1]))
      await deleteDoc(doc(clientDb, 'documentos', item.id))
      setDocs(docs.filter((d) => d.id !== item.id))
    } catch {
      setMsg('Error al eliminar.')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e0040' }}>Documentos</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl p-5 mb-8" style={{ border: '1px solid #e0d0ee' }}>
        <p className="font-semibold text-sm mb-4" style={{ color: '#1e0040' }}>Subir nuevo documento</p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
              placeholder="Ej: Régimen Orgánico 2024" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as Documento['tipo'])}
              className="w-full px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}>
              {TIPOS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <button onClick={() => fileRef.current?.click()} disabled={uploading || !titulo.trim()}
            className="px-5 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
            style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}>
            {uploading ? 'Subiendo...' : 'Seleccionar PDF'}
          </button>
          <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={handleUpload} />
        </div>
      </div>

      {msg && <p className="text-sm mb-4" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>{msg}</p>}

      {/* List */}
      <div className="space-y-3">
        {docs.length === 0 && <p style={{ color: '#6a5080' }}>No hay documentos subidos aún.</p>}
        {docs.map((d) => (
          <div key={d.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
            style={{ border: '1px solid #e0d0ee' }}>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#1e0040' }}>{d.titulo}</p>
              <p className="text-xs" style={{ color: '#6a5080' }}>
                {TIPOS.find((t) => t.value === d.tipo)?.label ?? d.tipo}
              </p>
            </div>
            <div className="flex gap-2">
              <a href={d.url} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{ border: '1px solid #e0d0ee', color: '#6a5080' }}>
                Ver
              </a>
              <button onClick={() => handleDelete(d)}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{ border: '1px solid #fca5a5', color: '#dc2626' }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
