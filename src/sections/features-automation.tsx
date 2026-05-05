'use client'

import Badge from "@/components/badge"
import SlideEffect from "@/components/slide-effect"
import { Safari } from "@/components/ui/safari"
import { Send, PhoneCall, Clock } from "lucide-react"

const settings = {
  badge: {
    number: 6,
    text: 'OMNICHANNEL OUTREACH',
  },
  title: 'Multi-Channel Follow-up Automation',
  description: 'Build complex, high-converting outreach sequences across SMS and AI Voice with a visual, intuitive workflow builder.',
  main_feature: {
    title: 'Visual Workflow Orchestration',
    content: 'Define exactly when and how your leads are contacted. Combine SMS triggers, AI-powered voice calls, and smart delays to create a relentless but human-feeling follow-up engine.',
    image: '/automation_workflow.png',
    url: 'app.closerintellect.ai/automation/builder'
  },
  sub_features: [
    {
      icon: Send,
      title: 'Smart SMS Sequences',
      content: 'Automatic mass SMS outreach with personalized variables and real-time reply tracking.'
    },
    {
      icon: PhoneCall,
      title: 'AI Voice Triggers',
      content: 'Instantly trigger personalized AI voice calls based on lead behavior or schedule.'
    },
    {
      icon: Clock,
      title: 'Dynamic Delays',
      content: 'Optimize conversion rates by spacing out interactions naturally across days or hours.'
    }
  ]
}

export default function FeaturesAutomation() {
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
        {/* Left: Details */}
        <div className="space-y-8 order-2 lg:order-1">
          <SlideEffect direction="right" className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{settings.main_feature.title}</h3>
            <p className="text-muted leading-relaxed">{settings.main_feature.content}</p>
          </SlideEffect>

          <div className="grid grid-cols-1 gap-6">
            {settings.sub_features.map((feature, index) => (
              <SlideEffect key={index} direction="right" delay={index * 0.1} className="flex gap-4 p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group">
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

        {/* Right: Image */}
        <SlideEffect direction="left" className="relative group order-1 lg:order-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Safari 
            imageSrc={settings.main_feature.image} 
            url={settings.main_feature.url}
            className="relative rounded-xl border border-border shadow-2xl overflow-hidden"
          />
        </SlideEffect>
      </div>
    </div>
  )
}
