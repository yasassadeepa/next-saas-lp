'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  title: 'Ready to Scale Your Sales Team?',
  description: 'Join hundreds of top-performing agencies using Closer Intellect AI to eliminate friction and close more deals.',
  CTA: {
    content: 'Start Your 14-Day Free Trial',
    href: '#'
  }
}

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center p-8 md:p-24 flex flex-col items-center justify-center rounded-3xl bg-slate-900 shadow-2xl shadow-blue-500/10">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl lg:text-header font-bold leading-tight text-white">{settings.title}</h2>

      {/* Description */}
      <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-2/3 mx-auto text-slate-400 text-sm lg:text-lg leading-relaxed">{settings.description}</p>

      {/* CTA */}
      <Link href={settings.CTA.href}>
        <Button className="btn-gradient border-none px-12 h-14 text-lg" size='lg'>{settings.CTA.content}</Button>
      </Link>
    </SlideEffect>
  )
}