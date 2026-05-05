'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AnimatedGradient from "@/components/animated-gradient"

const settings = {
  title: 'Ready to Scale Your Sales Team?',
  description: 'Join hundreds of top-performing agencies using Closer Intellect AI to eliminate friction and close more deals.',
  CTA: {
    content: 'Start Your 14-Day Free Trial',
    href: '#'
  }
}

const gradientColors = ["#2563eb", "#4f46e5", "#7c3aed", "#0891b2", "#1d4ed8"]

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="relative isolate overflow-hidden space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center p-8 md:px-24 md:py-32 flex flex-col items-center justify-center rounded-3xl bg-slate-950 shadow-2xl shadow-blue-900/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedGradient colors={gradientColors} speed={10} blur="medium" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl lg:text-header font-bold leading-tight text-white max-w-2xl">{settings.title}</h2>

        {/* Description */}
        <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-xl mx-auto text-slate-300 text-sm lg:text-lg leading-relaxed">{settings.description}</p>

        {/* CTA */}
        <Link href={settings.CTA.href} className="mt-4">
          <Button className="btn-gradient border-none px-12 h-14 text-lg font-bold shadow-xl shadow-blue-600/20" size='lg'>{settings.CTA.content}</Button>
        </Link>
      </div>
    </SlideEffect>
  )
}