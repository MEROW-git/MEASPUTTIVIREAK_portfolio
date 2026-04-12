import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { maxUploadSize } from '@/lib/security'

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 })
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return NextResponse.json(
      { success: false, error: 'Only JPG, PNG, and WEBP images are allowed.' },
      { status: 400 }
    )
  }

  if (file.size > maxUploadSize) {
    return NextResponse.json(
      { success: false, error: 'Image exceeds upload size limit.' },
      { status: 400 }
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
  const fileName = `${randomUUID()}.${extension}`
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  await mkdir(uploadsDir, { recursive: true })
  await writeFile(path.join(uploadsDir, fileName), buffer)

  return NextResponse.json({
    success: true,
    url: `/uploads/${fileName}`,
  })
}
