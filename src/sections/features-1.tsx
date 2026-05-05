'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import Carousel from "@/components/carousel"
import SlideEffect from "@/components/slide-effect"
import Image from "next/image"

const settings = {
  badge: {
    number: 1,
    text: 'High-Velocity Outreach',
  },
  title: 'Scale Your Sales with AI',
  description: 'Closer Intellect AI eliminates administrative friction and turns every sales rep into a top performer through real-time coaching and automated lead management.',
  card_1: {
    title: 'AI Voice & SMS Automation',
    content: 'Scale your outreach with multi-channel sequences that feel human. Automate the "boring" parts of sales while you focus on closing.',
    carousel_images: [
      'https://cdn.worldvectorlogo.com/logos/react-2.svg',
      'https://cdn.worldvectorlogo.com/logos/vue-9.svg',
      'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg',
      'https://cdn.worldvectorlogo.com/logos/nestjs.svg',
      'https://cdn.worldvectorlogo.com/logos/laravel-2.svg',
      'https://cdn.worldvectorlogo.com/logos/svelte-1.svg',
      'https://cdn.worldvectorlogo.com/logos/golang-1.svg',
      'https://cdn.worldvectorlogo.com/logos/rust.svg',
    ]
  },
  card_2: {
    title: 'The Sales Second Brain',
    content: 'Instant "Battle Plans" and historical memory triggers for every lead. Never miss a detail again.'
  },
  card_3: {
    title: 'Smart Strike Dashboard',
    content: 'A centralized, high-intensity mission control for daily sales activities.'
  },
  card_4: {
    title: 'Live Sales Coaching',
    content: 'Real-time feedback and tactical guidance during live calls. Turn every rep into a closer.',
    image: '/features-ui.png',
  },
}

export default function Features1() {
  return (
    <div id='features' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Badge */}
      <SlideEffect>
        <Badge number={settings.badge.number} text={settings.badge.text} />
      </SlideEffect>

      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-muted text-sm lg:text-lg">{settings.description}</SlideEffect>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* card 1 */}
        <SlideEffect direction="right" className="col-span-1 lg:col-span-3 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_1.title}</h3>
            <p className="mb-4 text-muted">{settings.card_1.content}</p>
            <Carousel images={settings.card_1.carousel_images} />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="left" duration={1.3} className="col-span-1 lg:col-span-2 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_2.title}</h3>
            <p className="text-muted">{settings.card_2.content}</p>
          </Card>
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect direction="right" duration={1} className="col-span-1 lg:col-span-2 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_3.title}</h3>
            <p className="text-muted">{settings.card_3.content}</p>
          </Card>
        </SlideEffect>

        {/* card 4 */}
        <SlideEffect direction="left" className="col-span-1 lg:col-span-3 h-full" isSpring={false}>
          <Card className="flex flex-col lg:flex-row justify-center items-center shadow-soft hover:shadow-xl transition-shadow border-slate-100">
            <div className="space-y-3 md:space-y-5">
              <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_4.title}</h3>
              <p className="text-muted">{settings.card_4.content}</p>
            </div>

            <Image className="w-full lg:w-64 my-auto mx-auto rounded-xl shadow-lg mt-6 lg:mt-0 lg:ml-6" src={settings.card_4.image} alt={settings.card_4.title} width={512} height={512} />
          </Card>
        </SlideEffect>
      </div>
    </div>
  )
}