import type { Canton } from '@/lib/types'
import { CANTONES_COTOPAXI } from '@/lib/types'
import CantonCard from '@/components/ui/CantonCard'
import CantonPending from '@/components/ui/CantonPending'

export default function CantonesSection({ cantonesData }: { cantonesData: Canton[] }) {
  // Siempre los 7 cantones fijos, enriquecidos con datos de Firestore
  const cantones = CANTONES_COTOPAXI.map((c) => ({
    ...c,
    coordinador: cantonesData.find((d) => d.id === c.id)?.coordinador ?? null,
  }))

  const activos    = cantones.filter((c) => c.coordinador !== null)
  const pendientes = cantones.filter((c) => c.coordinador === null)

  return (
    <section id="cantones" className="py-16" style={{ background: '#f7f3fd' }}>
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-[11px] font-bold uppercase tracking-[2.5px] mb-3"
          style={{ color: '#A0359A' }}
        >
          Presencia cantonal
        </p>
        <h2 className="text-[28px] font-extrabold mb-3 leading-tight" style={{ color: '#1e0040' }}>
          Coordinaciones de cantón
        </h2>
        <p className="text-[15px] mb-8 max-w-xl" style={{ color: '#6a5080', lineHeight: '1.6' }}>
          El Movimiento Incluyente tiene presencia en los 7 cantones de Cotopaxi. Conoce a quienes lideran el trabajo en cada territorio.
        </p>

        {/* Activos — grid 2 col */}
        {activos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {activos.map((c) => (
              <CantonCard key={c.id} canton={{ id: c.id, nombre: c.nombre, coordinador: c.coordinador }} />
            ))}
          </div>
        )}

        {/* Pendientes — separador + grid 5 col */}
        {pendientes.length > 0 && (
          <>
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px" style={{ background: '#e0d0ee' }} />
              <span
                className="text-[9px] font-semibold tracking-[1px] whitespace-nowrap"
                style={{ color: '#9a9089' }}
              >
                Coordinadores por designar
              </span>
              <div className="flex-1 h-px" style={{ background: '#e0d0ee' }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {pendientes.map((c) => (
                <CantonPending key={c.id} canton={{ id: c.id, nombre: c.nombre }} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
