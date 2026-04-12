import { NextRequest, NextResponse } from 'next/server'

import { createSessionToken, setSessionCookie, verifyPassword } from '@/lib/auth'
import prisma, { hasPrismaClient } from '@/lib/prisma'
import { loginRateLimit, sanitizeText } from '@/lib/security'
import { loginSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  const ip =
    request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const rateLimit = await loginRateLimit(ip)

  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, error: 'Too many login attempts. Please try again later.' },
      { status: 429 }
    )
  }

  const body = await request.json()
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid login payload.' },
      { status: 400 }
    )
  }

  const username = sanitizeText(result.data.username)
  const password = result.data.password

  let admin = null

  if (hasPrismaClient()) {
    try {
      admin = await (prisma as any).admin.findUnique({
        where: { username },
      })
    } catch {
      admin = null
    }
  }

  const fallbackUsername = process.env.ADMIN_USERNAME || 'admin'
  const fallbackEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const fallbackHash =
    process.env.ADMIN_PASSWORD_HASH ||
    '$2a$12$I28mmwapYRLepyyNFZrVIe.FZ54t0onrx/Rpy0n3PmTWEPY6bTVEK'

  const user = admin || {
    id: 'local-admin',
    username: fallbackUsername,
    email: fallbackEmail,
    password: fallbackHash,
  }

  if (username !== user.username) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials.' },
      { status: 401 }
    )
  }

  const passwordIsValid = await verifyPassword(password, String(user.password))

  const canUseDevFallback =
    process.env.NODE_ENV !== 'production' &&
    username === fallbackUsername &&
    (await verifyPassword(password, fallbackHash))

  if (!passwordIsValid && !canUseDevFallback) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials.' },
      { status: 401 }
    )
  }

  const token = createSessionToken({
    id: String(canUseDevFallback ? 'local-admin' : user.id),
    username: String(canUseDevFallback ? fallbackUsername : user.username),
    email: String(canUseDevFallback ? fallbackEmail : user.email),
  })

  await setSessionCookie(token)

  return NextResponse.json({
    success: true,
    user: {
      id: String(canUseDevFallback ? 'local-admin' : user.id),
      username: String(canUseDevFallback ? fallbackUsername : user.username),
      email: String(canUseDevFallback ? fallbackEmail : user.email),
    },
  })
}
