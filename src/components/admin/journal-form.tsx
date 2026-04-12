'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { JournalEditor } from '@/components/admin/journal-editor'
import { RichContent } from '@/components/rich-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { PUBLIC_ADMIN_DASHBOARD_PATH } from '@/lib/admin-route'
import type { JournalPost } from '@/types'

type JournalFormProps = {
  mode: 'create' | 'edit'
  initialPost?: JournalPost | null
}

export function JournalForm({ mode, initialPost }: JournalFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialPost?.title || '')
  const [slug, setSlug] = useState(initialPost?.slug || '')
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '')
  const [content, setContent] = useState(
    initialPost?.content || '<p>Write your journal post here...</p>'
  )
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || '')
  const [tags, setTags] = useState(initialPost?.tags.join(', ') || '')
  const [isPublished, setIsPublished] = useState(initialPost?.isPublished || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const previewTitle = useMemo(() => title || 'Untitled journal post', [title])

  async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const payload = await response.json()

    if (!response.ok) {
      setError(payload.error || 'Upload failed')
      return
    }

    setCoverImage(payload.url)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')

    const body = {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      tags: tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      isPublished,
    }

    const response = await fetch(
      mode === 'create' ? '/api/admin/journal' : `/api/admin/journal/${initialPost?.id}`,
      {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    const payload = await response.json()
    setSaving(false)

    if (!response.ok) {
      setError(payload.error || 'Save failed')
      return
    }

    router.push(PUBLIC_ADMIN_DASHBOARD_PATH)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <section className="panel p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Title</label>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Slug</label>
              <Input value={slug} onChange={(event) => setSlug(event.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Excerpt</label>
              <Textarea
                rows={4}
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Tags</label>
              <Input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="MIS, SQL, Systems"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Cover image URL</label>
              <Input
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="/uploads/example.jpg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-200">Upload cover image</label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    void uploadImage(file)
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div>
                <p className="font-medium text-white">Publish status</p>
                <p className="text-sm text-slate-400">
                  Toggle whether this post appears on the public journal.
                </p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
          </div>
        </section>
        <section className="panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-white">Editor</p>
              <p className="text-sm text-slate-400">
                Rich content with headings, lists, links, blockquotes, code, and images.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <JournalEditor value={content} onChange={setContent} />
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-white">Preview</p>
              <p className="text-sm text-slate-400">
                Review the post before publishing.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-6">
            <p className="eyebrow">Preview</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">{previewTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {excerpt || 'Your excerpt will appear here.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="mt-6">
              <RichContent html={content} />
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="rounded-full px-6" disabled={saving}>
            {saving ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
            onClick={() => router.push(PUBLIC_ADMIN_DASHBOARD_PATH)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
