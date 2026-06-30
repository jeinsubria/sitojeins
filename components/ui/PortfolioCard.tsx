'use client'

import { motion } from 'framer-motion'

interface PortfolioCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  client?: string
}

export default function PortfolioCard({ 
  title, 
  description, 
  tags, 
  image, 
  client 
}: PortfolioCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-300 h-full flex flex-col"
    >
      {image && (
        <div className="h-48 bg-insubria-50 flex items-center justify-center overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        {client && (
          <p className="text-sm text-insubria-600 font-semibold mb-3 tracking-wide">
            {client}
          </p>
        )}
        
        <h3 className="text-xl font-bold text-neutral-900 mb-3">
          {title}
        </h3>
        
        <p className="text-neutral-500 mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-neutral-50 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium border border-neutral-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

