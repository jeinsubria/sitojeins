'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidProgressBass from '../ui/LiquidProgressBass'

const stepsContent = [
  {
    title: 'Analisi',
    description: 'Comprendiamo le tue esigenze e analizziamo il contesto aziendale in dettaglio per individuare le opportunità di crescita.'
  },
  {
    title: 'Progettazione',
    description: 'Sviluppiamo una strategia personalizzata, definendo gli strumenti e i processi ideali per raggiungere i tuoi obiettivi.'
  },
  {
    title: 'Implementazione',
    description: 'Mettiamo in pratica la soluzione progettata, con un monitoraggio costante e un approccio agile e flessibile.'
  },
  {
    title: 'Follow-up',
    description: 'Monitoriamo i risultati finali, raccogliamo feedback e ottimizziamo la soluzione per garantire il massimo impatto nel tempo.'
  }
]

export default function ProcessWorkFlow() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
      <LiquidProgressBass 
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        totalSteps={4}
        showControls={false}
      />
      
      <div className="mt-12 w-full max-w-2xl newspaper-card p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-center flex flex-col items-center"
          >
            <span className="text-insubria-500 font-mono text-xs font-bold tracking-widest uppercase mb-3">
              Step {currentStep}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              {stepsContent[currentStep - 1].title}
            </h3>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-light">
              {stepsContent[currentStep - 1].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
