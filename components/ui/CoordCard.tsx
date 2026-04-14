import type { BuroMember } from '@/lib/types'
import Image from 'next/image'

const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="8" r="4" stroke="#b0a898" strokeWidth="1.5" />
    <path d="M3 20c0-4.5 3.5-7 8-7s8 2.5 8 7" stroke="#b0a898" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function CoordCard({ miembro }: { miembro: BuroMember | null }) {

  // ── Placeholder ──────────────────────────────────────────────────────────
  if (!miembro) {
    return (
      <div
        className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[160px_1fr] mb-4"
        style={{
          border: '1px dashed #d4cdc6',
          background: '#f5f0f9',
          opacity: 0.7,
        }}
      >
        {/* Foto placeholder */}
        <div
          className="h-28 md:h-auto flex flex-col items-center justify-center gap-2 px-4 py-6"
          style={{ background: '#ede6f5' }}
        >
          <div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
            style={{ background: '#ddd4ea' }}
          >
            <PersonIcon />
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(180,160,200,0.3)', color: '#9a9089' }}
          >
            Coordinador provincial
          </span>
        </div>
        {/* Info placeholder */}
        <div className="px-6 py-5 flex flex-col justify-center">
          <p className="text-sm font-semibold mb-2" style={{ color: '#9a9089' }}>
            Por asignar
          </p>
          <span
            className="inline-block text-[9px] font-semibold px-[8px] py-[2px] rounded-full"
            style={{
              background: 'rgba(160,53,154,0.07)',
              border: '1px solid rgba(160,53,154,0.2)',
              color: '#A0359A',
            }}
          >
            Pendiente
          </span>
        </div>
      </div>
    )
  }

  // ── Card activa ───────────────────────────────────────────────────────────
  return (
    <div
      className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[160px_1fr] mb-4"
      style={{
        border: '1px solid #e0d0ee',
        borderTop: '4px solid #A0359A',
      }}
    >
      {/* Foto / iniciales — círculo centrado, consistente con placeholder */}
      <div
        className="h-36 md:h-auto flex flex-col items-center justify-center gap-3 px-4 py-6"
        style={{ background: 'linear-gradient(160deg, #A0359A 0%, #3D1066 100%)' }}
      >
        <div
          className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center shrink-0"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '2.5px solid rgba(255,255,255,0.38)',
          }}
        >
          {miembro.foto ? (
            <Image
              src={miembro.foto}
              alt={miembro.nombre ?? ''}
              width={72}
              height={72}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white font-bold text-2xl leading-none">
              {miembro.iniciales}
            </span>
          )}
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-wide px-2 py-[3px] rounded-full text-center"
          style={{
            background: 'rgba(255,255,255,0.14)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          Coordinador provincial
        </span>
      </div>

      {/* Info */}
      <div className="bg-white px-6 py-5 flex flex-col justify-center">
        <h3 className="text-[16px] font-extrabold leading-snug mb-[3px]" style={{ color: '#1e0040' }}>
          {miembro.nombre}
        </h3>
        <p className="text-[11px] font-semibold uppercase tracking-wide mb-[10px]" style={{ color: '#A0359A' }}>
          {miembro.profesion}
        </p>
        {miembro.frase && (
          <p
            className="text-[12px] italic leading-[1.6] pl-3"
            style={{ color: '#6a5080', borderLeft: '3px solid #e0d0ee' }}
          >
            "{miembro.frase}"
          </p>
        )}
      </div>
    </div>
  )
}
