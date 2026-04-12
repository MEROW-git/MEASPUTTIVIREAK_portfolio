import { JournalCard } from '@/components/journal-card'
import { getPublishedJournalPosts } from '@/lib/journal'

export const metadata = {
  title: 'Journal',
}

export default async function JournalPage() {
  const posts = await getPublishedJournalPosts()

  return (
    <main className="shell py-12">
      <div className="max-w-3xl">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Writing about systems, development, and practical technology
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Published notes, project reflections, and technical writing from my work and study.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <JournalCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
