'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LangStrip() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
    localStorage.setItem('locale', next)
  }

  return (
    <div style={{ background: '#3D1066' }} className="w-full py-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-end gap-2">
        {(['es', 'ki'] as const).map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={`text-xs px-3 py-0.5 rounded transition-colors ${
              locale === l
                ? 'text-white font-semibold'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {l === 'es' ? 'Español' : 'Kichwa'}
          </button>
        ))}
      </div>
    </div>
  )
}
