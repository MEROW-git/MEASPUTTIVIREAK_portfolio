'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { ToolItem } from '@/types'

type ToolStackProps = {
  tools: ToolItem[]
}

type TiltState = {
  rotateX: number
  rotateY: number
}

function ToolTile({ tool }: { tool: ToolItem }) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })

  return (
    <motion.div
      className="group relative"
      style={{ perspective: 1000 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height

        setTilt({
          rotateX: (0.5 - y) * 16,
          rotateY: (x - 0.5) * 18,
        })
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        className={cn(
          'relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)]',
          'before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)] before:opacity-60 before:content-[""]'
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-90',
            tool.accent
          )}
        />
        <div
          className="relative flex h-24 flex-col justify-between"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-200">
              {tool.group}
            </span>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-white shadow-inner">
              {tool.short}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{tool.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ToolStack({ tools }: ToolStackProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolTile key={tool.name} tool={tool} />
      ))}
    </div>
  )
}
