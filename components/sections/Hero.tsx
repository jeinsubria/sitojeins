'use client'

import Link from 'next/link'
import FadeIn from '../ui/FadeIn'
import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  primaryCtaHref: string
  secondaryCtaHref: string
  backgroundImage?: string
}

const MotionLink = motion(Link)

export default function Hero({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  primaryCtaHref, 
  secondaryCtaHref,
  backgroundImage 
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}
      
      {/* Overlay glassmorfico scuro */}
      <div className="absolute inset-0 bg-insubria-900/60 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-insubria-900 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <FadeIn delay={0.2} direction="down">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </FadeIn>
        
        {/* CTA Buttons */}
        <FadeIn delay={0.6} direction="up" className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <MotionLink
            href={primaryCtaHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="cta-primary px-8 py-4 text-lg w-full sm:w-auto text-center"
          >
            {primaryCta}
          </MotionLink>
          <MotionLink
            href={secondaryCtaHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="cta-secondary px-8 py-4 text-lg w-full sm:w-auto text-center"
          >
            {secondaryCta}
          </MotionLink>
        </FadeIn>
      </div>
    </section>
  )
}

