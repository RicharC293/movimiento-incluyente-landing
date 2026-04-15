import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://incluyente62.org'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general: todo indexable excepto /admin/
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/es/admin/', '/ki/admin/'],
      },
      // Bots de IA — permiso explícito para indexación en modelos de lenguaje
      { userAgent: 'GPTBot',                      allow: '/' },
      { userAgent: 'ChatGPT-User',                allow: '/' },
      { userAgent: 'OAI-SearchBot',               allow: '/' },
      { userAgent: 'PerplexityBot',               allow: '/' },
      { userAgent: 'ClaudeBot',                   allow: '/' },
      { userAgent: 'anthropic-ai',                allow: '/' },
      { userAgent: 'Googlebot-Extended-Crawling', allow: '/' },
      { userAgent: 'CCBot',                       allow: '/' },
      { userAgent: 'cohere-ai',                   allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
