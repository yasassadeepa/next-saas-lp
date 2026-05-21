'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import TextRevealEffect from "@/components/text-reveal-effect"
import { Quote } from "lucide-react"

const settings = {
  badge: {
    number: 8,
    text: 'OUR LEADERSHIP',
  },
  title: 'Vision for the Future',
  description: 'Closer Intellect AI was built by closers, for closers. Hear from our leadership about the mission to revolutionize sales.',
  quotes: [
    {
      quote: "Our mission is to eliminate the friction in high-stakes sales. We don't just provide tools; we provide the strategic edge that turns every rep into a top performer through intelligence and automation.",
      name: "Anthony Henderson",
      role: "CEO",
    },
    {
      quote: "Efficiency is the backbone of agency growth. By automating the administrative burden, we allow teams to focus on what truly matters—building authentic relationships and closing more deals.",
      name: "Teneya Saens",
      role: "CFO",
    },
  ]
}

export default function Testimonials() {
  return (
    <div id='leadership' className="space-y-12 md:space-y-20 mx-auto text-center">
      <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10">
        {/* Badge */}
        <SlideEffect>
          <Badge number={settings.badge.number} text={settings.badge.text} />
        </SlideEffect>

        {/* Title */}
        <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-bold leading-normal">{settings.title}</TextRevealEffect>

        {/* Description */}
        <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>
      </div>

      {/* Leadership Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4">
        {settings.quotes.map((item, index) => (
          <SlideEffect key={index} direction={index === 0 ? 'right' : 'left'} delay={index * 0.2} className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative h-full flex flex-col items-center justify-between p-6 md:p-12 rounded-3xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <Quote className="text-primary/40 mb-6" size={48} />
              
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic mb-8">
                &quot;{item.quote}&quot;
              </p>
              
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white tracking-wide">{item.name}</h4>
                <p className="text-primary font-semibold uppercase tracking-widest text-xs">{item.role}</p>
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}