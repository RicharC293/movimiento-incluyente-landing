'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { clientAuth } from '@/lib/firebase-client'
import { signOut } from 'firebase/auth'

const SECTIONS = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/hero', label: 'Hero', icon: '🖼' },
  { href: '/admin/historia', label: 'Historia', icon: '📖' },
  { href: '/admin/principios', label: 'Principios', icon: '★' },
  { href: '/admin/buro', label: 'Buró político', icon: '👥' },
  { href: '/admin/cantones', label: 'Cantones', icon: '📍' },
  { href: '/admin/galeria', label: 'Galería', icon: '🖼' },
  { href: '/admin/documentos', label: 'Documentos', icon: '📄' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // Don't wrap login page
  if (pathname.endsWith('/login')) return <>{children}</>

  async function handleLogout() {
    await signOut(clientAuth)
    document.cookie = '__session=; path=/; max-age=0'
    router.push(`/${locale}/admin/login`)
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f7f3fd' }}>
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 flex flex-col py-6"
        style={{ background: 'linear-gradient(160deg, #3D1066 0%, #1a0033 100%)' }}
      >
        <div className="px-5 mb-8">
          <p className="text-white font-bold text-sm tracking-wide">INCLUYENTE</p>
          <p className="text-white/40 text-[10px] tracking-widest uppercase">Admin</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {SECTIONS.map((s) => {
            const href = `/${locale}${s.href}`
            const active = pathname === href || (s.href !== '/admin' && pathname.startsWith(`/${locale}${s.href}`))
            return (
              <Link
                key={s.href}
                href={href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                }}
              >
                <span>{s.icon}</span>
                {s.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent' }}
          >
            <span>↩</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
