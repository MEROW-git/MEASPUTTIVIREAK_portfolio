import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteBackground } from '@/components/site-background'
import { siteProfile } from '@/content/site'

import './globals.css'

export const metadata: Metadata = {
  title: `${siteProfile.name} | MIS Student, Developer, System Builder`,
  description:
    'A modern personal portfolio for MEAS PUTTIVIREAK featuring practical systems, journal writing, and a journal-only admin dashboard.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SiteBackground />
        <div className="relative z-10">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
            <div className="shell flex h-20 items-center justify-between">
              <Link href="/" className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                  Portfolio
                </span>
                <span className="text-sm font-semibold text-white">
                  {siteProfile.name}
                </span>
              </Link>
              <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                <Link href="/#about" className="hover:text-white">
                  About
                </Link>
                <Link href="/#skills" className="hover:text-white">
                  Skills
                </Link>
                <Link href="/#projects" className="hover:text-white">
                  Project
                </Link>
                <Link href="/journal" className="hover:text-white">
                  Journal
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
