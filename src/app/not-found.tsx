import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="shell flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
      <div className="panel max-w-xl p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          The page you requested does not exist or may have been moved.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button className="rounded-full px-6">Return Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
