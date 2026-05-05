'use client'

import SlideEffect from "@/components/slide-effect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const settings = {
  title: 'Got Questions? We Have Answers',
  faqs: [
    {
      question: 'How does the AI Second Brain work?',
      answer: 'Our AI analyzes historical lead data and current conversation context to provide real-time memory triggers and battle plans for every call.',
    },
    {
      question: 'Is the AI Voice automation human-sounding?',
      answer: 'Yes, we use advanced low-latency voice synthesis that maintains natural tonality and cadence, ensuring your outreach feels personal and human.',
    },
    {
      question: 'Can I integrate my existing CRM?',
      answer: 'Absolutely. We offer native integrations with HubSpot, Salesforce, and Pipedrive, plus a robust API for custom setups.',
    },
    {
      question: 'How does live coaching feedback work?',
      answer: 'During a live call, the AI analyzes the transcript in real-time and provides discreet tactical guidance, objection handling, and sentiment alerts via your dashboard.',
    },
  ]
}

export default function FAQ() {
  return (
    <div id='faq' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center">
      {/* Title */}
      <SlideEffect>
        <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 font-bold leading-normal">{settings.title}</h2>
      </SlideEffect>

      {/* Accordion */}
      <SlideEffect>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto text-base text-slate-700">
          {settings.faqs.map((faq, index) => (
            <AccordionItem key={index} value={index + '-item'} className="border-slate-200">
              <AccordionTrigger className="hover:text-blue-600 transition-colors text-left font-bold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SlideEffect>
    </div>
  )
}