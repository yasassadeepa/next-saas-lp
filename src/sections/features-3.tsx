'use client'

import React, { useRef, useState, useEffect } from "react"
import Badge from "@/components/badge"
import { MagicCard } from "@/components/ui/magic-card"
import SlideEffect from "@/components/slide-effect"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Signature, 
  Phone, 
  Database
} from "lucide-react"

const settings = {
  badge: {
    number: 3,
    text: 'ECOSYSTEM',
  },
  title: 'Close Deals Faster',
  description: 'From lead acquisition to signed contracts, Closer Intellect AI provides the tools you need to streamline your entire sales cycle.',
  card_1: {
    title: 'Lead Marketplace',
    content: 'Seamlessly share and claim high-quality prospects within your agency.',
  },
  card_2: {
    title: 'Automated Contracts',
    content: 'Instant PDF generation to close deals the moment a lead says "Yes."',
  },
  card_3: {
    title: 'Smart CRM Sync',
    content: 'Automatically sync all call notes, sentiment data, and recordings to your existing CRM.',
  },
}

const IntegrationAnimation = ({ icon1: Icon1, icon2: Icon2, icon3: Icon3 }: { icon1: React.ElementType, icon2: React.ElementType, icon3: React.ElementType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex w-full items-center justify-center rounded-xl bg-secondary/50 px-12 py-10 border border-border mt-auto" ref={containerRef}>
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col justify-center">
          <div ref={fromRef} className="z-10 flex size-10 sm:size-12 items-center justify-center rounded-full border border-border bg-secondary p-2 sm:p-3 shadow-sm">
            <Icon1 className="size-5 sm:size-6 text-muted" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div ref={midRef} className="z-10 flex size-10 sm:size-12 items-center justify-center rounded-full border border-primary/50 bg-primary p-2 sm:p-3 shadow-lg shadow-primary/20">
            <Icon2 className="size-5 sm:size-6 text-white" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div ref={toRef} className="z-10 flex size-10 sm:size-12 items-center justify-center rounded-full border border-border bg-secondary p-2 sm:p-3 shadow-sm">
            <Icon3 className="size-5 sm:size-6 text-muted" />
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={midRef}
        gradientStartColor="#dc2626"
        gradientStopColor="#991b1b"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={midRef}
        toRef={toRef}
        gradientStartColor="#dc2626"
        gradientStopColor="#991b1b"
        duration={3}
        delay={1.5}
      />
    </div>
  )
}


export default function Features3() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85 + 16; // 85vw + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, 2));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    { settings: settings.card_1, icons: [Users, Zap, ShieldCheck] },
    { settings: settings.card_2, icons: [FileText, Zap, Signature] },
    { settings: settings.card_3, icons: [Phone, Zap, Database] },
  ];

  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-bold leading-normal">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Cards — Carousel on mobile, Grid on desktop */}
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        <SlideEffect direction="top" className="col-span-1 h-full" isSpring={false}>
          <MagicCard mode="orb" glowFrom="#dc2626" glowTo="#7f1d1d" glowOpacity={0.2} className="flex flex-col items-center text-center h-full p-8 md:p-10 border-border bg-secondary/50">
            <div className="mb-8">
              <h3 className="text-xl md:text-title text-white font-bold">{settings.card_1.title}</h3>
              <p className="text-muted">{settings.card_1.content}</p>
            </div>
            <IntegrationAnimation icon1={Users} icon2={Zap} icon3={ShieldCheck} />
          </MagicCard>
        </SlideEffect>

        <SlideEffect direction="top" delay={0.2} className="col-span-1 h-full" isSpring={false}>
          <MagicCard mode="orb" glowFrom="#dc2626" glowTo="#7f1d1d" glowOpacity={0.2} className="flex flex-col items-center text-center h-full p-8 md:p-10 border-border bg-secondary/50">
            <div className="mb-8">
              <h3 className="text-xl md:text-title text-white font-bold">{settings.card_2.title}</h3>
              <p className="text-muted">{settings.card_2.content}</p>
            </div>
            <IntegrationAnimation icon1={FileText} icon2={Zap} icon3={Signature} />
          </MagicCard>
        </SlideEffect>

        <SlideEffect direction="top" delay={0.3} className="col-span-1 h-full" isSpring={false}>
          <MagicCard mode="orb" glowFrom="#dc2626" glowTo="#7f1d1d" glowOpacity={0.2} className="flex flex-col items-center text-center h-full p-8 md:p-10 border-border bg-secondary/50">
            <div className="mb-8">
              <h3 className="text-xl md:text-title text-white font-bold">{settings.card_3.title}</h3>
              <p className="text-muted">{settings.card_3.content}</p>
            </div>
            <IntegrationAnimation icon1={Phone} icon2={Zap} icon3={Database} />
          </MagicCard>
        </SlideEffect>
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden">
        <SlideEffect>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {cards.map((card, index) => (
              <div key={index} className="min-w-[85vw] max-w-[85vw] snap-center flex-shrink-0">
                <MagicCard mode="orb" glowFrom="#dc2626" glowTo="#7f1d1d" glowOpacity={0.2} className="flex flex-col items-center text-center h-full p-8 border-border bg-secondary/50">
                  <div className="mb-8">
                    <h3 className="text-xl text-white font-bold">{card.settings.title}</h3>
                    <p className="text-muted">{card.settings.content}</p>
                  </div>
                  <IntegrationAnimation icon1={card.icons[0]} icon2={card.icons[1]} icon3={card.icons[2]} />
                </MagicCard>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-zinc-600'
                }`}
                onClick={() => {
                  const container = scrollRef.current;
                  if (!container) return;
                  const cardWidth = container.offsetWidth * 0.85 + 16;
                  container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                }}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </SlideEffect>
      </div>
    </div>
  )
}
