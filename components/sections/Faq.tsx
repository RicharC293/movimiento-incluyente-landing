'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function FaqSection() {
  const t = useTranslations('faq')
  const items = t.raw('items') as { q: string; a: string }[]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <p
          className="text-[11px] font-bold uppercase tracking-[2.5px] mb-3"
          style={{ color: '#A0359A' }}
        >
          {t('eyebrow')}
        </p>
        <h2 className="text-[28px] font-extrabold mb-10 leading-tight" style={{ color: '#1e0040' }}>
          {t('title')}
        </h2>

        {/* Acordeón */}
        <div className="space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  border: isOpen ? '1.5px solid #A0359A' : '1.5px solid #e0d0ee',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Pregunta */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  style={{ background: isOpen ? 'rgba(160,53,154,0.04)' : '#fff' }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-[14px] leading-snug"
                    style={{ color: isOpen ? '#A0359A' : '#1e0040' }}
                  >
                    {item.q}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <path
                      d="M3 6l5 5 5-5"
                      stroke={isOpen ? '#A0359A' : '#9a9089'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Respuesta */}
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-[14px] leading-relaxed"
                    style={{ color: '#6a5080', borderTop: '1px solid #e0d0ee' }}
                  >
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
