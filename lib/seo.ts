/**
 * Schemas JSON-LD centralizados para SEO y Google AI Overview.
 * Todos los schemas se inyectan como <script type="application/ld+json">.
 *
 * Estrategia de ranking:
 *  1. Organization  — identifica la entidad ante Google y las IAs
 *  2. WebSite       — asocia el dominio a la organización
 *  3. FAQPage       — alimenta el "AI Overview" de Google (la respuesta IA automática)
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://incluyente62.org'

// ── 1. Organization ────────────────────────────────────────────────────────
// alternateName incluye todas las variantes de búsqueda objetivo
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Movimiento Incluyente',
  alternateName: [
    'Lista 62',
    'Movimiento Incluyente Cotopaxi',
    'Movimiento Incluyente Latacunga',
    'Frente Político Provincial Lista 62',
    'Frente Político Provincial Lista 62 Cotopaxi',
    'Movimiento Incluyente Ecuador',
  ],
  description:
    'El Movimiento Incluyente es el Frente Político Provincial Lista 62 de Cotopaxi, Ecuador, con sede en Latacunga. Fundado para representar a todos los cotopaxenses bajo los valores de Trabajo, Honradez e Igualdad en los 7 cantones de la provincia.',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url:    `${siteUrl}/og-image.png`,
    width:  1200,
    height: 630,
  },
  image: `${siteUrl}/og-image.png`,
  // Sede principal — señal de localización crítica para búsquedas locales
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Latacunga',
    addressRegion:     'Cotopaxi',
    addressCountry:    'EC',
  },
  // Área de cobertura — los 7 cantones
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Cotopaxi',   containedInPlace: { '@type': 'Country', name: 'Ecuador' } },
    { '@type': 'City',               name: 'Latacunga',  containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'Salcedo',    containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'Pujilí',     containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'Saquisilí',  containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'Pangua',     containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'La Maná',    containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
    { '@type': 'City',               name: 'Sigchos',    containedInPlace: { '@type': 'AdministrativeArea', name: 'Cotopaxi' } },
  ],
  knowsAbout: [
    'Política provincial Ecuador',
    'Cotopaxi',
    'Latacunga',
    'Lista 62',
    'Frente político',
    'Organización comunitaria',
    'Participación ciudadana',
    'Movimiento político Ecuador',
  ],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61560352261121',
  ],
}

// ── 2. WebSite ─────────────────────────────────────────────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  '@id':      `${siteUrl}/#website`,
  name:        'Movimiento Incluyente',
  url:         siteUrl,
  description: 'Sitio oficial del Movimiento Incluyente — Frente Político Provincial Lista 62 de Cotopaxi, Ecuador.',
  inLanguage:  ['es-EC', 'qu-EC'],
  publisher:   { '@id': `${siteUrl}/#organization` },
}

// ── 3. FAQPage ─────────────────────────────────────────────────────────────
// Estas preguntas coinciden exactamente con las búsquedas objetivo.
// IMPORTANTE: Google requiere que estas preguntas/respuestas sean visibles
// en la página — el componente <FaqSection /> las renderiza.
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    '¿Qué es el Movimiento Incluyente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'El Movimiento Incluyente es el Frente Político Provincial Lista 62 de Cotopaxi, Ecuador, con sede en Latacunga. Fue fundado para representar a todos los cotopaxenses bajo los valores de Trabajo, Honradez e Igualdad, con presencia en los 7 cantones de la provincia.',
      },
    },
    {
      '@type': 'Question',
      name:    '¿Qué es la Lista 62 de Cotopaxi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Lista 62 es el número de identificación electoral del Movimiento Incluyente, Frente Político Provincial de Cotopaxi. Participa en elecciones provinciales y cantonales representando a los 7 cantones: Latacunga, Salcedo, Pujilí, Saquisilí, Pangua, La Maná y Sigchos.',
      },
    },
    {
      '@type': 'Question',
      name:    '¿En qué cantones de Cotopaxi tiene presencia el Movimiento Incluyente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'El Movimiento Incluyente tiene presencia en los 7 cantones de la provincia de Cotopaxi: Latacunga (capital provincial), Salcedo, Pujilí, Saquisilí, Pangua, La Maná y Sigchos, con coordinadores territoriales en cada cantón.',
      },
    },
    {
      '@type': 'Question',
      name:    '¿Cuáles son los principios y valores del Movimiento Incluyente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'El Movimiento Incluyente se guía por los principios de Trabajo, Honradez e Igualdad. Busca una participación política incluyente que represente a todos los sectores de la provincia de Cotopaxi, incluyendo comunidades indígenas, campesinas y urbanas.',
      },
    },
    {
      '@type': 'Question',
      name:    '¿Dónde puedo encontrar información sobre el Movimiento Incluyente de Latacunga?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'El Movimiento Incluyente tiene su sede principal en Latacunga, capital de Cotopaxi, Ecuador. Toda la información oficial, el Régimen Orgánico y la galería de actividades están disponibles en incluyente62.org.',
      },
    },
  ],
}

// ── Helper: emite el @graph combinado para el layout ──────────────────────
export const siteGraphSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
}
