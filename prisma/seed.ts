import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../src/lib/auth'
import { sampleJournalPosts, siteProfile } from '../src/content/site'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'admin123')

  const admin = await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: adminPassword,
    },
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: adminPassword,
    },
  })

  for (const post of sampleJournalPosts) {
    await prisma.journalPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        tags: post.tags,
        isPublished: post.isPublished,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        tags: post.tags,
        isPublished: post.isPublished,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        authorId: admin.id,
      },
    })
  }

  console.log(`Seeded portfolio for ${siteProfile.name}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
