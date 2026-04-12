import { randomUUID } from 'crypto'

import prisma, { hasPrismaClient } from '@/lib/prisma'
import {
  buildExcerpt,
  sanitizeRichContent,
  sanitizeTagList,
  sanitizeText,
  slugify,
} from '@/lib/security'
import { sampleJournalPosts } from '@/content/site'
import type { JournalPost } from '@/types'

type JournalInput = {
  title: string
  slug?: string
  excerpt?: string
  content: string
  coverImage?: string | null
  tags?: string[]
  isPublished?: boolean
}

const memoryJournalStore = [...sampleJournalPosts]

function sortByDate(posts: JournalPost[]) {
  return [...posts].sort((a, b) => {
    const aDate = new Date(a.publishedAt || a.createdAt).getTime()
    const bDate = new Date(b.publishedAt || b.createdAt).getTime()
    return bDate - aDate
  })
}

function normalizePost(post: any): JournalPost {
  return {
    id: String(post.id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: String(post.excerpt),
    content: String(post.content),
    coverImage: post.coverImage ? String(post.coverImage) : null,
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    isPublished: Boolean(post.isPublished),
    createdAt: new Date(post.createdAt).toISOString(),
    updatedAt: new Date(post.updatedAt).toISOString(),
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
  }
}

function createRecord(input: JournalInput, existing?: JournalPost): JournalPost {
  const title = sanitizeText(input.title)
  const content = sanitizeRichContent(input.content)
  const slug = slugify(input.slug || input.title || existing?.title || `post-${Date.now()}`)
  const isPublished = Boolean(input.isPublished)
  const now = new Date().toISOString()

  return {
    id: existing?.id || randomUUID(),
    title,
    slug,
    excerpt: sanitizeText(
      input.excerpt || buildExcerpt(content, existing?.excerpt || title)
    ),
    content,
    coverImage: input.coverImage?.trim() || null,
    tags: sanitizeTagList(input.tags || existing?.tags || []),
    isPublished,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    publishedAt: isPublished
      ? existing?.publishedAt || now
      : null,
  }
}

export async function getPublishedJournalPosts() {
  if (hasPrismaClient()) {
    const rows = await (prisma as any).journalPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    })

    return rows.map(normalizePost)
  }

  return sortByDate(memoryJournalStore.filter((post) => post.isPublished))
}

export async function getAllJournalPosts() {
  if (hasPrismaClient()) {
    const rows = await (prisma as any).journalPost.findMany({
      orderBy: { updatedAt: 'desc' },
    })

    return rows.map(normalizePost)
  }

  return sortByDate(memoryJournalStore)
}

export async function getJournalPostBySlug(slug: string, includeDraft = false) {
  if (hasPrismaClient()) {
    const row = await (prisma as any).journalPost.findUnique({
      where: { slug },
    })

    if (!row) return null
    if (!includeDraft && !row.isPublished) return null
    return normalizePost(row)
  }

  const post = memoryJournalStore.find((entry) => entry.slug === slug)
  if (!post) return null
  if (!includeDraft && !post.isPublished) return null
  return post
}

export async function getJournalPostById(id: string) {
  if (hasPrismaClient()) {
    const row = await (prisma as any).journalPost.findUnique({
      where: { id },
    })

    return row ? normalizePost(row) : null
  }

  return memoryJournalStore.find((post) => post.id === id) || null
}

export async function createJournalPost(input: JournalInput) {
  const record = createRecord(input)

  if (hasPrismaClient()) {
    const created = await (prisma as any).journalPost.create({
      data: record,
    })

    return normalizePost(created)
  }

  memoryJournalStore.unshift(record)
  return record
}

export async function updateJournalPost(id: string, input: JournalInput) {
  const existing = await getJournalPostById(id)

  if (!existing) {
    throw new Error('Journal post not found')
  }

  const record = createRecord(input, existing)

  if (hasPrismaClient()) {
    const updated = await (prisma as any).journalPost.update({
      where: { id },
      data: {
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt,
        content: record.content,
        coverImage: record.coverImage,
        tags: record.tags,
        isPublished: record.isPublished,
        updatedAt: record.updatedAt,
        publishedAt: record.publishedAt,
      },
    })

    return normalizePost(updated)
  }

  const index = memoryJournalStore.findIndex((post) => post.id === id)
  memoryJournalStore[index] = record
  return record
}

export async function deleteJournalPost(id: string) {
  if (hasPrismaClient()) {
    await (prisma as any).journalPost.delete({
      where: { id },
    })
    return
  }

  const index = memoryJournalStore.findIndex((post) => post.id === id)
  if (index >= 0) {
    memoryJournalStore.splice(index, 1)
  }
}
