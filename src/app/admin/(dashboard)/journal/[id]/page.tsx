import { notFound } from 'next/navigation'

import { JournalForm } from '@/components/admin/journal-form'
import { getJournalPostById } from '@/lib/journal'

type EditJournalPostPageProps = {
  params: {
    id: string
  }
}

export default async function EditJournalPostPage({
  params,
}: EditJournalPostPageProps) {
  const { id } = params
  const post = await getJournalPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="eyebrow">Edit Post</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{post.title}</h2>
      </div>
      <JournalForm mode="edit" initialPost={post} />
    </section>
  )
}
