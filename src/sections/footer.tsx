'use client'

import { Facebook, Github, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/logo"

const settings = {
  links: [
    { title: 'Home', href: '/' },
    { title: 'Features', href: '#features' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'Leadership', href: '#leadership' },
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
    <footer className="w-full py-8 md:py-16 flex flex-col items-center justify-center gap-7 md:gap-10 text-sm border-t border-border text-muted overflow-hidden">
      {/* Brand Logo */}
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Logo className="scale-125" />
      </Link>

      {/* Nav Links */}
      <div className="flex flex-wrap md:flex-row items-center justify-center gap-7 md:gap-10 font-medium text-muted">
        {settings.links.map(link => (
          <Link key={link.title} href={link.href} className="hover:text-primary transition-colors">{link.title}</Link>
        ))}
      </div>

      {/* Social links */}
      <div className="flex flex-wrap md:flex-row items-center justify-center gap-7 md:gap-10 text-muted">
        {settings.socialMedia.map((social, index) => (
          <Link title={social.title} key={index} href={social.href} className="hover:text-primary transition-colors"><social.icon size={20} /></Link>
        ))}
      </div>

      {/* Large Brand Mark (Landscape View) */}
      <div className="w-full relative mt-4 md:mt-8 select-none pointer-events-none opacity-[0.05] md:opacity-[0.1]">
        <h2 className="text-[8vw] font-black text-center tracking-tighter leading-none whitespace-nowrap uppercase">
          Closer Intellect AI
        </h2>
      </div>

      {/* copyright */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-xs opacity-60">{settings.copyright}</p>
      </div>
    </footer>
  )
}
