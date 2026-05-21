'use client'

import Link from "next/link"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Workflow, Brain } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "AI Prospecting",
    description: "Natural language lead search across 275M+ contacts",
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Multi-channel SMS & AI Voice follow-up workflows",
  },
  {
    icon: Brain,
    title: "Battle Plans",
    description: "AI-generated strategic briefs for every lead",
  },
]

export default function MobileFeaturePreview() {
  return (
    <div className="block lg:hidden">
      <SlideEffect>
        <div className="relative overflow-hidden rounded-3xl bg-secondary border border-border p-6 space-y-6">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/8 blur-[60px] rounded-full -mr-12 -mt-12 pointer-events-none" />

          {/* Section label */}
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Platform Features
            </span>
          </div>

          {/* Feature list */}
          <div className="space-y-4 relative z-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                  <feature.icon size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/features" className="block">
            <Button className="w-full btn-gradient border-none h-11 text-sm font-semibold shadow-lg shadow-primary/15">
              Explore All Features
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </SlideEffect>
    </div>
  )
}
