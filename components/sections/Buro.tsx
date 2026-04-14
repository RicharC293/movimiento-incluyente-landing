'use client'
import { useState } from 'react'
import type { BuroMember } from '@/lib/types'
import { ROLES_FIJOS, LABELS_FIJOS } from '@/lib/types'
import CoordCard from '@/components/ui/CoordCard'
import MiembroCard from '@/components/ui/MiembroCard'

export default function BuroSection({ members }: { members: BuroMember[] }) {
  const [expanded, setExpanded] = useState(false)

  // ── Slots fijos ────────────────────────────────────────────────────────
  const slots = ROLES_FIJOS.map((rol) => ({
    rol,
    label: LABELS_FIJOS[rol],
    miembro: members.find((m) => m.tipo === 'fijo' && m.rolFijo === rol) ?? null,
  }))

  const coordSlot = slots[0]       // coordinador
  const fila1     = slots.slice(1, 4) // subcoord, secretaria, resp. económico
  const fila2     = slots.slice(4, 7) // vocal-1, vocal-2, vocal-3

  // ── Dinámicos ──────────────────────────────────────────────────────────
  const dinamicos = members
    .filter((m) => m.tipo === 'dinamico' && m.visible)
    .sort((a, b) => a.orden - b.orden)

  return (
    <section id="buro" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] font-bold uppercase tracking-[2.5px] mb-3"
          style={{ color: '#A0359A' }}
        >
          Dirección provincial
        </p>
        <h2 className="text-[28px] font-extrabold mb-3 leading-tight" style={{ color: '#1e0040' }}>
          Buró político
        </h2>
        <p className="text-[15px] mb-8 max-w-xl" style={{ color: '#6a5080', lineHeight: '1.6' }}>
          Conoce al equipo que lidera el Movimiento Incluyente en la provincia de Cotopaxi.
        </p>

        {/* Coordinador */}
        <CoordCard miembro={coordSlot.miembro} />

        {/* Fila 1: subcoord, secretaria, resp. económico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {fila1.map((s) => (
            <MiembroCard key={s.rol} miembro={s.miembro} label={s.label} />
          ))}
        </div>

        {/* Fila 2: vocales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {fila2.map((s) => (
            <MiembroCard key={s.rol} miembro={s.miembro} label={s.label} />
          ))}
        </div>

        {/* Panel expandible — solo si hay dinámicos */}
        {dinamicos.length > 0 && (
          <div>
            {/* Botón toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-2 py-[11px] rounded-xl text-sm font-semibold mt-1 transition-colors"
              style={{
                background: '#f7f3fd',
                border: '1.5px solid #e0d0ee',
                color: '#A0359A',
              }}
            >
              <span>{expanded ? 'Ocultar miembros del buró' : 'Ver más miembros del buró'}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <path
                  d="M3 5l4 4 4-4"
                  stroke="#A0359A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {expanded && (
              <div className="mt-4">
                {/* Separador */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px" style={{ background: '#e0d0ee' }} />
                  <span
                    className="text-[9px] font-bold uppercase tracking-[1.5px] whitespace-nowrap"
                    style={{ color: '#6a5080' }}
                  >
                    Más miembros del buró
                  </span>
                  <div className="flex-1 h-px" style={{ background: '#e0d0ee' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {dinamicos.map((m) => (
                    <MiembroCard key={m.id} miembro={m} label={m.cargo ?? 'Miembro'} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
