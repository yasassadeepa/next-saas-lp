'use client'

import { MotionProps } from "motion/react"
import * as motion from "motion/react-m"

export default function TextRevealEffect({ children, className }: { children: string } & React.ComponentProps<'span'> & MotionProps) {
  const words = children.split(' ');
  
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: (wordIndex * 3 + charIndex) * 0.015, 
                ease: [1, 0, 0, 1], 
                duration: 1 
              }}
              viewport={{ once: true }}
              className={className}
            >
              {char}
            </motion.span>
          ))}
          {/* Space between words */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block" key={`space-${wordIndex}`}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  )
}