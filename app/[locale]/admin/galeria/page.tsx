'use client'
import { useState, useEffect, useRef } from 'react'
import { clientDb, clientStorage } from '@/lib/firebase-client'
import { collection, getDocs, doc, addDoc, deleteDoc, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import type { GaleriaItem } from '@/lib/types'
import Image from 'next/image'

export default function AdminGaleria() {
  const [items, setItems] = useState<GaleriaItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const snap = await getDocs(query(collection(clientDb, 'galeria'), orderBy('orden', 'asc')))
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data(), fecha: d.data().fecha?.toDate?.()?.toISOString() ?? '' } as GaleriaItem)))
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    setMsg('')
    try {
      for (const file of files) {
        const storageRef = ref(clientStorage, `galeria/${Date.now()}-${file.name}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        await addDoc(collection(clientDb, 'galeria'), {
          url,
          orden: items.length + 1,
          fecha: serverTimestamp(),
        })
      }
      setMsg(`${files.length} imagen(es) subida(s).`)
      load()
    } catch {
      setMsg('Error al subir imágenes.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDelete(item: GaleriaItem) {
    if (!confirm('¿Eliminar esta imagen?')) return
    try {
      // Extract storage path from URL
      const decoded = decodeURIComponent(item.url)
      const match = decoded.match(/\/o\/(.+?)\?/)
      if (match) await deleteObject(ref(clientStorage, match[1]))
      await deleteDoc(doc(clientDb, 'galeria', item.id))
      setItems(items.filter((i) => i.id !== item.id))
    } catch {
      setMsg('Error al eliminar.')
    }
  }

  async function handleDescUpdate(id: string, descripcion: string) {
    await updateDoc(doc(clientDb, 'galeria', id), { descripcion })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1e0040' }}>Galería</h1>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
          style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}>
          {uploading ? 'Subiendo...' : '+ Subir imágenes'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </div>

      {msg && <p className="text-sm mb-4" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>{msg}</p>}

      {items.length === 0 ? (
        <p style={{ color: '#6a5080' }}>No hay imágenes. Sube la primera.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl overflow-hidden bg-white" style={{ border: '1px solid #e0d0ee' }}>
              <div className="relative h-36">
                <Image src={item.url} alt={item.descripcion ?? ''} fill className="object-cover" sizes="200px" />
              </div>
              <div className="p-2 space-y-2">
                <input
                  defaultValue={item.descripcion ?? ''}
                  onBlur={(e) => handleDescUpdate(item.id, e.target.value)}
                  placeholder="Descripción (opcional)"
                  className="w-full px-2 py-1 rounded text-xs"
                  style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
                />
                <button onClick={() => handleDelete(item)}
                  className="w-full py-1 rounded text-xs font-medium"
                  style={{ border: '1px solid #fca5a5', color: '#dc2626' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
