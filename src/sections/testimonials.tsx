'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import TextRevealEffect from "@/components/text-reveal-effect"
import { Quote } from "lucide-react"
import Image from "next/image"

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

      {/* Leadership Photo and Quotes */}
      <div className="grid grid-cols-1 items-start gap-8 max-w-6xl mx-auto px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <SlideEffect direction="right" className="relative group mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-transparent opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/50 bg-secondary/40 transition-all duration-300 group-hover:border-primary/40">
            <Image
              src="/leadership-anthony-teneya.png"
              alt="Closer Intellect AI leaders Teneya Saens and Anthony Henderson"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </SlideEffect>

        <div className="grid gap-6 md:grid-cols-2 lg:h-full lg:grid-cols-1">
          {settings.quotes.map((item, index) => (
            <SlideEffect key={item.name} direction="left" delay={0.1 + index * 0.2} className="relative group h-full">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-transparent opacity-25 blur transition duration-500 group-hover:opacity-40"></div>
              <div className="relative flex h-full flex-col items-center justify-between rounded-3xl border border-border/50 bg-secondary/40 p-6 transition-all duration-300 hover:border-primary/30 sm:p-8 lg:p-8 xl:p-10">
                <Quote className="mb-4 text-primary/40" size={40} />

                <p className="mb-6 text-base font-medium italic leading-relaxed text-white md:text-lg">
                  &quot;{item.quote}&quot;
                </p>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold tracking-wide text-white">{item.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.role}</p>
                </div>
              </div>
            </SlideEffect>
          ))}
        </div>
      </div>
    </div>
  )
}
