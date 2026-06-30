'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  totalSteps?: number;
  showControls?: boolean;
};

export default function LiquidProgressBass({
  currentStep: controlledStep,
  onStepChange,
  totalSteps = 4,
  showControls = true,
}: Props) {
  const [internalStep, setInternalStep] = useState(1);
  const currentStep = controlledStep ?? internalStep;

  const setStep = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), totalSteps);
    onStepChange?.(clamped);
    if (controlledStep === undefined) setInternalStep(clamped);
  };

  const progress = (currentStep - 1) / Math.max(totalSteps - 1, 1);

  return (
    <motion.div
      layout
      className="w-full max-w-2xl mx-auto flex flex-col items-center"
    >
      <motion.div layout className="relative flex justify-between w-full items-center mb-10 px-2">
        <div className="absolute top-1/2 left-2 right-2 h-[2px] -translate-y-1/2 z-0 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-insubria-500/50 to-white/50"
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-2 h-[2px] -translate-y-1/2 z-[1] origin-left"
          animate={{
            width: `calc(${progress * 100}% - 16px)`,
            borderRadius: ['9999px', '42% 58% 48% 52%', '9999px'],
            boxShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 10px rgba(255,255,255,0.4)',
              '0 0 0px rgba(255,255,255,0)',
            ],
          }}
          transition={{
            width: { type: 'spring', stiffness: 100, damping: 20 },
            borderRadius: { duration: 0.55, ease: 'easeInOut' },
            boxShadow: { duration: 0.55, ease: 'easeInOut' },
          }}
        >
          <motion.div className="h-full w-full rounded-[inherit] bg-white" layout />
        </motion.div>

        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isCompleted = currentStep >= stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <motion.button
              layout
              type="button"
              key={stepNumber}
              onClick={() => setStep(stepNumber)}
              className="relative z-10 focus:outline-none rounded-full group"
              aria-label={`Vai allo step ${stepNumber}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <motion.div
                whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' }}
                animate={{
                  scale: isCurrent ? 1.15 : isCompleted ? 1 : 0.95,
                  backgroundColor: isCompleted ? '#ffffff' : '#022c22',
                  borderColor: isCompleted ? '#ffffff' : 'rgba(255,255,255,0.2)',
                  color: isCompleted ? '#022c22' : '#a3a3a3',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center font-mono text-sm font-bold group-hover:border-white/50 transition-colors"
              >
                {stepNumber}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {showControls && (
        <motion.div layout className="flex gap-4">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setStep(currentStep - 1)}
            className="px-6 py-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-colors text-neutral-300 rounded-xl text-sm font-medium disabled:opacity-40"
          >
            Indietro
          </button>
          <button
            type="button"
            disabled={currentStep === totalSteps}
            onClick={() => setStep(currentStep + 1)}
            className="px-6 py-2 bg-white hover:bg-neutral-100 transition-colors text-neutral-900 rounded-xl text-sm font-medium disabled:opacity-40"
          >
            Avanti
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
