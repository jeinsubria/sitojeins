'use client'

import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  sector: string
  ctaText?: string
  ctaHref?: string
}

export default function ServiceCard({ 
  title, 
  description, 
  sector, 
  ctaText = "Richiedi un preventivo",
  ctaHref = "/contatti"
}: ServiceCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="bg-white border border-neutral-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-premium transition-shadow duration-300 h-full flex flex-col overflow-hidden"
    >
      <div className="mb-5">
        <span className="inline-block bg-insubria-50 text-insubria-600 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
          {sector}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-neutral-900 mb-3">
        {title}
      </h3>
      
      <p className="text-neutral-500 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <motion.a
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        href={ctaHref}
        className="inline-flex items-center text-insubria-600 font-semibold hover:text-insubria-700 transition-colors mt-auto"
      >
        {ctaText} 
        <span className="ml-2">→</span>
      </motion.a>
    </motion.div>
  )
}

