import type { Metadata } from 'next'
import { db } from '@/lib/firebase-admin'
import type { GaleriaItem } from '@/lib/types'
import LangStrip from '@/components/layout/LangStrip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GaleriaClient from './GaleriaClient'

export const revalidate = 60

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://incluyente62.org'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'
  const title       = isEs ? 'Galería de fotos' : 'Riksichiy galería'
  const description = isEs
    ? 'Imágenes de las actividades, eventos y momentos del Movimiento Incluyente en la provincia de Cotopaxi, Ecuador.'
    : 'Movimiento Incluyentej ruraykunata Cotopaxi llaktapi rikuy.'
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/galeria` },
    openGraph: { title, description, url: `${siteUrl}/${locale}/galeria`, type: 'website' },
  }
}

async function getGaleria(): Promise<GaleriaItem[]> {
  try {
    const snap = await db.collection('galeria').orderBy('orden', 'asc').get()
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      fecha: d.data().fecha?.toDate?.()?.toISOString() ?? '',
    })) as GaleriaItem[]
  } catch {
    return []
  }
}

export default async function GaleriaPage() {
  const items = await getGaleria()

  return (
    <>
      <LangStrip />
      <Navbar />
      <main className="min-h-screen py-12" style={{ background: '#f7f3fd' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#A0359A' }}
            >
              Movimiento Incluyente
            </p>
            <h1 className="text-3xl font-bold" style={{ color: '#1e0040' }}>
              Galería
            </h1>
          </div>

          {items.length > 0 ? (
            <GaleriaClient items={items} />
          ) : (
            <div
              className="rounded-xl p-12 text-center bg-white"
              style={{ border: '1px solid #e0d0ee' }}
            >
              <p className="text-lg font-semibold mb-2" style={{ color: '#1e0040' }}>
                Galería en construcción
              </p>
              <p style={{ color: '#6a5080' }}>Las fotos estarán disponibles próximamente.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
