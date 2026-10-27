import MembersSection from '@/components/sections/MembersSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membri - JEIns | Il nostro Team',
  description: 'Scopri i membri di JEIns, il team di studenti della Junior Enterprise dell\'Università dell\'Insubria.',
  keywords: 'team JEIns, membri Junior Enterprise, studenti Insubria, team consulenza, membri JEIns',
  openGraph: {
    title: 'Membri - JEIns | Il nostro Team',
    description: 'Scopri i membri di JEIns, il team di studenti della Junior Enterprise dell\'Università dell\'Insubria.',
    url: 'https://jeins.it/membri',
  },
  alternates: {
    canonical: 'https://jeins.it/membri',
  },
}

export default function MembriPage() {
  return (
    <main>
      <section className="pt-32 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 newspaper-headline tracking-tighter text-white">
            I nostri membri
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-neutral-400 font-light leading-relaxed">
            Gli studenti che rendono possibile JEIns e che portano innovazione nel territorio insubre
          </p>
        </div>
      </section>

      <MembersSection />
    </main>
  )
}
