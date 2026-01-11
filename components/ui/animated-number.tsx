"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedNumberProps {
  value: number | string
  duration?: number
  className?: string
}

export function AnimatedNumber({ value, duration = 1000, className }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousValue = useRef(0)

  useEffect(() => {
    const numericValue = typeof value === "string" ? Number.parseInt(value.replace(/\D/g, ""), 10) || 0 : value
    const startValue = previousValue.current
    const endValue = numericValue
    const startTime = performance.now()

    setIsAnimating(true)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (endValue - startValue) * easeOut)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        previousValue.current = endValue
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  // Handle formatted strings like "80 / 70"
  if (typeof value === "string" && value.includes("/")) {
    const parts = value.split("/").map((p) => p.trim())
    return (
      <span className={className}>
        <AnimatedNumber value={parts[0]} duration={duration} /> /{" "}
        <AnimatedNumber value={parts[1]} duration={duration} />
      </span>
    )
  }

  return <span className={className}>{displayValue.toLocaleString()}</span>
}
