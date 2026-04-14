'use client'
import { useState, useEffect } from 'react'
import { clientDb } from '@/lib/firebase-client'
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore'
import type { Principio } from '@/lib/types'

const ICONOS = ['inclusion', 'honradez', 'trabajo']

export default function AdminPrincipios() {
  const [principios, setPrincipios] = useState<Principio[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  async function load() {
    const snap = await getDocs(query(collection(clientDb, 'principios'), orderBy('orden', 'asc')))
    setPrincipios(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Principio)))
  }

  useEffect(() => { load() }, [])

  async function handleSave(p: Principio) {
    setSaving(p.id)
    setMsg('')
    try {
      const { id, ...data } = p
      await setDoc(doc(clientDb, 'principios', id), data)
      setMsg('Guardado.')
    } catch {
      setMsg('Error al guardar.')
    } finally {
      setSaving(null)
    }
  }

  async function handleAdd() {
    const newP = { titulo: 'Nuevo principio', descripcion: '', icono: 'inclusion', orden: principios.length + 1 }
    const ref = await addDoc(collection(clientDb, 'principios'), newP)
    setPrincipios([...principios, { id: ref.id, ...newP }])
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este principio?')) return
    await deleteDoc(doc(clientDb, 'principios', id))
    setPrincipios(principios.filter((p) => p.id !== id))
  }

  function update(id: string, field: keyof Principio, value: string | number) {
    setPrincipios(principios.map((p) => p.id === id ? { ...p, [field]: value } : p))
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1e0040' }}>Principios</h1>
        <button onClick={handleAdd}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}>
          + Agregar principio
        </button>
      </div>

      {msg && <p className="text-sm mb-4" style={{ color: msg.includes('Error') ? '#dc2626' : '#16a34a' }}>{msg}</p>}

      <div className="space-y-4">
        {principios.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-5" style={{ border: '1px solid #e0d0ee' }}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Título</label>
                  <input value={p.titulo} onChange={(e) => update(p.id, 'titulo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Ícono</label>
                  <select value={p.icono} onChange={(e) => update(p.id, 'icono', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}>
                    {ICONOS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Descripción</label>
                <textarea rows={3} value={p.descripcion} onChange={(e) => update(p.id, 'descripcion', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>Orden</label>
                <input type="number" value={p.orden} onChange={(e) => update(p.id, 'orden', Number(e.target.value))}
                  className="w-24 px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid #e0d0ee', color: '#1e0040' }} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleSave(p)} disabled={saving === p.id}
                className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
                style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}>
                {saving === p.id ? 'Guardando...' : 'Guardar'}
              </button>
              <button onClick={() => handleDelete(p.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium" style={{ border: '1px solid #fca5a5', color: '#dc2626' }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
