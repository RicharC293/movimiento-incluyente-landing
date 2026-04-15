import { db } from '@/lib/firebase-admin'
import type { BuroMember, Canton, Principio, Historia, Hero, GaleriaItem } from '@/lib/types'
import { faqSchema } from '@/lib/seo'
import LangStrip from '@/components/layout/LangStrip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/Hero'
import HistoriaSection from '@/components/sections/Historia'
import PrincipiosSection from '@/components/sections/Principios'
import BuroSection from '@/components/sections/Buro'
import CantonesSection from '@/components/sections/Cantones'
import GaleriaPreview from '@/components/sections/GaleriaPreview'
import PreviewsSection from '@/components/sections/Previews'
import FaqSection from '@/components/sections/Faq'

export const revalidate = 60

async function getData() {
  try {
    const [
      buroSnap,
      cantonesSnap,
      principiosSnap,
      historiaSnap,
      heroSnap,
      heroImgSnap,
      galeriaSnap,
    ] = await Promise.all([
      db.collection('buro').orderBy('orden', 'asc').get(),
      db.collection('cantones').get(),
      db.collection('principios').orderBy('orden', 'asc').get(),
      db.collection('historia').doc('content').get(),
      db.collection('hero').doc('content').get(),
      db.collection('hero').doc('bg').get(),
      db.collection('galeria').where('destacada', '==', true).limit(6).get(),
    ])

    const buro: BuroMember[]      = buroSnap.docs.map((d) => ({ id: d.id, ...d.data() } as BuroMember))
    const cantones: Canton[]      = cantonesSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Canton))
    const principios: Principio[] = principiosSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Principio))
    const historia  = historiaSnap.exists ? (historiaSnap.data() as Historia) : null
    const hero      = heroSnap.exists     ? (heroSnap.data() as Hero)         : null
    const heroBgUrl = heroImgSnap.exists  ? heroImgSnap.data()?.url           : undefined
    const galeria: GaleriaItem[]  = galeriaSnap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      fecha: d.data().fecha?.toDate?.()?.toISOString() ?? '',
    } as GaleriaItem))

    return { buro, cantones, principios, historia, hero, heroBgUrl, galeria }
  } catch {
    return {
      buro:       [],
      cantones:   [],
      principios: [],
      galeria:    [],
      historia:   null,
      hero:       null,
      heroBgUrl:  undefined,
    }
  }
}

export default async function HomePage() {
  const { buro, cantones, principios, historia, hero, heroBgUrl, galeria } = await getData()

  return (
    <>
      {/* FAQPage schema — alimenta el AI Overview de Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* <LangStrip /> */}
      <Navbar />
      <main>
        <HeroSection hero={hero} bgUrl={heroBgUrl} />
        <HistoriaSection historia={historia} />
        <PrincipiosSection principios={principios} />
        <BuroSection members={buro} />
        <CantonesSection cantonesData={cantones} />
        <GaleriaPreview items={galeria} />
        <PreviewsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
