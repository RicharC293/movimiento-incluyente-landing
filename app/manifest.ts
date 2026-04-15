import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'Movimiento Incluyente — Lista 62',
    short_name:       'Incluyente 62',
    description:      'Frente Político Provincial Lista 62 · Cotopaxi, Ecuador. Trabajo, Honradez e Igualdad.',
    start_url:        '/es',
    display:          'standalone',
    orientation:      'portrait',
    background_color: '#3D1066',
    theme_color:      '#A0359A',
    lang:             'es-EC',
    icons: [
      {
        src:     '/favicon.ico',
        sizes:   '48x48',
        type:    'image/x-icon',
      },
      {
        src:     '/og-image.png',
        sizes:   '1200x630',
        type:    'image/png',
        purpose: 'any',
      },
    ],
  }
}
