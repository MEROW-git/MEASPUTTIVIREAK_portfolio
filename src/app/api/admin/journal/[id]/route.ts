import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { deleteJournalPost, getJournalPostById, updateJournalPost } from '@/lib/journal'
import { journalSchema } from '@/lib/validators'

type JournalRouteContext = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, context: JournalRouteContext) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = context.params
  const post = await getJournalPostById(id)

  if (!post) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, post })
}

export async function PATCH(request: NextRequest, context: JournalRouteContext) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = context.params
  const existing = await getJournalPostById(id)

  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  const body = await request.json()
  const merged = {
    title: body.title ?? existing.title,
    slug: body.slug ?? existing.slug,
    excerpt: body.excerpt ?? existing.excerpt,
    content: body.content ?? existing.content,
    coverImage:
      body.coverImage === undefined ? existing.coverImage : body.coverImage,
    tags: body.tags ?? existing.tags,
    isPublished:
      typeof body.isPublished === 'boolean' ? body.isPublished : existing.isPublished,
  }

  const result = journalSchema.safeParse(merged)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid journal payload.' },
      { status: 400 }
    )
  }

  const post = await updateJournalPost(id, result.data)
  return NextResponse.json({ success: true, post })
}

export async function DELETE(request: NextRequest, context: JournalRouteContext) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = context.params
  await deleteJournalPost(id)
  return NextResponse.json({ success: true })
}
