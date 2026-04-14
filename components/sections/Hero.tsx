import type { Hero } from '@/lib/types'
import Image from 'next/image'

export default function HeroSection({ hero, bgUrl }: { hero: Hero | null; bgUrl?: string }) {
  const lema = hero?.lema ?? 'Trabajamos por nuestra gente'
  const sublemas = hero?.sublemas ?? ['Trabajo', 'Honradez', 'Igualdad']
  const cta = hero?.cta ?? 'Conoce el movimiento'

  return (
    <section className="relative min-h-[520px] flex items-center">
      {/* Background */}
      {bgUrl ? (
        <Image src={bgUrl} alt="Hero background" fill className="object-cover" priority sizes="100vw" />
      ) : null}

      {/* Overlay gradiente — siempre presente */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: bgUrl
            ? 'linear-gradient(135deg, rgba(160,53,154,0.82) 0%, rgba(61,16,102,0.92) 100%)'
            : 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="max-w-2xl">
          {/* Badge 62 */}
          <div
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-bold text-lg mb-5"
            style={{ border: '2px solid rgba(255,255,255,0.4)' }}
          >
            62
          </div>

          {/* Eyebrow */}
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3 font-medium"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Frente Político Provincial · Cotopaxi
          </p>

          {/* H1 */}
          <h1
            className="text-[42px] font-extrabold leading-tight mb-4"
            style={{ color: '#ffffff', letterSpacing: '-1px' }}
          >
            Movimiento<br />Incluyente
          </h1>

          {/* Lema */}
          <p
            className="text-[17px] italic pl-3 mb-5"
            style={{
              color: 'rgba(255,255,255,0.92)',
              borderLeft: '3px solid rgba(255,255,255,0.4)',
            }}
          >
            "{lema}"
          </p>

          {/* Sublemas */}
          <div className="flex items-center gap-0 mb-8">
            {sublemas.map((s, i) => (
              <span key={i} className="flex items-center">
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {s}
                </span>
                {i < sublemas.length - 1 && (
                  <span
                    className="mx-3 h-4 w-px"
                    style={{ background: 'rgba(255,255,255,0.3)', display: 'inline-block' }}
                  />
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#historia"
            className="inline-block px-6 py-3 rounded-md font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              background: '#ffffff',
              color: '#3D1066',
            }}
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  )
}
