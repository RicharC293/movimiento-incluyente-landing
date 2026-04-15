import { useLocale, useTranslations } from 'next-intl'

export default function PreviewsSection() {
  const locale = useLocale()
  const t = useTranslations('previews')

  return (
    <section id="documentos" className="py-16" style={{ background: '#f7f3fd' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <p
          className="text-[11px] font-bold uppercase tracking-[2.5px] mb-3"
          style={{ color: '#A0359A' }}
        >
          {t('eyebrow')}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[28px] font-extrabold mb-2 leading-tight" style={{ color: '#1e0040' }}>
              {t('title')}
            </h2>
            <p className="text-[15px] max-w-xl" style={{ color: '#6a5080', lineHeight: '1.6' }}>
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* ── Card Régimen Orgánico ─────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #e0d0ee', background: '#fff' }}
        >
          <div className="flex flex-col md:flex-row">

            {/* Franja izquierda con ícono */}
            <div
              className="flex items-center justify-center px-8 py-8 md:py-0 shrink-0 md:w-[180px]"
              style={{ background: 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)' }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="3" width="16" height="22" rx="2.5" stroke="white" strokeWidth="1.8" />
                  <line x1="10" y1="9"  x2="18" y2="9"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="13" x2="18" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="17" x2="15" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="6" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" />
                  <line x1="24" y1="21.5" x2="24" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="24" cy="26.5" r="0.75" fill="white" />
                </svg>
              </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-7 py-7 flex-1">
              <div className="max-w-xl">
                {/* Badge */}
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-[3px] rounded-full mb-3"
                  style={{
                    background: 'rgba(160,53,154,0.08)',
                    border: '1px solid rgba(160,53,154,0.2)',
                    color: '#A0359A',
                  }}
                >
                  {t('regimenBadge')}
                </span>
                <h3 className="text-[18px] font-extrabold mb-2 leading-snug" style={{ color: '#1e0040' }}>
                  {t('regimenTitulo')}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#6a5080' }}>
                  {t('regimenDesc')}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`/${locale}/regimen-organico`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('regimenBtn')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
