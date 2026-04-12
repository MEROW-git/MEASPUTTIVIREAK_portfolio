import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser, hashPassword, verifyPassword } from '@/lib/auth'
import prisma, { hasPrismaClient } from '@/lib/prisma'
import { sanitizeText } from '@/lib/security'
import { changePasswordSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)

  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPrismaClient()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Password changes require a database-backed admin account.',
      },
      { status: 503 }
    )
  }

  const body = await request.json()
  const result = changePasswordSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0]?.message || 'Invalid request.' },
      { status: 400 }
    )
  }

  const username = sanitizeText(user.username)

  try {
    const admin = await (prisma as any).admin.findFirst({
      where: {
        OR: [{ id: user.id }, { username }],
      },
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin account not found.' },
        { status: 404 }
      )
    }

    const currentPasswordIsValid = await verifyPassword(
      result.data.currentPassword,
      String(admin.password)
    )

    if (!currentPasswordIsValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 401 }
      )
    }

    const nextPasswordHash = await hashPassword(result.data.newPassword)

    await (prisma as any).admin.update({
      where: { id: admin.id },
      data: {
        password: nextPasswordHash,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to update password right now.' },
      { status: 500 }
    )
  }
}
