import type { BuroMember } from '@/lib/types'
import Image from 'next/image'

interface Props {
  miembro: BuroMember | null
  label: string
}

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="7" r="3.2" stroke="#b0a898" strokeWidth="1.4" />
    <path d="M2 16c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" stroke="#b0a898" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export default function MiembroCard({ miembro, label }: Props) {

  // ── Placeholder ────────────────────────────────────────────────────────────
  if (!miembro) {
    return (
      <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#f5f0f9',
          border: '1.5px dashed #d4cdc6',
          opacity: 0.72,
        }}
      >
        {/* Área avatar */}
        <div
          className="flex flex-col items-center justify-center pt-5 pb-3 relative"
          style={{ background: '#ede6f5' }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center mb-2"
            style={{ background: '#ddd4ea' }}
          >
            <PersonIcon />
          </div>
          {/* Banda rol */}
          <div
            className="w-full py-[4px] text-center mt-1"
            style={{ background: 'rgba(180,160,200,0.35)' }}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#9a9089' }}>
              {label}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-3 pb-4">
          <p className="text-[12px] font-semibold mb-2" style={{ color: '#9a9089' }}>
            Por asignar
          </p>
          <span
            className="inline-block text-[10px] font-semibold px-2 py-[3px] rounded-full"
            style={{
              background: 'rgba(160,53,154,0.07)',
              border: '1px solid rgba(160,53,154,0.22)',
              color: '#A0359A',
            }}
          >
            Pendiente
          </span>
        </div>
      </div>
    )
  }

  // ── Card activa ────────────────────────────────────────────────────────────
  const cargoLabel = miembro.tipo === 'dinamico' ? (miembro.cargo ?? 'Miembro') : label

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ border: '1.5px solid #e0d0ee' }}
    >
      {/* Área avatar — círculo centrado sobre gradiente, igual que placeholder */}
      <div
        className="flex flex-col items-center justify-center pt-5 pb-3 relative"
        style={{ background: 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)' }}
      >
        <div
          className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center mb-2"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
        >
          {miembro.foto ? (
            <Image
              src={miembro.foto}
              alt={miembro.nombre ?? ''}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white font-bold text-[15px] leading-none">
              {miembro.iniciales}
            </span>
          )}
        </div>

        {/* Banda rol */}
        <div
          className="w-full py-[4px] text-center mt-1"
          style={{ background: 'rgba(30,0,64,0.55)' }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.92)' }}>
            {cargoLabel}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-4 pt-3 pb-4">
        <p className="font-bold text-[13px] leading-snug mb-1" style={{ color: '#1e0040' }}>
          {miembro.nombre}
        </p>
        <p className="text-[11px] font-medium mb-2" style={{ color: '#A0359A' }}>
          {miembro.profesion}
        </p>
        {miembro.frase && (
          <p
            className="text-[11px] italic leading-relaxed pl-2"
            style={{ color: '#6a5080', borderLeft: '2px solid #e0d0ee' }}
          >
            "{miembro.frase}"
          </p>
        )}
      </div>
    </div>
  )
}
