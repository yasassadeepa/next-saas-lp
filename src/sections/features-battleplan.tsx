'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import { Safari } from "@/components/ui/safari"
import { Brain, Target, ShieldAlert } from "lucide-react"

const settings = {
  badge: {
    number: 7,
    text: 'SALES INTELLIGENCE',
  },
  title: 'AI-Powered Battle Plans',
  description: 'Equip your sales team with personalized strategic briefs for every lead. Our Second Brain analyzes history and context to provide a winning strategy.',
  main_feature: {
    title: 'Your Sales Strategic Partner',
    content: 'Get a customized, step-by-step strategy for closing each specific lead. Generated based on their unique background and interaction history, ensuring you never go into a call unprepared.',
    image: '/battle_plan.png',
    url: 'app.closerintellect.ai/intelligence/battle-plan'
  },
  sub_features: [
    {
      icon: Brain,
      title: 'Memory Triggers',
      content: 'AI remembers key details from past conversations and prompts you to bring them up to build rapport instantly.'
    },
    {
      icon: ShieldAlert,
      title: 'Failure Prevention',
      content: 'Identify potential risks and objections in a deal before they happen with AI-driven risk analysis.'
    },
    {
      icon: Target,
      title: 'Tactical Guidance',
      content: 'Specific, actionable advice during calls, including investigation questions and soft-skill reminders.'
    }
  ]
}

export default function FeaturesBattlePlan() {
  return (
    <div className="space-y-12 md:space-y-20 lg:space-y-28 mx-auto">
      <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 text-center">
        <SlideEffect>
          <Badge number={settings.badge.number} text={settings.badge.text} />
        </SlideEffect>
        <SlideEffect>
          <h2 className="text-2xl md:text-4xl lg:text-header font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{settings.title}</h2>
        </SlideEffect>
        <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <SlideEffect direction="right" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Safari 
            imageSrc={settings.main_feature.image} 
            url={settings.main_feature.url}
            className="relative rounded-xl border border-border shadow-2xl overflow-hidden"
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
