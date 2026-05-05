'use client'

import FadeEffect from "@/components/fade-effect";
import Navbar from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import BreathingText from "@/components/fancy/text/breathing-text";

const settings = {
  headline: 'Turn Every Rep into a Top Performer with AI',
  subheadline: 'Closer Intellect AI is the high-velocity Sales Enablement Platform. Scale outreach with AI Voice & SMS while providing a "Second Brain" for live intelligence.',
  mainCTA: {
    content: 'Start Scaling Now',
    href: '#'
  },
  secondaryCTA: {
    content: 'Watch Demo',
    href: '#'
  },
  illustration: '/hero-ui.png',
  reviews: [
    {
      id: 1,
      name: "John Doe",
      designation: "Sales Director",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "VP of Sales",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Agency Owner",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "SDR Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Growth Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    }
  ]
}

export default function Hero() {
  return (
    <div className="space-y-12 md:space-y-20 lg:space-y-28 z-50 relative">
      <Navbar />

      <section className="flex flex-col gap-8 lg:gap-11 items-center text-center">
        {/* Headline */}
        <h1 className="text-slate-900 text-4xl md:text-6xl lg:text-hero font-bold tracking-tight leading-none xl:max-w-6/7">
          <TextBlurEffect className="text-slate-900">Turn Every Rep into a</TextBlurEffect>{" "}
          <span className="inline-block text-blue-600">
            <BreathingText
              staggerDuration={0.08}
              fromFontVariationSettings="'wght' 100, 'slnt' 0"
              toFontVariationSettings="'wght' 800, 'slnt' -10"
            >
              Top Performer
            </BreathingText>
          </span>{" "}
          <TextBlurEffect className="text-slate-900">with AI</TextBlurEffect>
        </h1>

        {/* Sub-headline */}
        <SlideEffect
          delay={0}
          className="text-muted text-sm lg:text-lg px-6 sm:px-10 md:px-0 md:max-w-2/3 mx-auto leading-relaxed"
        >
          {settings.subheadline}
        </SlideEffect>

        {/* CTA */}
        <SlideEffect
          className="flex flex-col gap-8 md:gap-5 items-center justify-center w-full md:w-fit"
        >
          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center w-full justify-center gap-3 md:gap-4 mt-1">
            <Link href={settings.mainCTA.href} className="w-full">
              <Button size='lg' className="w-full hidden lg:flex btn-gradient px-8">
                {settings.mainCTA.content}
                <ArrowRight />
              </Button>

              <Button size='default' className="w-full flex lg:hidden btn-gradient">
                {settings.mainCTA.content}
                <ArrowRight />
              </Button>
            </Link>

            <Link href={settings.secondaryCTA.href} className="w-full">
              <Button size='lg' className="w-full hidden lg:flex border-slate-200 text-slate-900 hover:bg-slate-50" variant='outline'>
                {settings.secondaryCTA.content}
              </Button>

              <Button size='default' className="w-full flex lg:hidden border-slate-200 text-slate-900 hover:bg-slate-50" variant='outline'>
                {settings.secondaryCTA.content}
              </Button>
            </Link>
          </div>

          {/* Reviews */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-center">
            <AnimatedTooltip items={settings.reviews} />

            <div className="flex flex-col justify-center items-center md:items-start gap-1 md:gap-2">
              <div className="flex gap-px">
                <Star size={16} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                <Star size={16} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                <Star size={16} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                <Star size={16} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
                <Star size={16} fill='oklch(0.795 0.184 86.047)' className="text-yellow-500" />
              </div>

              <span className="text-xs">Trusted by 500+ Customers</span>
            </div>
          </div>
        </SlideEffect>

        {/* Illustration */}
        <SlideEffect className="relative" isSpring={false} duration={1.3}>
          <Image
            src={settings.illustration}
            alt='illustration'
            width={1920}
            height={1080}
            className="rounded-2xl shadow-soft border border-slate-100"
            priority
            loading="eager"
          />
          <FadeEffect />
        </SlideEffect>
      </section>
    </div>
  )
}