import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes (except login)
  const adminPattern = /^\/(es|ki)\/admin(\/(?!login).*)?$/
  if (adminPattern.test(pathname)) {
    const sessionCookie = request.cookies.get('__session')
    if (!sessionCookie?.value) {
      const locale = pathname.split('/')[1] ?? 'es'
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
