import { NextResponse } from 'next/server'

import { PUBLIC_ADMIN_LOGIN_PATH } from '@/lib/admin-route'
import { clearSessionCookie } from '@/lib/auth'

export async function POST() {
  await clearSessionCookie()

  return NextResponse.redirect(
    new URL(
      PUBLIC_ADMIN_LOGIN_PATH,
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    )
  )
}
