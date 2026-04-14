import type { Historia } from '@/lib/types'
import Image from 'next/image'

export default function HistoriaSection({ historia }: { historia: Historia | null }) {
  if (!historia) return null

  return (
    <section id="historia" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#A0359A' }}
            >
              Nuestra historia
            </p>
            <h2 className="text-3xl font-bold mb-5" style={{ color: '#1e0040' }}>
              {historia.titulo}
            </h2>
            <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#6a5080' }}>
              {historia.texto}
            </p>
          </div>

          {/* Imagen */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
            {historia.imagen ? (
              <Image
                src={historia.imagen}
                alt={historia.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
