'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const cvPreviewPath = '/myCV/MEAS-PUTTIVIREAK-Resume.svg'
const cvDownloadPath = '/myCV/MEAS-PUTTIVIREAK-Resume.pdf'

export function CvPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="shell py-12">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="panel group relative mx-auto block w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 text-left transition-transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.72))]" />
          <div className="relative p-4">
            <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white">
              <Image
                src={cvPreviewPath}
                alt="Resume preview"
                width={1600}
                height={2263}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-slate-950/75 px-5 py-4 backdrop-blur">
            <div>
              <p className="text-sm font-medium text-white">Resume Preview</p>
              <p className="text-xs text-slate-400">Click to open full screen</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-200">
                Open
              </span>
              <a href={cvDownloadPath} download className="inline-flex">
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">
                  Download PDF
                </span>
              </a>
            </div>
          </div>
        </button>
      </section>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[120] bg-slate-950/88 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_30px_120px_rgba(2,132,199,0.22)]"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">MEAS PUTTIVIREAK Resume</p>
                  <p className="text-xs text-slate-400">Full-screen SVG preview</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <a href={cvDownloadPath} download className="inline-flex">
                    <Button type="button" className="rounded-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.06),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(2,6,23,1))] p-4">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl">
                  <Image
                    src={cvPreviewPath}
                    alt="Full resume preview"
                    width={1600}
                    height={2263}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
