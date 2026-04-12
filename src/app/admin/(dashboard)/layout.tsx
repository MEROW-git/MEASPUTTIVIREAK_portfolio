import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  PUBLIC_ADMIN_DASHBOARD_PATH,
  PUBLIC_ADMIN_LOGIN_PATH,
  PUBLIC_ADMIN_NEW_POST_PATH,
} from '@/lib/admin-route'
import { getCurrentUserFromCookies } from '@/lib/auth'

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUserFromCookies()

  if (!user) {
    redirect(PUBLIC_ADMIN_LOGIN_PATH)
  }

  return (
    <main className="shell py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Journal CMS</h1>
          <p className="mt-2 text-sm text-slate-400">
            Add, edit, preview, publish, and unpublish your journal posts.
          </p>
          <p className="mt-2 text-sm text-slate-500">Signed in as {user.username}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={PUBLIC_ADMIN_DASHBOARD_PATH}>
            <Button variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5">
              All posts
            </Button>
          </Link>
          <Link href={PUBLIC_ADMIN_NEW_POST_PATH}>
            <Button className="rounded-full">New post</Button>
          </Link>
          <form action="/api/auth/logout" method="POST">
            <Button
              type="submit"
              variant="outline"
              className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
            >
              Logout
            </Button>
          </form>
        </div>
      </div>
      {children}
    </main>
  )
}
