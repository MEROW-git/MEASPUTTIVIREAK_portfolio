import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { createJournalPost, getAllJournalPosts } from '@/lib/journal'
import { journalSchema } from '@/lib/validators'

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await getAllJournalPosts()
  return NextResponse.json({ success: true, posts })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const result = journalSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid journal payload.' },
      { status: 400 }
    )
  }

  const post = await createJournalPost(result.data)
  return NextResponse.json({ success: true, post }, { status: 201 })
}
