import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'

const AUTH_COOKIE_NAME = 'portfolio_admin'

function getJwtSecret() {
  const secret = process.env.JWT_SECRET

  if (secret) return secret

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production.')
  }

  return 'dev-secret-change-me'
}

export type SessionUser = {
  id: string
  username: string
  email: string
}

type TokenPayload = SessionUser

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export function createSessionToken(user: SessionUser) {
  return jwt.sign(user, getJwtSecret(), {
    expiresIn: '7d',
  })
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as TokenPayload
}

export async function setSessionCookie(token: string) {
  const store = await cookies()
  store.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    priority: 'high',
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(AUTH_COOKIE_NAME)
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME
}

export async function getCurrentUser(req: NextRequest): Promise<SessionUser | null> {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

  if (!token) return null

  try {
    const payload = verifySessionToken(token)

    const admin =
      prisma && 'admin' in prisma
        ? await (prisma as any).admin.findUnique({
            where: { id: payload.id },
          })
        : null

    if (admin) {
      return {
        id: String(admin.id),
        username: String(admin.username),
        email: String(admin.email),
      }
    }

    return payload
  } catch {
    return null
  }
}

export async function getCurrentUserFromCookies(): Promise<SessionUser | null> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE_NAME)?.value

  if (!token) return null

  try {
    return verifySessionToken(token)
  } catch {
    return null
  }
}
