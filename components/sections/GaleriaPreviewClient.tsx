'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { GaleriaItem } from '@/lib/types'

export default function GaleriaPreviewClient({ items }: { items: GaleriaItem[] }) {
  const [index, setIndex] = useState(-1)

  const slides = items.map((item) => ({
    src: item.url,
    alt: item.descripcion ?? '',
  }))

  return (
    <>
      {/* Grid 3×2 uniforme */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.url}
              alt={item.descripcion ?? `Foto ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Overlay oscuro al hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />

            {/* Descripción al hover (si existe) */}
            {item.descripcion && (
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(0deg, rgba(30,0,64,0.85) 0%, transparent 100%)' }}
              >
                <p className="text-white text-[11px] leading-snug line-clamp-2">
                  {item.descripcion}
                </p>
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
