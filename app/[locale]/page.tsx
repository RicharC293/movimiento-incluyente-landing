import { db } from '@/lib/firebase-admin'
import type { BuroMember, Canton, Principio, Historia, Hero, Documento } from '@/lib/types'
import LangStrip from '@/components/layout/LangStrip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/Hero'
import HistoriaSection from '@/components/sections/Historia'
import PrincipiosSection from '@/components/sections/Principios'
import BuroSection from '@/components/sections/Buro'
import CantonesSection from '@/components/sections/Cantones'
import PreviewsSection from '@/components/sections/Previews'

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
    ] = await Promise.all([
      db.collection('buro').orderBy('orden', 'asc').get(),
      db.collection('cantones').get(),
      db.collection('principios').orderBy('orden', 'asc').get(),
      db.collection('historia').doc('content').get(),
      db.collection('hero').doc('content').get(),
      db.collection('hero').doc('bg').get(),
    ])

    const buro: BuroMember[] = buroSnap.docs.map((d) => ({ id: d.id, ...d.data() } as BuroMember))
    const cantones: Canton[] = cantonesSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Canton))
    const principios: Principio[] = principiosSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Principio))
    const historia = historiaSnap.exists ? (historiaSnap.data() as Historia) : null
    const hero = heroSnap.exists ? (heroSnap.data() as Hero) : null
    const heroBgUrl: string | undefined = heroImgSnap.exists ? heroImgSnap.data()?.url : undefined

    return { buro, cantones, principios, historia, hero, heroBgUrl }
  } catch {
    return {
      buro: [],
      cantones: [],
      principios: [],
      historia: null,
      hero: null,
      heroBgUrl: undefined,
    }
  }
}

export default async function HomePage() {
  const { buro, cantones, principios, historia, hero, heroBgUrl } = await getData()

  return (
    <>
      {/* <LangStrip /> */}
      <Navbar />
      <main>
        <HeroSection hero={hero} bgUrl={heroBgUrl} />
        <HistoriaSection historia={historia} />
        <PrincipiosSection principios={principios} />
        <BuroSection members={buro} />
        <CantonesSection cantonesData={cantones} />
        <PreviewsSection />
      </main>
      <Footer />
    </>
  )
}
