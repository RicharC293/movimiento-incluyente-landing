import { useTranslations, useLocale } from 'next-intl'

const NAV_LINKS = ['historia', 'principios', 'buro', 'cantones', 'documentos', 'galeria']

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer
      className="pt-12 pb-6"
      style={{ background: 'linear-gradient(135deg, #3D1066 0%, #1a0033 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-xl tracking-wide mb-1">INCLUYENTE</p>
            <p className="text-white/45 text-xs tracking-widest uppercase mb-3">
              Frente Político Provincial
            </p>
            <p className="text-white/65 italic text-sm mb-4">"Trabajamos por nuestra gente"</p>
            <span
              className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{
                background: 'rgba(160,53,154,0.35)',
                border: '1px solid rgba(160,53,154,0.5)',
              }}
            >
              Lista 62
            </span>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-white/35 text-xs uppercase tracking-widest mb-4">{t('footer.nav')}</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentos + puntos decorativos */}
          <div className="flex justify-between">
            <div>
              <p className="text-white/35 text-xs uppercase tracking-widest mb-4">{t('footer.docs')}</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${locale}/regimen-organico`}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    Régimen Orgánico
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/galeria`}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    Galería
                  </a>
                </li>
              </ul>
            </div>

            {/* 7 puntos decorativos */}
            <div className="flex flex-col items-center gap-[7px] mt-1 mr-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[7px] h-[7px] rounded-full bg-white/65" />
              ))}
              <div
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: 'rgba(160,53,154,0.5)' }}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
