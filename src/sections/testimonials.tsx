'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import TextRevealEffect from "@/components/text-reveal-effect"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

const settings = {
  badge: {
    number: 5,
    text: 'SOCIAL PROOF',
  },
  title: 'Trusted by Top Closers',
  description: 'Join the hundreds of sales teams who have transformed their outreach and conversion rates with Closer Intellect AI.',
  testimonials: [
    {
      quote:
        "The AI Second Brain is a game-changer. I never go into a call without my battle plan ready. Our conversion rates have spiked by 40% since we started.",
      name: "Marcus Aurelius",
      designation: "SDR at GrowthSync",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    },
    {
      quote:
        "Finally, a sales tool that actually helps you close instead of just adding more admin work. The live coaching feedback is like having a pro mentor in your ear.",
      name: "Sophia Loren",
      designation: "Agency Owner at ScaleUp",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "The lead marketplace and automated contracts have saved us hours of back-and-forth. We can now close a deal in minutes, not days.",
      name: "David Goggins",
      designation: "Sales Director at PeakPerformance",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    },
  ]
}

export default function Testimonials() {
  return (
    <div id='testimonials' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-bold leading-normal">{settings.title}</TextRevealEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Testimonials */}
      <SlideEffect>
        <AnimatedTestimonials autoplay testimonials={settings.testimonials} />
      </SlideEffect>
    </div>
  )
}