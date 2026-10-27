'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const boardMembers = [
  { name: 'Riccardo Cavarretta', role: 'Presidente', image: '/images/team/riccardo-cavarretta.jpg' },
  { name: 'Gabriele Fossati', role: 'International Manager', image: '/images/team/gabriele.jpg' },
  { name: 'Kesniia Skorokyrzha', role: 'Segretaria Generale', image: '/images/team/ksenia.jpg' },
  { name: 'Marco Toni', role: 'Tesoriere', image: '/images/team/marco-toni.jpg' },
]

const managers = [
  { name: 'Responsabile IT', department: 'Area IT', image: '/images/team/responsabile-it.jpg' },
  { name: 'Responsabile HR', department: 'Area HR', image: '/images/team/responsabile-hr.jpg' },
  { name: 'Manager Commerciale & Legal', department: 'Area Commerciale e Legal', image: '/images/team/manager-commerciale-legal.jpg' },
  { name: 'Responsabile Marketing', department: 'Area Marketing', image: '/images/team/responsabile-marketing.jpg' },
]

export default function MembersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <div className="w-full">
      {/* Sezione Board (Timeline) */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Linea centrale (sfondo) nascosta su mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 rounded-full" />
        
        {/* Linea centrale animata (bianca) nascosta su mobile */}
        <motion.div 
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white -translate-x-1/2 origin-top rounded-full"
          style={{ scaleY: scrollYProgress }}
        />

        <div className="space-y-24 md:space-y-40 relative z-10">
          {boardMembers.map((member, i) => {
            const isEven = i % 2 === 0
            return (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                {/* Immagine */}
                <div className={`w-full md:w-1/2 flex ${isEven ? 'md:pr-16 md:justify-end' : 'md:pl-16 md:justify-start md:order-2'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full aspect-[4/5] max-w-sm bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden"
                  >
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-light">
                        Nessuna Foto
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Pallino sulla linea temporale (solo desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-insubria-500 rounded-full border-4 border-neutral-950 z-20" />

                {/* Testo */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:pl-16 text-left md:order-2' : 'md:pr-16 md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-xl text-insubria-500 font-medium">{member.role}</p>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sezione Managers (Carosello Marquee) */}
      <div className="py-24 bg-neutral-900/50 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">I nostri Manager</h2>
          <p className="text-neutral-400 text-lg">Le figure chiave che guidano i nostri dipartimenti</p>
        </div>

        <div className="relative w-full flex overflow-hidden group">
          {/* Contenitore a scorrimento infinito continuo */}
          <motion.div 
            className="flex space-x-8 px-4 whitespace-nowrap min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* Duplichiamo gli elementi per garantire un loop continuo al 50% */}
            {[...managers, ...managers, ...managers, ...managers].map((manager, i) => (
              <div key={i} className="w-72 flex-shrink-0 inline-flex flex-col gap-4">
                <div className="w-full aspect-square bg-neutral-950 border border-white/10 rounded-2xl relative overflow-hidden shadow-xl">
                  {manager.image ? (
                    <img 
                      src={manager.image} 
                      alt={manager.name} 
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-light">
                      Nessuna Foto
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white">{manager.name}</h4>
                  <p className="text-insubria-400 text-sm font-medium">{manager.department}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
