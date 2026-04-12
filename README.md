# MEAS PUTTIVIREAK Portfolio

A production-oriented personal portfolio built with Next.js, TypeScript, Tailwind CSS, React Three Fiber, Prisma, and a journal-only admin dashboard.

## Architecture

- Public portfolio front page with:
  - animated Three.js hero
  - About section
  - Skills section
  - featured project section
  - journal preview
  - professional footer
- Public journal:
  - `/journal`
  - `/journal/[slug]`
- Private journal CMS only:
  - protected journal management area
  - create, edit, publish, unpublish, and security settings
- API routes:
  - `/api/auth/login`
  - `/api/auth/logout`
  - `/api/auth/me`
  - `/api/admin/journal`
  - `/api/admin/journal/[id]`
  - `/api/upload`

## Folder Structure

```text
src/
  app/
    admin/
      (dashboard)/
        journal/
    api/
      admin/journal/
      auth/
      upload/
    journal/
    globals.css
    layout.tsx
    page.tsx
  components/
    admin/
    ui/
    hero-scene.tsx
    journal-card.tsx
    rich-content.tsx
  content/
    site.ts
  lib/
    auth.ts
    format.ts
    journal.ts
    prisma.ts
    security.ts
    validators.ts
  types/
    index.ts
prisma/
  schema.prisma
  seed.ts
middleware.ts
```

## Database Schema

Core models:

- `Admin`
- `JournalPost`

`JournalPost` contains:

- title
- slug
- excerpt
- content
- cover image
- tags
- publish status
- created date
- updated date
- published date

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env.local` and update values as needed.

Important variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_APP_URL`

### 3. Prisma

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Run

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Private CMS route: configured locally and kept unlisted

## Design Decisions

- The homepage uses a dark, technical visual language with a Three.js hero to make the front page feel modern without leaning into cybersecurity branding.
- Portfolio identity comes from `src/content/site.ts`, which keeps your profile, skills, featured project, links, and sample journal content easy to update.
- The admin area is intentionally narrow. It only manages journal content so the CMS stays simple and aligned with your stated goal.
- The editor uses TipTap for rich formatting, including headings, lists, links, blockquotes, images, and code blocks.
- Rich journal HTML is sanitized before persistence to reduce XSS risk.

## Security Decisions

- Admin authentication uses server-side credential checks and an HTTP-only cookie.
- The private CMS route is intentionally unlisted from public navigation.
- Protected pages are guarded by middleware and server-side admin layout checks.
- Protected APIs re-check authentication before returning or mutating data.
- Passwords are hashed with bcrypt.
- Journal payloads are validated with Zod.
- Uploaded images are validated by MIME type and size before being written to `public/uploads`.
- Secrets remain server-side in environment variables.

## Notes

- The app includes a fallback in-memory journal store when Prisma is not available yet, which helps the UI boot during early local setup.
- For production, complete Prisma setup and use a real PostgreSQL database.
- The current local upload route writes to `public/uploads`; for Vercel production, use external object storage such as Vercel Blob or supply remote image URLs instead of relying on local disk persistence.

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Create a PostgreSQL database using a Vercel Marketplace provider such as Neon or Supabase.
4. Add these environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_PASSWORD_HASH`
   - `NEXT_PUBLIC_APP_URL`
   - `NODE_ENV=production`
5. Generate a bcrypt hash for your admin password and place it in `ADMIN_PASSWORD_HASH`.
6. Set `NEXT_PUBLIC_APP_URL` to your production domain, for example `https://your-site.vercel.app`.
7. After the first deploy, run:

```bash
npx prisma db push
npm run db:seed
```

8. Open your private CMS route using the internal path you configured for the project.

Recommended production values:

- Use a long random `JWT_SECRET`.
- Do not commit real credentials into `.env.example`.
- Keep the admin route private and unlinked.
- Prefer remote image URLs or Vercel Blob for cover images on production.
