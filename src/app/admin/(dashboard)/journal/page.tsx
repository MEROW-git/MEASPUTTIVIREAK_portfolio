import { JournalList } from '@/components/admin/journal-list'
import { getAllJournalPosts } from '@/lib/journal'

export const metadata = {
  title: 'Admin Journal',
}

export default async function AdminJournalPage() {
  const posts = await getAllJournalPosts()

  return (
    <section className="space-y-5">
      <div>
        <p className="eyebrow">Journal Posts</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Manage published and draft writing
        </h2>
      </div>
      <JournalList posts={posts} />
    </section>
  )
}
