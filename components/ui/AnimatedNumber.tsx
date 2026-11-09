'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedNumber({ value, suffix = '', duration = 2 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const springValue = useSpring(0, { duration: duration * 1000, bounce: 0 })
  // Il valore finale è già nell'HTML, così lo vede anche chi non esegue JavaScript (es. Google).
  // Dopo il caricamento si riparte da 0 per l'animazione.
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(0)
  }, [])

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}
