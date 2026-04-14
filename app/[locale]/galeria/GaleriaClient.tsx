'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { GaleriaItem } from '@/lib/types'

export default function GaleriaClient({ items }: { items: GaleriaItem[] }) {
  const [index, setIndex] = useState(-1)

  const slides = items.map((item) => ({
    src: item.url,
    alt: item.descripcion ?? '',
  }))

  return (
    <>
      {/* Grid masonry-like con columnas */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
            style={{ border: '1px solid #e0d0ee' }}
            onClick={() => setIndex(i)}
          >
            <div className="relative w-full" style={{ minHeight: '160px' }}>
              <Image
                src={item.url}
                alt={item.descripcion ?? `Foto ${i + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            {item.descripcion && (
              <div className="px-3 py-2 bg-white">
                <p className="text-xs" style={{ color: '#6a5080' }}>{item.descripcion}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  )
}
