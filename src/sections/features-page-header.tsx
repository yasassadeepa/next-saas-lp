'use client'

import Link from "next/link"
import Logo from "@/components/logo"
import { ArrowLeft } from "lucide-react"
import SlideEffect from "@/components/slide-effect"

export default function FeaturesPageHeader() {
  return (
    <div className="pt-4 space-y-8">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between">
        <Link href="/" title="Back to Home" className="flex items-center gap-2 text-muted hover:text-white transition-colors group">
          <div className="p-2 rounded-lg bg-secondary border border-border group-hover:border-primary/30 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
        </Link>

        <Link href="/" title="Home">
          <Logo />
        </Link>
      </nav>

      {/* Page Title */}
      <SlideEffect>
        <div className="text-center space-y-4 pt-4">
          <h1 className="text-3xl md:text-5xl lg:text-header font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            Feature Deep Dive
          </h1>
          <p className="text-muted text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore the AI-powered tools that make Closer Intellect the ultimate sales enablement platform.
          </p>
        </div>
      </SlideEffect>
    </div>
  )
}
