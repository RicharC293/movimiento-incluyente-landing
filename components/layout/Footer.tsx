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

          {/* Documentos + Redes + puntos decorativos */}
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

              {/* Redes sociales */}
              <p className="text-white/35 text-xs uppercase tracking-widest mt-6 mb-3">{t('footer.redes')}</p>
              <a
                href="https://www.facebook.com/profile.php?id=61560352261121"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Facebook
              </a>
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
