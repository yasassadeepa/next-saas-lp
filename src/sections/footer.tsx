'use client'

import { Facebook, Github, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

const settings = {
  links: [
    { title: 'Home', href: '/' },
    { title: 'Features', href: '#features' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'Testimonials', href: '#testimonials' },
    { title: 'FAQ', href: '#faq' },
  ],
  socialMedia: [
    { title: 'Facebook', icon: Facebook, href: '/' },
    { title: 'Instagram', icon: Instagram, href: '/' },
    { title: 'Github', icon: Github, href: '/' },
    { title: 'Youtube', icon: Youtube, href: '/' },
  ],
  copyright: '© 2026 Closer Intellect AI. All rights reserved.'
}

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-16 flex flex-col items-center justify-center gap-7 md:gap-10 text-sm border-t border-slate-100 text-muted">
      {/* Nav Links */}
      <div className="flex flex-wrap md:flex-row items-center justify-center gap-7 md:gap-10 font-medium text-slate-600">
        {settings.links.map(link => (
          <Link key={link.title} href={link.href} className="hover:text-blue-600 transition-colors">{link.title}</Link>
        ))}
      </div>

      {/* Social links */}
      <div className="flex flex-wrap md:flex-row items-center justify-center gap-7 md:gap-10 text-slate-400">
        {settings.socialMedia.map((social, index) => (
          <Link title={social.title} key={index} href={social.href} className="hover:text-blue-600 transition-colors"><social.icon size={20} /></Link>
        ))}
      </div>

      {/* copyright */}
      <p className="text-center text-xs opacity-60">{settings.copyright}</p>
    </footer>
  )
}