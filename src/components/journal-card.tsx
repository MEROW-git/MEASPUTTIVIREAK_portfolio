import Link from 'next/link'

import { formatDate } from '@/lib/format'
import type { JournalPost } from '@/types'

type JournalCardProps = {
  post: JournalPost
}

export function JournalCard({ post }: JournalCardProps) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="panel group overflow-hidden transition-transform hover:-translate-y-1"
    >
      {post.coverImage ? (
        <div
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.12), rgba(2,6,23,0.68)), url(${post.coverImage})` }}
        />
      ) : (
        <div className="h-48 w-full bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,1))]" />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          <span>{post.tags[0] || 'Journal'}</span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-white group-hover:text-cyan-200">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{post.excerpt}</p>
      </div>
    </Link>
  )
}
