'use client'

import React from 'react'
import * as motion from "motion/react-m"
import { cn } from '@/lib/utils'

const PRESET_PATTERNS: Record<string, number[][]> = {
  'plus-hollow': [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ],
  'frame': [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  'cross': [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  'solo-center': [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  'wave-lr': [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ], // Just a start, sequence logic would handle the rest
}

interface GridLoaderProps {
  pattern?: string | number[][]
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  mode?: 'pulse' | 'stagger' | 'sequence'
  className?: string
}

export default function GridLoader({
  pattern = 'plus-hollow',
  color = '#2563EB',
  size = 'md',
  mode = 'pulse',
  className
}: GridLoaderProps) {
  const grid = typeof pattern === 'string' ? PRESET_PATTERNS[pattern] || PRESET_PATTERNS['plus-hollow'] : pattern

  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  }

  const pixelSize = typeof size === 'number' ? size : sizeMap[size]
  const cellSize = pixelSize / 3
  const gap = pixelSize * 0.1

  return (
    <div
      className={cn("grid grid-cols-3 relative shrink-0", className)}
      style={{
        width: pixelSize,
        height: pixelSize,
        gap: `${Math.max(gap, 2)}px`
      }}
    >
      {grid.flat().map((active, i) => (
        <div key={i} className="relative w-full h-full">
          {active ? (
            <>
              <motion.div
                className="rounded-[1px] w-full h-full relative z-10"
                style={{ backgroundColor: color }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: mode === 'stagger' ? (i % 3 + Math.floor(i / 3)) * 0.15 : 0
                }}
              />
              <motion.div
                className="absolute inset-0 blur-[2px] rounded-[1px] z-0"
                style={{ backgroundColor: color }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: mode === 'stagger' ? (i % 3 + Math.floor(i / 3)) * 0.15 : 0
                }}
              />
            </>
          ) : (
            <div 
              className="w-full h-full rounded-[1px] bg-slate-200/10" 
            />
          )}
        </div>
      ))}
    </div>
  )
}
