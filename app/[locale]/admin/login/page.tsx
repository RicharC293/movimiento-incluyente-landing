'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { clientAuth } from '@/lib/firebase-client'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const locale = useLocale()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(clientAuth, email, password)
      const token = await cred.user.getIdToken()
      // Set session cookie (30 days)
      document.cookie = `__session=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`
      router.push(`/${locale}/admin`)
    } catch {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #A0359A 0%, #3D1066 100%)' }}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-bold text-xl tracking-wide" style={{ color: '#1e0040' }}>INCLUYENTE</p>
          <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#6a5080' }}>
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2"
              style={{
                border: '1px solid #e0d0ee',
                color: '#1e0040',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ['--tw-ring-color' as any]: '#A0359A',
              }}
              placeholder="admin@movimientoincluyente.ec"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#1e0040' }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2"
              style={{ border: '1px solid #e0d0ee', color: '#1e0040' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(90deg, #A0359A 0%, #3D1066 100%)' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
