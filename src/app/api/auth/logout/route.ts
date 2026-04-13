import { NextRequest, NextResponse } from 'next/server'

import { PUBLIC_ADMIN_LOGIN_PATH } from '@/lib/admin-route'
import { clearSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  await clearSessionCookie()

  return NextResponse.redirect(new URL(PUBLIC_ADMIN_LOGIN_PATH, request.url))
}
