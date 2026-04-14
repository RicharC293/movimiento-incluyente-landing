import type { Principio } from '@/lib/types'
import PrincipioCard from '@/components/ui/PrincipioCard'

export default function PrincipiosSection({ principios }: { principios: Principio[] }) {
  if (!principios.length) return null

  return (
    <section id="principios" className="py-16" style={{ background: '#f7f3fd' }}>
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2 text-center"
          style={{ color: '#A0359A' }}
        >
          Nuestros principios
        </p>
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#1e0040' }}>
          Los valores que nos guían
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principios.map((p) => (
            <PrincipioCard key={p.id} principio={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
