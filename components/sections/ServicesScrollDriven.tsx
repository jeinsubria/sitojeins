'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  sector: string
}

interface Props {
  services: Service[]
}

const accentColors: Record<string, string> = {
  'IT & Digital':     'text-sky-400',
  'Business':         'text-violet-400',
  'Marketing':        'text-pink-400',
  'Research':         'text-amber-400',
  'Design':           'text-rose-400',
  'Data & Analytics': 'text-teal-400',
}

const panelGradients: Record<string, string> = {
  'IT & Digital':     'from-sky-900/20 to-transparent',
  'Business':         'from-violet-900/20 to-transparent',
  'Marketing':        'from-pink-900/20 to-transparent',
  'Research':         'from-amber-900/20 to-transparent',
  'Design':           'from-rose-900/20 to-transparent',
  'Data & Analytics': 'from-teal-900/20 to-transparent',
}

export default function ServicesScrollDriven({ services }: Props) {
  const [active, setActive] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const leftColRef = useRef<HTMLDivElement>(null)
  const accumulatorRef = useRef(0)
  const isHoveringRef = useRef(false)
  const activeRef = useRef(0)
  const THRESHOLD = 80

  // Teniamo activeRef sincronizzato per usarlo dentro il listener DOM
  useEffect(() => { activeRef.current = active }, [active])
  useEffect(() => { isHoveringRef.current = isHovering }, [isHovering])

  // Listener DOM con passive:false — l'unico modo per bloccare lo scroll della pagina
  useEffect(() => {
    const el = leftColRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (!isHoveringRef.current) return

      e.preventDefault() // funziona perché passive:false
      e.stopPropagation()

      accumulatorRef.current += e.deltaY

      if (accumulatorRef.current > THRESHOLD) {
        accumulatorRef.current = 0
        setActive((prev) => Math.min(prev + 1, services.length - 1))
      } else if (accumulatorRef.current < -THRESHOLD) {
        accumulatorRef.current = 0
        setActive((prev) => Math.max(prev - 1, 0))
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [services.length])

  const current = services[active]

  return (
    <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center w-full">

      {/* ── Sinistra: nome + wheel capture ── */}
      <div
        ref={leftColRef}
        className="w-full md:w-1/2 select-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); accumulatorRef.current = 0 }}
        style={{ cursor: isHovering ? 'ns-resize' : 'default' }}
      >
        {/* Contatore + dots */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-neutral-500">
            {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
          <div className="flex gap-1.5">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-insubria-500' : 'w-2 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Nome animato */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 24, mass: 0.8 }}
          >
            <span className={`text-xs font-semibold uppercase tracking-wide mb-4 block ${accentColors[current?.sector] || 'text-insubria-500'}`}>
              {current?.sector}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter">
              {current?.title}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        <motion.p
          animate={{ opacity: isHovering ? 0 : [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="mt-8 text-xs text-neutral-600 font-mono tracking-widest flex items-center gap-2 pointer-events-none"
        >
          ↕ SCORRI QUI PER ESPLORARE
        </motion.p>
      </div>

      {/* ── Destra: scheda ── */}
      <div className="w-full md:w-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 24, mass: 0.8, delay: 0.04 }}
          >
            <div className={`newspaper-card p-10 bg-gradient-to-br ${panelGradients[current?.sector] || 'from-insubria-900/20 to-transparent'}`}>
              <p className="text-neutral-300 font-light leading-relaxed text-lg mb-10">
                {current?.description}
              </p>
              <a
                href="/contatti"
                className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/15 px-5 py-2.5 rounded-full hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Richiedi un preventivo →
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
