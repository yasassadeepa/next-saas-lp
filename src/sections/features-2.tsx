'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import FadeEffect from "@/components/fade-effect"
import SlideEffect from "@/components/slide-effect"
import Image from "next/image"

const settings = {
  badge: {
    number: 2,
    text: 'MISSION CONTROL',
  },
  title: 'Real-Time Sales Intelligence',
  description: 'A centralized mission control for your daily sales activities. Get real-time feedback and tactical guidance during live calls.',
  card_1: {
    title: 'Smart Strike Dashboard',
    content: 'A high-intensity interface designed for speed. Track leads, sequences, and conversion metrics in one view.',
    image: '/hero-ui.png' // Reusing hero UI for context
  },
  card_2: {
    title: 'Live Sales Coaching',
    content: 'Our AI listens to your calls and provides instant battle plans, objection handling, and memory triggers.',
    image: '/features-ui.png'
  },
}

export default function Features2() {
  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 font-bold leading-normal">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* card 1 */}
        <SlideEffect direction="right" className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100 flex flex-col justify-between overflow-hidden">
            <div className="mb-6">
              <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_1.title}</h3>
              <p className="mb-4 text-muted">{settings.card_1.content}</p>
            </div>
            <Image src={settings.card_1.image} alt={settings.card_1.title} width={512} height={512} className="rounded-lg shadow-md mt-auto" />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="left" duration={1.3} className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100 flex flex-col justify-between overflow-hidden">
            <div className="mb-6">
              <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_2.title}</h3>
              <p className="text-muted">{settings.card_2.content}</p>
            </div>
            <div className="relative mt-auto">
              <Image src={settings.card_2.image} alt={settings.card_1.title} width={512} height={512} className="rounded-lg shadow-md" />
              <FadeEffect color='secondary' />
            </div>
          </Card>
        </SlideEffect>
      </div>
    </div>
  )
}