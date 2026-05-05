"use client"

import React, { useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { useDimensions } from "@/hooks/use-dimensions"

interface AnimatedGradientProps {
  colors: string[]
  speed?: number
  blur?: "light" | "medium" | "heavy"
  className?: string
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height) || 800,
    [dimensions.width, dimensions.height]
  )

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
        ? "blur-3xl"
        : "blur-[100px]"

  // Pre-generate random properties for each color on the client only
  const circleProps = useMemo(() => {
    if (!isClient) return []
    return colors.map(() => ({
      top: `${Math.random() * 80 - 15}%`,
      left: `${Math.random() * 80 - 15}%`,
      sizeMultiplier: randomInt(0.8, 1.2),
      tx1: Math.random() - 0.5,
      ty1: Math.random() - 0.5,
      tx2: Math.random() - 0.5,
      ty2: Math.random() - 0.5,
      tx3: Math.random() - 0.5,
      ty3: Math.random() - 0.5,
      tx4: Math.random() - 0.5,
      ty4: Math.random() - 0.5,
    }))
  }, [colors, isClient, dimensions.width, dimensions.height])

  if (!isClient) return <div className="absolute inset-0 bg-slate-900/50" />


  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn(`absolute inset-0`, blurClass)}>
        {circleProps.map((props, index) => {
          const animationProps = {
            animation: `background-gradient ${speed}s infinite ease-in-out`,
            animationDuration: `${speed}s`,
            top: props.top,
            left: props.left,
            "--tx-1": props.tx1,
            "--ty-1": props.ty1,
            "--tx-2": props.tx2,
            "--ty-2": props.ty2,
            "--tx-3": props.tx3,
            "--ty-3": props.ty3,
            "--tx-4": props.tx4,
            "--ty-4": props.ty4,
          } as React.CSSProperties

          return (
            <svg
              key={index}
              className={cn("absolute", "animate-background-gradient")}
              width={circleSize * props.sizeMultiplier}
              height={circleSize * props.sizeMultiplier}
              viewBox="0 0 100 100"
              style={animationProps}
            >
              <circle cx="50" cy="50" r="50" fill={colors[index]} />
            </svg>
          )
        })}
      </div>
    </div>
  )
}

export default AnimatedGradient
