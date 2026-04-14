'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

const NAV_LINKS = [
  { key: 'historia', href: '#historia' },
  { key: 'principios', href: '#principios' },
  { key: 'buro', href: '#buro' },
  { key: 'cantones', href: '#cantones' },
  { key: 'documentos', href: '#documentos' },
  { key: 'galeria', href: '#galeria' },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 h-[60px] flex items-center"
      style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <img src="https://firebasestorage.googleapis.com/v0/b/movimiento-incluyente-landing.firebasestorage.app/o/galeria%2Fincluyente_logo.webp?alt=media&token=b9ad72b3-98ec-4455-82b0-df1371596d44" alt="Movimiento Incluyente" className="h-12 w-auto" />
        
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        {/* Lista 62 badge */}
        <div
          className="hidden md:flex items-center px-3 py-1 rounded text-white text-sm font-semibold"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          Lista 62
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-[60px] left-0 right-0 md:hidden z-50 py-3 shadow-lg"
          style={{ background: 'linear-gradient(180deg, #3D1066 0%, #1a0033 100%)' }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              {t(l.key)}
            </a>
          ))}
          <div className="mx-6 mt-2 pt-2 border-t border-white/10">
            <span className="text-white/50 text-xs">Lista 62</span>
          </div>
        </div>
      )}
    </nav>
  )
}
