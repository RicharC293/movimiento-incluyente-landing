import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { siteGraphSchema, siteUrl } from '@/lib/seo'
import '../globals.css'
import { Analytics } from "@vercel/analytics/next"

// ── Textos por idioma ──────────────────────────────────────────────────────
const META = {
  es: {
    title:       'Movimiento Incluyente — Lista 62 · Frente Político Provincial · Cotopaxi',
    description: 'Movimiento Incluyente, Frente Político Provincial Lista 62 de Cotopaxi, Ecuador. Trabajo, Honradez e Igualdad para todos los cotopaxenses.',
    ogLocale:    'es_EC',
  },
  ki: {
    title:       'Movimiento Incluyente — Lista 62 · Cotopaxi llaktapi kawsay',
    description: 'Movimiento Incluyente, Cotopaxi llaktapi kawsay. Lista 62 — Ruranakuy, Allichay, Tukuykunapaj.',
    ogLocale:    'qu_EC',
  },
}

// ── Metadata dinámica por locale ───────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const m = META[locale as 'es' | 'ki'] ?? META.es

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default:  m.title,
      template: `%s | Movimiento Incluyente`,
    },
    description: m.description,

    // ── Canonical + hreflang ──
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'es':        `${siteUrl}/es`,
        'qu':        `${siteUrl}/ki`,
        'x-default': `${siteUrl}/es`,
      },
    },

    // ── Open Graph ──
    openGraph: {
      title:       m.title,
      description: m.description,
      url:         `${siteUrl}/${locale}`,
      siteName:    'Movimiento Incluyente',
      locale:      m.ogLocale,
      type:        'website',
      images: [
        {
          url:    `${siteUrl}/og-image.png`,
          width:  1200,
          height: 630,
          alt:    'Movimiento Incluyente — Lista 62 · Cotopaxi',
        },
      ],
    },

    // ── Twitter / X Card ──
    twitter: {
      card:        'summary_large_image',
      title:       m.title,
      description: m.description,
      images:      [`${siteUrl}/og-image.png`],
    },

    // ── Robots ──
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        'max-image-preview': 'large',
        'max-snippet':       -1,
      },
    },

    // ── Favicon / Icons ──
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
      ],
      shortcut:  '/favicon.ico',
      apple:     '/favicon.ico',
    },

    // ── PWA / Web App ──
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable:           true,
      statusBarStyle:    'black-translucent',
      title:             'Incluyente 62',
    },
    formatDetection: {
      telephone: false,
    },

    // ── Keywords — incluye todas las variantes de búsqueda objetivo ──
    keywords: [
      'Movimiento Incluyente',
      'Movimiento Incluyente Cotopaxi',
      'Movimiento Incluyente Latacunga',
      'Lista 62',
      'Lista 62 Cotopaxi',
      'Frente Político Provincial Cotopaxi',
      'partido político Cotopaxi',
      'política Latacunga',
      'elecciones Cotopaxi',
      'Ecuador',
    ],
  }
}

// ── Layout ─────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'ki')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale === 'ki' ? 'qu' : 'es'}>
      <head>
        {/* theme-color — controla la barra superior/inferior en Safari iOS y Chrome Android */}
        <meta name="theme-color" content="#A0359A" />
        <meta name="msapplication-navbutton-color" content="#A0359A" />
        {/* Organization + WebSite en @graph — base para el Knowledge Panel de Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      <Analytics />
    </html>
  )
}
