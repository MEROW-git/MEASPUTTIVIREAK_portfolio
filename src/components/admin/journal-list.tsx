'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/format'
import { PUBLIC_ADMIN_DASHBOARD_PATH } from '@/lib/admin-route'
import type { JournalPost } from '@/types'

type JournalListProps = {
  posts: JournalPost[]
}

export function JournalList({ posts }: JournalListProps) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<string | null>(null)

  async function updatePost(
    id: string,
    body: Partial<Pick<JournalPost, 'isPublished'>>
  ) {
    setBusyId(id)
    const response = await fetch(`/api/admin/journal/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setBusyId(null)

    if (response.ok) {
      router.refresh()
    }
  }

  async function deletePost(id: string) {
    if (!window.confirm('Delete this journal post?')) return

    setBusyId(id)
    const response = await fetch(`/api/admin/journal/${id}`, {
      method: 'DELETE',
    })
    setBusyId(null)

    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  post.isPublished
                    ? 'bg-emerald-500/15 text-emerald-200'
                    : 'bg-slate-700/70 text-slate-300'
                }`}
              >
                {post.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-sm text-slate-400">/{post.slug}</p>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">{post.excerpt}</p>
            <p className="text-xs text-slate-500">
              Updated {formatDate(post.updatedAt)} • {post.tags.join(', ') || 'No tags'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/journal/${post.slug}`}>
              <Button variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5">
                View
              </Button>
            </Link>
            <Link href={`${PUBLIC_ADMIN_DASHBOARD_PATH}/${post.id}`}>
              <Button variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => updatePost(post.id, { isPublished: !post.isPublished })}
              disabled={busyId === post.id}
              className="rounded-full"
            >
              {post.isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <Button
              variant="outline"
              onClick={() => deletePost(post.id)}
              disabled={busyId === post.id}
              className="rounded-full border-red-400/25 bg-transparent text-red-200 hover:bg-red-500/10 hover:text-red-100"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
