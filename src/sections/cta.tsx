'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AnimatedGradient from "@/components/animated-gradient"

const settings = {
  title: 'Ready to Scale Your Sales Team?',
  description: 'Join hundreds of top-performing agencies using Closer Intellect AI to eliminate friction and close more deals.',
  CTA: {
    content: 'Try Now',
    href: 'https://app.closerintellect.ai'
  }
}

const gradientColors = ["#dc2626", "#991b1b", "#7f1d1d", "#450a0a", "#b91c1c"]

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="relative isolate overflow-hidden mx-auto text-center p-8 md:px-24 md:py-32 rounded-3xl bg-secondary shadow-2xl shadow-primary/20">
      {/* Background Gradient - absolute, fully outside flex flow */}
      <div className="!absolute inset-0 z-0 pointer-events-none !m-0">
        <AnimatedGradient colors={gradientColors} speed={10} blur="medium" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl lg:text-header font-bold leading-tight text-white max-w-2xl">{settings.title}</h2>

        {/* Description */}
        <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-xl mx-auto text-slate-300 text-sm lg:text-lg leading-relaxed">{settings.description}</p>

        {/* CTA Form */}
        <form 
          action="https://formsubmit.co/sales@closerintellect.ai" 
          method="POST"
          className="mt-6 flex flex-col gap-4 w-full max-w-md mx-auto text-left"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={settings.CTA.href} />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-200">Full Name</label>
            <input 
              type="text" 
              name="Full Name" 
              required
              placeholder="John Doe"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-200">Work Email</label>
            <input 
              type="email" 
              name="Work Email" 
              required
              placeholder="john@company.com"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-200">Phone Number</label>
            <div className="flex gap-2">
              <select 
                name="Country Code" 
                required 
                className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-[110px] cursor-pointer transition-all"
                defaultValue="+1"
              >
                <option value="+1" className="bg-zinc-900 text-white">US/CA (+1)</option>
                <option value="+44" className="bg-zinc-900 text-white">UK (+44)</option>
                <option value="+61" className="bg-zinc-900 text-white">AU (+61)</option>
                <option value="+91" className="bg-zinc-900 text-white">IN (+91)</option>
                <option value="+64" className="bg-zinc-900 text-white">NZ (+64)</option>
                <option value="+353" className="bg-zinc-900 text-white">IE (+353)</option>
              </select>
              <input 
                type="tel" 
                name="Phone Number" 
                required
                placeholder="(555) 000-0000"
                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 mt-2 p-3 bg-black/10 rounded-lg border border-white/5">
            <input 
              type="checkbox" 
              name="Compliance Agreement" 
              value="I agree to receive SMS communications and notifications from Closer Intellect AI."
              id="compliance"
              required
              className="mt-1 w-4 h-4 rounded border-white/10 bg-black/20 text-primary focus:ring-primary/50 accent-primary cursor-pointer shrink-0"
            />
            <label htmlFor="compliance" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
              I agree to receive SMS communications and notifications from Closer Intellect AI.
            </label>
          </div>

          <Button 
            type="submit" 
            className="btn-gradient border-none w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 mt-2" 
            size='lg'
          >
            {settings.CTA.content}
          </Button>

          <p className="text-center text-[11px] text-slate-400 mt-2 px-2">
            By submitting this form, you agree to our <Link href="/privacy" className="underline hover:text-slate-200 transition-colors">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-slate-200 transition-colors">Terms and Conditions</Link>. You can reply STOP to unsubscribe from SMS at any time.
          </p>
        </form>
      </div>
    </SlideEffect>
  )
}