import { JournalForm } from '@/components/admin/journal-form'

export default function NewJournalPostPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="eyebrow">New Post</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Create a journal entry
        </h2>
      </div>
      <JournalForm mode="create" />
    </section>
  )
}
