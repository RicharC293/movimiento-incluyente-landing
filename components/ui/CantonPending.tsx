import type { Canton } from '@/lib/types'

export default function CantonPending({ canton }: { canton: Canton }) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col items-center text-center gap-2"
      style={{
        background: '#ece8e4',
        border: '1.5px dashed #d4cdc6',
        opacity: 0.75,
      }}
    >
      {/* Ícono persona */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#d4cdc6' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="6.5" r="3" stroke="#9a9089" strokeWidth="1.5" />
          <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#9a9089" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#9a9089' }}>
        {canton.nombre}
      </p>

      <p className="text-[11px]" style={{ color: '#9a9089' }}>
        Por designar
      </p>

      <span
        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
        style={{
          background: 'rgba(160,53,154,0.07)',
          border: '1px solid rgba(160,53,154,0.2)',
          color: '#A0359A',
        }}
      >
        Próximamente
      </span>
    </div>
  )
}
