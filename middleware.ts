import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import {
  PUBLIC_ADMIN_BASE_PATH,
  PUBLIC_ADMIN_DASHBOARD_PATH,
  PUBLIC_ADMIN_LOGIN_PATH,
} from '@/lib/admin-route'
import { getAuthCookieName } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLegacyAdminPage = pathname === '/admin' || pathname.startsWith('/admin/')
  const isPublicAdminPage =
    pathname === PUBLIC_ADMIN_BASE_PATH ||
    pathname.startsWith(`${PUBLIC_ADMIN_BASE_PATH}/`)
  const isAdminPage = isLegacyAdminPage || isPublicAdminPage
  const isAdminLogin = pathname === PUBLIC_ADMIN_LOGIN_PATH
  const isProtectedApi =
    pathname.startsWith('/api/admin') || pathname.startsWith('/api/upload')

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next()
  }

  if (isLegacyAdminPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const token = request.cookies.get(getAuthCookieName())?.value
  const isAuthenticated = Boolean(token)

  if (isAdminLogin && isAuthenticated) {
    return NextResponse.redirect(new URL(PUBLIC_ADMIN_DASHBOARD_PATH, request.url))
  }

  if ((isAdminPage && !isAdminLogin) || isProtectedApi) {
    if (!isAuthenticated) {
      if (isProtectedApi) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const loginUrl = new URL(PUBLIC_ADMIN_LOGIN_PATH, request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (isPublicAdminPage) {
    const internalPath = pathname.replace(PUBLIC_ADMIN_BASE_PATH, '/admin') || '/admin'
    return NextResponse.rewrite(new URL(internalPath, request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/admin/:path*', '/YOMAMA/:path*', '/api/admin/:path*', '/api/upload/:path*'],
}
