'use client'

import BlurEffect from '@/components/blur-effect'
import { ReactLenis } from 'lenis/react'
import { LazyMotion, domAnimation } from "motion/react"
import 'lenis/dist/lenis.css'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ReactLenis root options={{ duration: 1.3, autoRaf: true }}>
        <BlurEffect />
        {children}
      </ReactLenis>
    </LazyMotion>
  )
}