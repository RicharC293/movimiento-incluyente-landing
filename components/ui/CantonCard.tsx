import type { Canton } from '@/lib/types'
import Image from 'next/image'

export default function CantonCard({ canton }: { canton: Canton }) {
  const coord = canton.coordinador!

  return (
    <div
      className="rounded-xl overflow-hidden bg-white"
      style={{ border: '1px solid #e0d0ee' }}
    >
      {/* Stripe superior */}
      <div
        className="h-[5px]"
        style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
      />

      {/* Layout horizontal */}
      <div className="flex items-start gap-3 p-4">
        {/* Foto circular */}
        <div
          className="shrink-0 w-[54px] h-[54px] rounded-full overflow-hidden flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)' }}
        >
          {coord.foto ? (
            <Image
              src={coord.foto}
              alt={coord.nombre}
              width={54}
              height={54}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white font-bold text-lg">{coord.iniciales}</span>
          )}
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#A0359A' }}>
            {canton.nombre}
          </p>
          <p className="font-bold text-sm leading-snug mt-0.5" style={{ color: '#1e0040' }}>
            {coord.nombre}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#A0359A' }}>
            {coord.profesion}
          </p>
          {coord.frase && (
            <p
              className="text-xs italic mt-2 pl-2 leading-relaxed"
              style={{ color: '#6a5080', borderLeft: '2px solid #e0d0ee' }}
            >
              "{coord.frase}"
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
