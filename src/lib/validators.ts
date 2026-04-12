import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(1).max(100),
})

export const journalSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(180).optional(),
  excerpt: z.string().max(240).optional(),
  content: z.string().min(20),
  coverImage: z.string().max(500).nullable().optional(),
  tags: z.array(z.string().max(40)).default([]),
  isPublished: z.boolean().default(false),
})
