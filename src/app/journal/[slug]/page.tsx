import { notFound } from 'next/navigation'

import { RichContent } from '@/components/rich-content'
import { formatDate } from '@/lib/format'
import { getJournalPostBySlug } from '@/lib/journal'

type JournalDetailPageProps = {
  params: {
    slug: string
  }
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const { slug } = params
  const post = await getJournalPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="shell py-12">
      <article className="mx-auto max-w-3xl">
        <div className="panel p-8">
          <p className="eyebrow">{formatDate(post.publishedAt || post.createdAt)}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 panel p-8">
          <RichContent html={post.content} />
        </div>
      </article>
    </main>
  )
}
