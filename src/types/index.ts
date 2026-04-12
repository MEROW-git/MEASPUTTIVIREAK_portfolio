export type SkillItem = {
  name: string
  category: string
  description: string
}

export type ToolItem = {
  name: string
  short: string
  group: string
  accent: string
  color: string
  glow: string
  modelPath?: string
}

export type FeaturedProject = {
  title: string
  location: string
  stack: string[]
  description: string
  outcome: string
}

export type SiteLink = {
  label: string
  href: string
}

export type JournalPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}
