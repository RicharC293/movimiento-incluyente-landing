import Link from 'next/link'

const CARDS = [
  { href: 'hero', label: 'Hero', desc: 'Lema, sublemas e imagen de fondo', icon: '🖼' },
  { href: 'historia', label: 'Historia', desc: 'Texto e imagen de la sección Historia', icon: '📖' },
  { href: 'principios', label: 'Principios', desc: 'Valores del movimiento', icon: '★' },
  { href: 'buro', label: 'Buró político', desc: 'Miembros del equipo directivo', icon: '👥' },
  { href: 'cantones', label: 'Cantones', desc: 'Coordinadores cantonales', icon: '📍' },
  { href: 'galeria', label: 'Galería', desc: 'Imágenes de eventos', icon: '🖼' },
  { href: 'documentos', label: 'Documentos', desc: 'Régimen orgánico y otros PDFs', icon: '📄' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e0040' }}>Dashboard</h1>
      <p className="text-sm mb-8" style={{ color: '#6a5080' }}>
        Selecciona una sección para editar el contenido del sitio.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-xl p-5 bg-white transition-shadow hover:shadow-md"
            style={{ border: '1px solid #e0d0ee' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#1e0040' }}>{c.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6a5080' }}>{c.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
