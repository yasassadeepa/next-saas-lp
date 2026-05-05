'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import Image from "next/image"
import { Search, Database, Globe, UserPlus, Zap } from "lucide-react"

const settings = {
  badge: {
    number: 5,
    text: 'INTELLIGENT PROSPECTING',
  },
  title: 'AI Cold Lead Generation',
  description: 'Stop wasting time on low-quality leads. Our AI-powered search engine finds your ideal prospects across multiple databases and the live web in seconds.',
  main_feature: {
    title: 'Natural Language Lead Search',
    content: 'Just tell Closer Intellect AI who you want to reach. "Find me SaaS agency owners in New York with more than 50 employees." Our system handles the rest.',
    image: '/cold_leads_search_dashboard.png'
  },
  sub_features: [
    {
      icon: Database,
      title: 'Apollo Integration',
      content: 'Access 275M+ verified contacts with direct emails and phone numbers.'
    },
    {
      icon: Globe,
      title: 'Live Web Search',
      content: 'AI-driven real-time search for leads that aren\'t in standard databases yet.'
    },
    {
      icon: UserPlus,
      title: 'One-Click Reveal',
      content: 'Instantly unlock verified contact data and enroll them into your sequences.'
    }
  ]
}

export default function FeaturesLeads() {
  return (
    <div className="space-y-12 md:space-y-20 lg:space-y-28 mx-auto">
      <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 text-center">
        {/* Badge */}
        <SlideEffect>
          <Badge number={settings.badge.number} text={settings.badge.text} />
        </SlideEffect>

        {/* Title */}
        <SlideEffect>
          <h2 className="text-2xl md:text-4xl lg:text-header font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{settings.title}</h2>
        </SlideEffect>

        {/* Description */}
        <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <SlideEffect direction="right" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Image 
            src={settings.main_feature.image} 
            alt={settings.main_feature.title} 
            width={1200} 
            height={800} 
            className="relative rounded-xl border border-border shadow-2xl"
          />
        </SlideEffect>

        {/* Right: Details */}
        <div className="space-y-8">
          <SlideEffect direction="left" className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{settings.main_feature.title}</h3>
            <p className="text-muted leading-relaxed">{settings.main_feature.content}</p>
          </SlideEffect>

          <div className="grid grid-cols-1 gap-6">
            {settings.sub_features.map((feature, index) => (
              <SlideEffect key={index} direction="left" delay={index * 0.1} className="flex gap-4 p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-muted">{feature.content}</p>
                </div>
              </SlideEffect>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
