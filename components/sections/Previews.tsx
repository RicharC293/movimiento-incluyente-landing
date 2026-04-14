import { useLocale, useTranslations } from 'next-intl'

export default function PreviewsSection() {
  const locale = useLocale()
  const t = useTranslations('previews')

  const cards = [
    {
      title: t('regimenTitulo'),
      desc: t('regimenDesc'),
      btn: t('regimenBtn'),
      href: `/${locale}/regimen-organico`,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="white" strokeWidth="1.8" />
          <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="16" x2="13" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="21" cy="21" r="5" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" />
          <line x1="21" y1="19" x2="21" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="21" cy="23" r="0.5" fill="white" />
        </svg>
      ),
    },
    {
      title: t('galeriaTitulo'),
      desc: t('galeriaDesc'),
      btn: t('galeriaBtn'),
      href: `/${locale}/galeria`,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="5" width="22" height="18" rx="2" stroke="white" strokeWidth="1.8" />
          <circle cx="9" cy="11" r="2.5" stroke="white" strokeWidth="1.5" />
          <path d="M3 19l6-5 5 4 3-3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <section id="documentos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.href}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #e0d0ee' }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
              >
                {card.icon}
                <h3 className="text-white font-bold text-lg">{card.title}</h3>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm mb-5" style={{ color: '#6a5080' }}>
                  {card.desc}
                </p>
                <a
                  href={card.href}
                  className="inline-block px-4 py-2 rounded-md text-sm font-semibold transition-colors hover:opacity-80"
                  style={{
                    border: '1.5px solid #A0359A',
                    color: '#A0359A',
                  }}
                >
                  {card.btn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
