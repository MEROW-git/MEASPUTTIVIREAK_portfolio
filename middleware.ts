import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getAuthCookieName } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'
  const isProtectedApi =
    pathname.startsWith('/api/admin') || pathname.startsWith('/api/upload')

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next()
  }

  const token = request.cookies.get(getAuthCookieName())?.value
  const isAuthenticated = Boolean(token)

  if (isAdminLogin && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/journal', request.url))
  }

  if ((isAdminPage && !isAdminLogin) || isProtectedApi) {
    if (!isAuthenticated) {
      if (isProtectedApi) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/upload/:path*'],
}
