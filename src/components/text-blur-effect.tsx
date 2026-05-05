/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { HTMLMotionProps } from "motion/react"
import * as motion from "motion/react-m"

export default function TextBlurEffect({ children, ...props }: { children: string } & HTMLMotionProps<'span'>) {
  const words = children.split(' ');
  
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            // @ts-ignore
            <motion.span
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 0, filter: 'Blur(32px)', scale: 0.9, y: 20 }}
              animate={{ opacity: 1, filter: 'Blur(0)', scale: 1, y: 0 }}
              transition={{ 
                delay: (wordIndex * 5 + charIndex) * 0.035, 
                ease: [1, 0, 0, 1], 
                duration: 0.7 
              }}
              {...props}
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