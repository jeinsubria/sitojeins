'use client'

import { motion } from 'framer-motion'

// Foto del mandato: per aggiungerne una, metti il file in public/images/mandato/ e aggiungi una riga qui.
const photos = [
  { src: '/images/mandato/foto-gruppo.jpg', alt: 'Foto di gruppo dei membri JEIns' },
  { src: '/images/mandato/evento-liuc.jpg', alt: 'Evento Next JEn Consulting alla LIUC Business School' },
  { src: '/images/mandato/pwc.jpg', alt: 'Foto di gruppo durante un evento con PwC' },
  { src: '/images/mandato/lavoro-di-gruppo.jpg', alt: 'Membri JEIns durante un lavoro di gruppo' },
  { src: '/images/mandato/next-consulting.jpg', alt: 'Foto di gruppo al Next JEn Consulting' },
]

function Column({ items, duration }: { items: typeof photos; duration: number }) {
  return (
    <div className="relative h-full overflow-hidden">
      {/* La colonna contiene le foto due volte: scorrendo dall'alto verso il basso di metà altezza, il loop è continuo */}
      <motion.div
        className="flex flex-col gap-6"
        animate={{ y: ['-50%', '0%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration }}
      >
        {[...items, ...items].map((photo, i) => (
          <div
            key={i}
            className="w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl"
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-auto block" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function MandatoCarousel() {
  // Seconda colonna con ordine diverso, così le due colonne non mostrano la stessa foto affiancata
  const shifted = [...photos.slice(2), ...photos.slice(0, 2)]

  return (
    <section className="py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold newspaper-headline text-white mb-6 text-center animate-fade-in-up">
          Il nostro mandato
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed text-center mb-16">
          Eventi, formazioni e momenti insieme che raccontano il nostro anno.
        </p>

        <div
          className="relative h-[600px] md:h-[700px] grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <Column items={photos} duration={40} />
          <div className="hidden md:block h-full">
            <Column items={shifted} duration={52} />
          </div>
        </div>
      </div>
    </section>
  )
}
