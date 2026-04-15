import { getTranslations, getLocale } from 'next-intl/server'
import type { GaleriaItem } from '@/lib/types'
import GaleriaPreviewClient from './GaleriaPreviewClient'

export default async function GaleriaPreview({ items }: { items: GaleriaItem[] }) {
  const t = await getTranslations('galeriaPreview')
  const locale = await getLocale()

  return (
    <section id="galeria" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <p
          className="text-[11px] font-bold uppercase tracking-[2.5px] mb-3"
          style={{ color: '#A0359A' }}
        >
          {t('eyebrow')}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold mb-2 leading-tight" style={{ color: '#1e0040' }}>
              {t('title')}
            </h2>
            <p className="text-[15px] max-w-xl" style={{ color: '#6a5080', lineHeight: '1.6' }}>
              {t('subtitle')}
            </p>
          </div>
          {/* Botón "Ver galería completa" — solo si hay fotos */}
          {items.length > 0 && (
            <a
              href={`/${locale}/galeria`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ border: '1.5px solid #A0359A', color: '#A0359A' }}
            >
              {t('verGaleria')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="#A0359A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Contenido */}
        {items.length === 0 ? (
          <div
            className="rounded-2xl p-14 text-center"
            style={{ background: '#f7f3fd', border: '1px solid #e0d0ee' }}
          >
            {/* Ícono cámara */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#ede6f5' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="2" y="7" width="22" height="16" rx="2.5" stroke="#b0a0c8" strokeWidth="1.6" />
                <circle cx="13" cy="15" r="4" stroke="#b0a0c8" strokeWidth="1.6" />
                <path d="M9 7l1.5-3h5L17 7" stroke="#b0a0c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-semibold text-base mb-1" style={{ color: '#1e0040' }}>
              {t('proximamente')}
            </p>
            <p className="text-sm" style={{ color: '#6a5080' }}>
              {t('proximamenteDesc')}
            </p>
          </div>
        ) : (
          <GaleriaPreviewClient items={items} />
        )}
      </div>
    </section>
  )
}
