'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AnimatedGradient from "@/components/animated-gradient"
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react"
import { type FormEvent, useEffect, useRef, useState } from "react"

const settings = {
  title: 'Ready to Scale Your Sales Team?',
  description: 'Join hundreds of top-performing agencies using Closer Intellect AI to eliminate friction and close more deals.',
  CTA: {
    content: 'Try Now',
    href: 'https://app.closerintellect.ai'
  }
}

const gradientColors = ["#dc2626", "#991b1b", "#7f1d1d", "#450a0a", "#b91c1c"]

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

type InquiryResponse = {
  success?: boolean
  redirectUrl?: string
  message?: string
  error?: string
}

function getSafeRedirectUrl(candidate?: string) {
  if (!candidate) return settings.CTA.href

  try {
    const url = new URL(candidate)
    const isLocalDevelopment =
      url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)

    return url.protocol === 'https:' || isLocalDevelopment
      ? url.toString()
      : settings.CTA.href
  } catch {
    return settings.CTA.href
  }
}

export default function CTA() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [redirectUrl, setRedirectUrl] = useState(settings.CTA.href)
  const submissionLocked = useRef(false)
  const submissionKey = useRef<string | null>(null)
  const submissionPayload = useRef<string | null>(null)

  useEffect(() => {
    if (submissionState !== 'success') return

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(redirectUrl)
    }, 2500)

    return () => window.clearTimeout(redirectTimer)
  }, [redirectUrl, submissionState])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submissionLocked.current || submissionState === 'success') return

    submissionLocked.current = true

    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmissionState('submitting')
    setStatusMessage('Sending your inquiry...')

    try {
      const serializedPayload = JSON.stringify({
        fullName: String(formData.get('fullName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
        phoneCountryCode: String(formData.get('phoneCountryCode') ?? '').trim(),
        phoneNumber: String(formData.get('phoneNumber') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        consent: formData.get('consent') === 'on',
        source: 'homepage-contact',
        website: String(formData.get('website') ?? '').trim(),
      })

      if (!submissionKey.current || submissionPayload.current !== serializedPayload) {
        submissionKey.current = window.crypto.randomUUID()
        submissionPayload.current = serializedPayload
      }

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': submissionKey.current,
        },
        body: serializedPayload,
      })

      const data = (await response.json().catch(() => ({}))) as InquiryResponse

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'We could not send your inquiry. Please try again.')
      }

      setRedirectUrl(getSafeRedirectUrl(data.redirectUrl))
      setSubmissionState('success')
      setStatusMessage('Thanks! Your inquiry was received. Taking you to account setup...')
      form.reset()
    } catch (error) {
      submissionLocked.current = false
      setSubmissionState('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'We could not send your inquiry. Please try again.'
      )
    }
  }

  const isSubmitting = submissionState === 'submitting'
  const isSuccessful = submissionState === 'success'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24">
      <SlideEffect isSpring={false} className="relative isolate overflow-hidden mx-auto text-center p-8 md:px-24 md:py-32 rounded-3xl bg-secondary shadow-2xl shadow-primary/20">
        {/* Background Gradient - absolute, fully outside flex flow */}
        <div className="!absolute inset-0 z-0 pointer-events-none !m-0">
          <AnimatedGradient colors={gradientColors} speed={10} blur="medium" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          {/* Title */}
          <h2 id="contact-heading" className="text-3xl md:text-5xl lg:text-header font-bold leading-tight text-white max-w-2xl">{settings.title}</h2>

          {/* Description */}
          <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-xl mx-auto text-slate-300 text-sm lg:text-lg leading-relaxed">{settings.description}</p>

          {/* CTA Form */}
          <form
            action="/api/inquiries"
            method="post"
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-4 w-full max-w-md mx-auto text-left"
            aria-describedby="inquiry-status"
          >
            <input type="hidden" name="source" value="homepage-contact" />

            {/* Spam trap: hidden from people, available to unsophisticated bots. */}
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-slate-200">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                required
                maxLength={100}
                disabled={isSubmitting || isSuccessful}
                placeholder="John Doe"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">Work Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  disabled={isSubmitting || isSuccessful}
                  placeholder="john@company.com"
                  className="w-full min-w-0 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-sm font-medium text-slate-200">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  maxLength={120}
                  disabled={isSubmitting || isSuccessful}
                  placeholder="Company name"
                  className="w-full min-w-0 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-200">Phone Number</label>
              <div className="flex gap-2">
                <label htmlFor="phoneCountryCode" className="sr-only">Country calling code</label>
                <select
                  id="phoneCountryCode"
                  name="phoneCountryCode"
                  required
                  disabled={isSubmitting || isSuccessful}
                  aria-label="Country calling code"
                  className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-[110px] cursor-pointer disabled:opacity-60 transition-all"
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
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  autoComplete="tel-national"
                  required
                  maxLength={30}
                  disabled={isSubmitting || isSuccessful}
                  placeholder="(555) 000-0000"
                  className="min-w-0 flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-slate-200">
                How can we help? <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={2000}
                disabled={isSubmitting || isSuccessful}
                placeholder="Tell us about your sales team and what you want to improve."
                className="w-full resize-y bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
              />
            </div>

            <div className="flex items-start gap-3 mt-2 p-3 bg-black/10 rounded-lg border border-white/5">
              <input
                type="checkbox"
                name="consent"
                id="compliance"
                required
                disabled={isSubmitting || isSuccessful}
                className="mt-1 w-4 h-4 rounded border-white/10 bg-black/20 text-primary focus:ring-primary/50 accent-primary cursor-pointer shrink-0 disabled:opacity-60"
              />
              <label htmlFor="compliance" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                I agree to receive SMS communications and notifications from Closer Intellect AI.
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isSuccessful}
              aria-busy={isSubmitting}
              className="btn-gradient border-none w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 mt-2"
              size='lg'
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle aria-hidden="true" className="animate-spin" />
                  Sending...
                </>
              ) : isSuccessful ? (
                <>
                  <CheckCircle2 aria-hidden="true" />
                  Inquiry received
                </>
              ) : settings.CTA.content}
            </Button>

            <div
              id="inquiry-status"
              role={submissionState === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              className={`min-h-6 text-center text-sm ${
                submissionState === 'error' ? 'text-red-200' : 'text-slate-200'
              }`}
            >
              {statusMessage}
            </div>

            {isSuccessful && (
              <Link
                href={redirectUrl}
                className="mx-auto inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Continue to account setup now
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}

            <p className="text-center text-[11px] text-slate-400 mt-2 px-2">
              By submitting this form, you agree to our <Link href="/privacy" className="underline hover:text-slate-200 transition-colors">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-slate-200 transition-colors">Terms and Conditions</Link>. You can reply STOP to unsubscribe from SMS at any time.
            </p>
          </form>
        </div>
      </SlideEffect>
    </section>
  )
}
