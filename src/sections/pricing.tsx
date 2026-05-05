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
    planName: 'Starter',
    price: 99,
    currency: '$',
    description: 'Perfect for solo closers and small teams getting started.',
    cta: 'Start Scaling Now',
    features: [
      'Up to 3 Users',
      'AI Voice & SMS Sequences',
      'Basic Second Brain',
      'Smart Strike Dashboard',
      'Standard CRM Sync',
      'Email Support'
    ]
  },
  plan_2: {
    planName: 'Professional',
    price: 299,
    currency: '$',
    description: 'For growing agencies that need high-intensity sales tools.',
    cta: 'Go Professional',
    features: [
      'Up to 10 Users',
      'Advanced Second Brain',
      'Live Sales Coaching',
      'Lead Marketplace Access',
      'Automated Contracts',
      'Priority Support',
      'Custom CRM Integrations'
    ]
  },
  plan_3: {
    planName: 'Enterprise',
    price: 999,
    currency: '$',
    description: 'For large sales organizations with complex needs.',
    cta: 'Contact Sales',
    features: [
      'Unlimited Users',
      'Custom AI Training',
      'Dedicated Account Manager',
      'On-premise Options',
      'SAML/SSO Integration',
      '24/7 Premium Support',
      'White-glove Onboarding'
    ]
  },
}

export default function Pricing() {
  return (
    <div id='pricing' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 font-bold leading-normal">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* plan 1 */}
        <SlideEffect isSpring={false} delay={0.1} className="text-base">
          <Card className="bg-white shadow-soft border-slate-100 hover:shadow-xl transition-shadow">
            <div className="text-start text-slate-900 font-bold text-lg">{settings.plan_1.planName}</div>
            <div className="flex items-baseline gap-1 my-4">
              <span className="font-bold text-4xl text-slate-900">{settings.plan_1.currency}{settings.plan_1.price}</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <Button className="w-full border-slate-200 text-slate-900 hover:bg-slate-50 mb-6" variant='outline'>{settings.plan_1.cta}</Button>
            <div className="text-start space-y-6">
              <p className="text-muted text-sm leading-relaxed">{settings.plan_1.description}</p>

              <div className="flex flex-col items-start gap-4 text-sm">
                {settings.plan_1.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CircleCheck className="text-blue-600" size={16} />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SlideEffect>

        {/* plan 2 */}
        <SlideEffect isSpring={false} delay={0.2} className="flex flex-col gap-6 text-base">
          <GlareHover className="rounded-3xl w-full h-full" color="#ffffff" opacity={0.4} duration={600}>
            <Card className="!bg-slate-900 border-slate-800 shadow-2xl shadow-blue-500/20 scale-105 z-10 w-full h-full">
              <div className="w-full flex items-center gap-2 justify-between">
                <div className="text-start text-white font-bold text-lg">{settings.plan_2.planName}</div>
                <div className="text-[10px] bg-blue-600 px-2 py-1 rounded-full text-white uppercase font-bold tracking-wider">most popular</div>
              </div>
              <div className="flex items-baseline gap-1 my-4">
                <span className="font-bold text-4xl text-white">{settings.plan_2.currency}{settings.plan_2.price}</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <Button className="w-full btn-gradient border-none mb-6 h-12 text-base font-bold shadow-lg shadow-blue-600/20">{settings.plan_2.cta}</Button>
              <div className="text-start space-y-6">
                <p className="text-slate-400 text-sm leading-relaxed">{settings.plan_2.description}</p>
   
                <div className="flex flex-col items-start gap-4 text-sm">
                  {settings.plan_2.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CircleCheck className="text-blue-500" size={16} />
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
          <Card className="bg-white shadow-soft border-slate-100 hover:shadow-xl transition-shadow">
            <div className="text-start text-slate-900 font-bold text-lg">{settings.plan_3.planName}</div>
            <div className="flex items-baseline gap-1 my-4">
              <span className="font-bold text-4xl text-slate-900">{settings.plan_3.currency}{settings.plan_3.price}</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <Button className="w-full border-slate-200 text-slate-900 hover:bg-slate-50 mb-6" variant='outline'>{settings.plan_3.cta}</Button>
            <div className="text-start space-y-6">
              <p className="text-muted text-sm leading-relaxed">{settings.plan_3.description}</p>

              <div className="flex flex-col items-start gap-4 text-sm">
                {settings.plan_3.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CircleCheck className="text-blue-600" size={16} />
                    <span className="text-slate-700">{feature}</span>
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