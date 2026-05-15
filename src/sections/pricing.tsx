'use client'

import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"
import { GlareHover } from "@/components/ui/glare-hover"

const settings = {
  title: 'Simple, Transparent Pricing',
  description: 'Choose the plan that fits your agency size. All plans include our core AI Second Brain and Live Coaching features.',
  plan_1: {
    planName: 'Starter Closer',
    price: 197,
    currency: '$',
    description: 'Perfect for solo closers and small teams getting started.',
    cta: 'Start Scaling Now',
    features: [
      '1 User Seat',
      'Unlimited Lead Generations',
      'Usage Billing',
      'All Core features',
      '24/7 Support'
    ]
  },
  plan_2: {
    planName: 'Growth Agency',
    price: 397,
    currency: '$',
    description: 'For growing agencies that need high-intensity sales tools.',
    cta: 'Scale Your Agency',
    features: [
      'Unlimited Seats',
      'Everything in Starter Closer Package',
      'Usage Billing with minimum rates',
      'Admin Reports with AI features',
      'Agency Goals and Gamification',
      'API Access'
    ]
  },
  plan_3: {
    planName: 'Enterprise White-Label',
    price: 797,
    currency: '$',
    secondaryPrice: 'or $9,999 one time',
    description: 'For large sales organizations with complex needs.',
    cta: 'Contact Sales',
    features: [
      'Everything in Growth Agency',
      'Full White-Labeling & Branding',
      'Custom Domain Support',
      'Custom AI Training & Models',
      'Dedicated Account Manager',
      'SAML/SSO Integration',
      '24/7 Premium Support'
    ]
  },
}

export default function Pricing() {
  return (
    <div id='pricing' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-bold leading-normal">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* plan 1 */}
        <SlideEffect isSpring={false} delay={0.1} className="text-base">
          <Card className="bg-secondary shadow-soft border-border hover:shadow-xl transition-shadow">
            <div className="text-start text-white font-bold text-lg">{settings.plan_1.planName}</div>
            <div className="flex items-baseline gap-1 my-4">
              <span className="font-bold text-4xl text-white">{settings.plan_1.currency}{settings.plan_1.price}</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <Button className="w-full border-border text-white hover:bg-background mb-6" variant='outline'>{settings.plan_1.cta}</Button>
            <div className="text-start space-y-6">
              <p className="text-muted text-sm leading-relaxed">{settings.plan_1.description}</p>

              <div className="flex flex-col items-start gap-4 text-sm">
                {settings.plan_1.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CircleCheck className="text-primary" size={16} />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SlideEffect>

        {/* plan 2 */}
        <SlideEffect isSpring={false} delay={0.2} className="flex flex-col gap-6 text-base">
          <GlareHover className="rounded-3xl w-full h-full" color="#EF4444" opacity={0.2} duration={600}>
            <Card className="!bg-[#0a0a0a] border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10 w-full h-full">
              <div className="w-full flex items-center gap-2 justify-between">
                <div className="text-start text-white font-bold text-lg">{settings.plan_2.planName}</div>
                <div className="text-[10px] bg-primary px-2 py-1 rounded-full text-white uppercase font-bold tracking-wider">most popular</div>
              </div>
              <div className="flex items-baseline gap-1 my-4">
                <span className="font-bold text-4xl text-white">{settings.plan_2.currency}{settings.plan_2.price}</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <Button className="w-full btn-gradient border-none mb-6 h-12 text-base font-bold shadow-lg shadow-primary/20">{settings.plan_2.cta}</Button>
              <div className="text-start space-y-6">
                <p className="text-slate-400 text-sm leading-relaxed">{settings.plan_2.description}</p>
   
                <div className="flex flex-col items-start gap-4 text-sm">
                  {settings.plan_2.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CircleCheck className="text-primary" size={16} />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </GlareHover>
        </SlideEffect>

        {/* plan 3 */}
        <SlideEffect isSpring={false} delay={0.3} className="flex flex-col gap-6 text-base">
          <Card className="bg-secondary shadow-soft border-border hover:shadow-xl transition-shadow">
            <div className="text-start text-white font-bold text-lg">{settings.plan_3.planName}</div>
            <div className="flex flex-col items-start gap-1 my-4">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-4xl text-white">{settings.plan_3.currency}{settings.plan_3.price}</span>
                <span className="text-muted text-sm">/month</span>
              </div>
              <span className="text-muted text-xs font-medium uppercase tracking-wider">{settings.plan_3.secondaryPrice}</span>
            </div>
            <Button className="w-full border-border text-white hover:bg-background mb-6" variant='outline'>{settings.plan_3.cta}</Button>
            <div className="text-start space-y-6">
              <p className="text-muted text-sm leading-relaxed">{settings.plan_3.description}</p>

              <div className="flex flex-col items-start gap-4 text-sm">
                {settings.plan_3.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CircleCheck className="text-primary" size={16} />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SlideEffect>
      </div>
    </div>
  )
}