'use client'
import { useState, useEffect } from 'react'
import { clientDb } from '@/lib/firebase-client'
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore'
import type { BuroMember, BuroRolFijo } from '@/lib/types'
import { ROLES_FIJOS, LABELS_FIJOS } from '@/lib/types'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function AdminBuro() {
  const [members, setMembers] = useState<BuroMember[]>([])
  const locale = useLocale()

  async function load() {
    const snap = await getDocs(collection(clientDb, 'buro'))
    setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as BuroMember)))
  }

  useEffect(() => { load() }, [])

  async function handleQuitarFijo(rolFijo: BuroRolFijo) {
    if (!confirm(`¿Quitar la persona asignada como ${LABELS_FIJOS[rolFijo]}?`)) return
    // Elimina el documento cuyo id === rolFijo
    await deleteDoc(doc(clientDb, 'buro', rolFijo))
    load()
  }

  async function handleEliminarDinamico(id: string) {
    if (!confirm('¿Eliminar este miembro?')) return
    await deleteDoc(doc(clientDb, 'buro', id))
    load()
  }

  async function handleToggleVisible(m: BuroMember) {
    await setDoc(doc(clientDb, 'buro', m.id), { ...m, id: undefined, visible: !m.visible }, { merge: true })
    load()
  }

  const fijos    = members.filter((m) => m.tipo === 'fijo')
  const dinamicos = members.filter((m) => m.tipo === 'dinamico').sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-8" style={{ color: '#1e0040' }}>Buró político</h1>

      {/* ── Roles fijos ──────────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6a5080' }}>
          Roles fijos (7)
        </p>
        <div className="space-y-2">
          {ROLES_FIJOS.map((rolFijo) => {
            const asignado = fijos.find((m) => m.rolFijo === rolFijo)
            return (
              <div
                key={rolFijo}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
                style={{ border: '1px solid #e0d0ee' }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={
                      asignado
                        ? { background: 'linear-gradient(135deg, #A0359A, #3D1066)', color: '#fff' }
                        : { background: '#ede6f5', color: '#9a9089' }
                    }
                  >
                    {asignado ? (asignado.iniciales ?? '?') : '—'}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#A0359A' }}>
                      {LABELS_FIJOS[rolFijo]}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: asignado ? '#1e0040' : '#9a9089' }}>
                      {asignado?.nombre ?? 'Sin asignar'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {asignado ? (
                    <>
                      <Link
                        href={`/${locale}/admin/buro/${rolFijo}?tipo=fijo&rolFijo=${rolFijo}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ border: '1px solid #e0d0ee', color: '#6a5080' }}
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleQuitarFijo(rolFijo)}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ border: '1px solid #fca5a5', color: '#dc2626' }}
                      >
                        Quitar
                      </button>
                    </>
                  ) : (
                    <Link
                      href={`/${locale}/admin/buro/${rolFijo}?tipo=fijo&rolFijo=${rolFijo}`}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: 'linear-gradient(90deg, #A0359A, #3D1066)', color: '#fff' }}
                    >
                      Asignar persona
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Miembros adicionales ──────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6a5080' }}>
            Miembros adicionales
          </p>
          <Link
            href={`/${locale}/admin/buro/new?tipo=dinamico`}
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
          >
            + Agregar miembro
          </Link>
        </div>

        {dinamicos.length === 0 ? (
          <p className="text-sm" style={{ color: '#9a9089' }}>
            No hay miembros adicionales. Usa el botón para agregar.
          </p>
        ) : (
          <div className="space-y-2">
            {dinamicos.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
                style={{ border: '1px solid #e0d0ee' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #A0359A, #3D1066)' }}
                  >
                    {m.iniciales ?? '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1e0040' }}>{m.nombre}</p>
                    <p className="text-xs" style={{ color: '#A0359A' }}>{m.cargo ?? 'Miembro'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVisible(m)}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={
                      m.visible
                        ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                        : { background: '#f9fafb', color: '#6b7280', border: '1px solid #d1d5db' }
                    }
                  >
                    {m.visible ? 'Visible' : 'Oculto'}
                  </button>
                  <Link
                    href={`/${locale}/admin/buro/${m.id}?tipo=dinamico`}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ border: '1px solid #e0d0ee', color: '#6a5080' }}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminarDinamico(m.id)}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ border: '1px solid #fca5a5', color: '#dc2626' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
