'use client'

import Badge from "@/components/badge"
import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import Image from "next/image"

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
    image: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg'
  },
  card_2: {
    title: 'Automated Contracts',
    content: 'Instant PDF generation to close deals the moment a lead says "Yes."',
    image: 'https://cdn.worldvectorlogo.com/logos/adobe-pdf-icon.svg'
  },
  card_3: {
    title: 'Smart CRM Sync',
    content: 'Automatically sync all call notes, sentiment data, and recordings to your existing CRM.',
    image: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg'
  },
}

export default function Features3() {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* card 1 */}
        <SlideEffect direction="top" className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_1.title}</h3>
            <p className="mb-6 text-muted">{settings.card_1.content}</p>
            <Image src={settings.card_1.image} alt={settings.card_1.title} width={80} height={80} className="mt-auto opacity-80" />
          </Card>
        </SlideEffect>

        {/* card 2 */}
        <SlideEffect direction="top" delay={0.2} className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_2.title}</h3>
            <p className="mb-6 text-muted">{settings.card_2.content}</p>
            <Image src={settings.card_2.image} alt={settings.card_1.title} width={80} height={80} className="mt-auto opacity-80" />
          </Card>
        </SlideEffect>

        {/* card 3 */}
        <SlideEffect direction="top" delay={0.3} className="col-span-1 h-full" isSpring={false}>
          <Card className="shadow-soft hover:shadow-xl transition-shadow border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-xl md:text-title text-slate-900 font-bold">{settings.card_3.title}</h3>
            <p className="mb-6 text-muted">{settings.card_3.content}</p>
            <Image src={settings.card_3.image} alt={settings.card_1.title} width={80} height={80} className="mt-auto opacity-80" />
          </Card>
        </SlideEffect>
      </div>
    </div>
  )
}