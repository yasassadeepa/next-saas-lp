'use client'

import { useState } from "react"
import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import { CircleCheck, Star, X } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-m"

const settings = {
  badgeText: 'Features',
  title: 'Core features',
  features: [
    'Live AI Coach',
    'Smart Scheduler',
    'SMS Campaign',
    'Follow-up-Engine',
    'AI Roleplay',
    'Cold Universal Lead Search',
    'Lead Management',
    'Second Brain',
    'Lead Exchange',
  ],
}

const usageData = [
  { service: 'Full AI Handled Voice Calls', starter: '$0.3/min', growth: '$0.25/min' },
  { service: 'Full Human Handled Voice Calls', starter: '$0.04/min', growth: '$0.03/min' },
  { service: 'Human Handled with AI Coach', starter: '$0.3/min', growth: '$0.25/min' },
  { service: 'Human Handled with AI Coach with Live Translation', starter: '$0.4/min', growth: '$0.3/min' },
  { service: 'Human Sent SMS', starter: '$0.02/sms', growth: '$0.02/sms' },
  { service: 'AI Sent SMS', starter: '$0.03/sms', growth: '$0.02/sms' },
  { service: 'AI Roleplay', starter: '$0.35/min', growth: '$0.25/min' },
]

export default function CoreFeatures() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div id='core-features' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center max-w-5xl">
      {/* Title & Badge outside the card for consistency */}
      <div className="space-y-4">
        <SlideEffect>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mx-auto">
            <Star size={12} fill="currentColor" />
            {settings.badgeText}
          </div>
        </SlideEffect>
        
        <SlideEffect>
          <h2 className="text-2xl md:text-4xl lg:text-header text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-bold leading-normal">
            {settings.title}
          </h2>
        </SlideEffect>
      </div>

      <SlideEffect isSpring={false} className="w-full">
        <Card className="bg-secondary border-border shadow-soft p-6 md:p-10 text-start overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none" />
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 relative z-10">
            {settings.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 group/item transition-all duration-300">
                <div className="flex-shrink-0 bg-primary/10 p-1 rounded-full group-hover/item:bg-primary/20 transition-colors">
                  <CircleCheck className="text-primary" size={18} />
                </div>
                <span className="text-zinc-400 text-base font-medium group-hover/item:text-white transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Usage Note */}
          <div className="mt-12 pt-6 border-t border-border/50">
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              *Usage based charges apply. {' '}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-primary hover:text-accent transition-all font-medium underline underline-offset-4 decoration-primary/30 cursor-pointer"
              >
                Click here
              </button>
              {' '} to learn more about general usage pricing.
            </p>
          </div>
        </Card>
      </SlideEffect>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top accent glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="p-6 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-start justify-between mb-8 md:mb-10">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight">Usage Billing System</h3>
                    <p className="text-zinc-500 text-xs md:text-sm">Transparent pricing for every interaction.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-zinc-400 hover:text-white border border-transparent hover:border-border/50 shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="rounded-2xl border border-border/30 overflow-hidden bg-secondary/30">
                  <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-start border-collapse min-w-[450px]">
                      <thead>
                        <tr className="bg-white/[0.02]">
                          <th className="py-4 px-4 md:px-6 text-start text-zinc-500 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Service</th>
                          <th className="py-4 px-4 md:px-6 text-center text-zinc-500 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] border-l border-border/20">Starter Closer</th>
                          <th className="py-4 px-4 md:px-6 text-center text-zinc-500 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] border-l border-border/20">Growth Agency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20">
                        {usageData.map((item, index) => (
                          <tr key={index} className="group/row hover:bg-white/[0.03] transition-colors">
                            <td className="py-4 px-4 md:px-6 text-zinc-300 text-xs md:text-base font-medium transition-colors group-hover/row:text-white leading-tight">
                              {item.service}
                            </td>
                            <td className="py-4 px-4 md:px-6 text-center border-l border-border/10">
                              <span className="text-primary font-bold text-xs md:text-lg tracking-tight">
                                {item.starter}
                              </span>
                            </td>
                            <td className="py-4 px-4 md:px-6 text-center border-l border-border/10 bg-primary/5 group-hover/row:bg-primary/10 transition-colors">
                              <span className="text-accent font-bold text-xs md:text-lg tracking-tight">
                                {item.growth}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-zinc-500 text-[9px] md:text-xs italic max-w-md order-2 sm:order-1">
                    * Rates are optimized for high-volume operations. Prices are per minute or per message as indicated.
                  </p>
                  <div className="flex items-center gap-2 order-1 sm:order-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-zinc-400">Live Rates Applied</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
