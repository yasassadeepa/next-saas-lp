'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import Spinner from "@/components/spinner"
import TextRevealEffect from "@/components/text-reveal-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  badge: {
    number: 4,
    text: 'SMART TEAMWORK',
  },
  title: 'Empower Your Agency',
  description: 'Reduce friction and enhance productivity by getting the right information to the right reps at the right time.',
  card_1: {
    title: 'Manage Teams & Lead Flow',
    content: "Sales happens in teams. Closer Intellect AI enables collaboration by allowing you to easily manage lead distribution, team performance, and agency-wide sequences in one place.",
    CTA: {
      content: 'Invite Your Team',
      href: '#'
    },
    labels: [
      'high-ticket',
      'saas-leads',
      'ecom-pros',
      'real-estate',
      'consulting',
      'insurance',
      'auto-leads',
    ],
    avatars: [
      'https://avatar.iran.liara.run/public/38',
      'https://avatar.iran.liara.run/public/40',
      'https://avatar.iran.liara.run/public/22',
      'https://avatar.iran.liara.run/public/6',
      'https://avatar.iran.liara.run/public/12',
      'https://avatar.iran.liara.run/public/37',
      'https://avatar.iran.liara.run/public/35'
    ]
  },
  card_2: {
    title: 'Automatic Performance Reports',
    content: 'Keep everyone in the loop with automatic performance reports. Receive concise summaries of daily outreach, closing rates, and team activity.',
  },
  card_3: {
    title: 'Secure Lead Sharing',
    content: 'Grant secure access to specific lead buckets or dashboards for external partners or specific sub-agencies.',
  },
}

export default function Features4() {
  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <TextRevealEffect className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 font-bold leading-normal">{settings.title}</TextRevealEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* card 1 */}
        <SlideEffect direction="top" className="grid-cols-1 lg:col-span-2 h-full" isSpring={false}>
          <Card className="flex flex-col lg:flex-row justify-center items-center shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <div className="space-y-3 md:space-y-5 flex-1">
              <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_1.title}</h3>
              <p className="mb-8 lg:mb-16 text-muted">{settings.card_1.content}</p>
              <Link href={settings.card_1.CTA.href}>
                <Button className="btn-gradient border-none">{settings.card_1.CTA.content}</Button>
              </Link>
            </div>

            <Spinner labels={settings.card_1.labels} avatars={settings.card_1.avatars} />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="right" className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_2.title}</h3>
            <p className="text-muted">{settings.card_2.content}</p>
          </Card>
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect direction="left" delay={0.2} className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_3.title}</h3>
            <p className="text-muted">{settings.card_3.content}</p>
          </Card>
        </SlideEffect>
      </div>
    </div>
  )
}