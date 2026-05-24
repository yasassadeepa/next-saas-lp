'use client'

import Logo from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"
import { AlignJustify, X } from "lucide-react"
import { AnimatePresence } from 'motion/react'
import * as motion from "motion/react-m"
import { useState } from "react"

const settings = {
  navLinks: [
    { name: 'home', href: '/' },
    { name: 'features', href: '#features' },
    { name: 'pricing', href: '#pricing' },
    { name: 'leadership', href: '#leadership' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Docs', href: 'https://docs.closerintellect.ai' },
  ],
  cta: {
    content: 'Get Started',
    href: 'https://app.closerintellect.ai'
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full h-fit py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href='/' title="Home" id="Logo">
        <Logo />
      </Link>

      {/* desktop menu */}
      <div className="items-center justify-center gap-5 hidden md:flex">

        {/* Nav Links */}
        <ul className="flex items-center justify-center gap-7 text-muted font-medium select-none text-sm">
          {settings.navLinks.map(link => (
            <li key={link.name}>
              <Link href={link.href} title={link.name} className="hover:text-primary transition-colors capitalize">{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Call To Action */}
        <Link href={settings.cta.href} title={settings.cta.content}>
          <Button className="btn-gradient border-none px-6 h-10 shadow-md shadow-primary/20">{settings.cta.content}</Button>
        </Link>
      </div>

      {/* mobile only - burger menu icon */}
      <motion.div
        initial={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-secondary shadow-soft p-2 rounded-lg flex md:hidden cursor-pointer text-white border border-border"
        onClick={toggleMenu}
      >
        {!isOpen && <AlignJustify size={20} />}
        {isOpen && <X size={20} />}
      </motion.div>

      {/* mobile only - menu container with AnimatePresence for exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 1, y: -20 }}
            animate={{ height: '100vh', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 1, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed flex flex-col md:hidden top-16 left-0 w-full bg-background z-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <ul className="flex flex-col space-y-4 text-white font-bold select-none text-lg">
                {settings.navLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} title={link.name} onClick={toggleMenu} className="block py-2 capitalize hover:text-primary transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>

              <Link href={settings.cta.href} title={settings.cta.content} onClick={toggleMenu}>
                <Button className="w-full btn-gradient h-12 text-lg shadow-lg shadow-primary/20">{settings.cta.content}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}