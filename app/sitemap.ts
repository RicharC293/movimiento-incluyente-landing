import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://incluyente62.org'
const locales  = ['es', 'ki'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '',                  changeFrequency: 'daily',   priority: 1.0 },
    { path: '/galeria',          changeFrequency: 'weekly',  priority: 0.8 },
    { path: '/regimen-organico', changeFrequency: 'monthly', priority: 0.6 },
  ]

  return locales.flatMap((locale) =>
    pages.map(({ path, changeFrequency, priority }) => ({
      url:          `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  )
}
