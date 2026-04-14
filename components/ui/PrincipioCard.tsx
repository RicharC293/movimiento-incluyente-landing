import type { Principio } from '@/lib/types'

function IconInclusion() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="#A0359A" strokeWidth="1.8" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#A0359A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="6" x2="21" y2="6" stroke="#A0359A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19" y1="4" x2="19" y2="8" stroke="#A0359A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconHonradez() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#A0359A" strokeWidth="1.8" />
      <line x1="12" y1="7" x2="12" y2="13" stroke="#A0359A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#A0359A" />
    </svg>
  )
}

function IconTrabajo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="18" height="11" rx="2" stroke="#A0359A" strokeWidth="1.8" />
      <path d="M8 10V8a4 4 0 018 0v2" stroke="#A0359A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="14" x2="12" y2="17" stroke="#A0359A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconDefault() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="#A0359A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PrincipioIcon({ icono }: { icono: string }) {
  switch (icono) {
    case 'inclusion': return <IconInclusion />
    case 'honradez': return <IconHonradez />
    case 'trabajo': return <IconTrabajo />
    default: return <IconDefault />
  }
}

export default function PrincipioCard({ principio }: { principio: Principio }) {
  return (
    <div
      className="rounded-2xl bg-white p-6 flex flex-col gap-4"
      style={{
        border: '1px solid #e0d0ee',
        borderTop: '3px solid #A0359A',
      }}
    >
      {/* Ícono en cuadrado lavanda */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: '#f3eafc' }}
      >
        <PrincipioIcon icono={principio.icono} />
      </div>

      {/* Texto */}
      <div>
        <p className="font-bold text-lg leading-snug mb-2" style={{ color: '#1e0040' }}>
          {principio.titulo}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#6a5080' }}>
          {principio.descripcion}
        </p>
      </div>
    </div>
  )
}
