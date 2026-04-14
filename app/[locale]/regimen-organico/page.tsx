import { db } from '@/lib/firebase-admin'
import type { Documento } from '@/lib/types'
import LangStrip from '@/components/layout/LangStrip'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const revalidate = 60

async function getRegimen(): Promise<Documento | null> {
  try {
    const snap = await db
      .collection('documentos')
      .where('tipo', '==', 'regimen-organico')
      .limit(1)
      .get()
    if (snap.empty) return null
    const doc = snap.docs[0]
    return { id: doc.id, ...doc.data() } as Documento
  } catch {
    return null
  }
}

export default async function RegimenPage() {
  const doc = await getRegimen()

  return (
    <>
      <LangStrip />
      <Navbar />
      <main className="min-h-screen py-12" style={{ background: '#f7f3fd' }}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#A0359A' }}
            >
              Documentos oficiales
            </p>
            <h1 className="text-3xl font-bold" style={{ color: '#1e0040' }}>
              Régimen Orgánico
            </h1>
          </div>

          {doc ? (
            <div
              className="rounded-xl overflow-hidden bg-white"
              style={{ border: '1px solid #e0d0ee' }}
            >
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
              >
                <p className="text-white font-semibold">{doc.titulo}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 8l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 13h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Descargar PDF
                </a>
              </div>

              {/* PDF viewer */}
              <iframe
                src={`${doc.url}#toolbar=1`}
                className="w-full"
                style={{ height: '75vh', border: 'none' }}
                title={doc.titulo}
              />
            </div>
          ) : (
            <div
              className="rounded-xl p-12 text-center bg-white"
              style={{ border: '1px solid #e0d0ee' }}
            >
              <p className="text-lg font-semibold mb-2" style={{ color: '#1e0040' }}>
                Documento no disponible
              </p>
              <p style={{ color: '#6a5080' }}>
                El Régimen Orgánico será publicado próximamente.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
