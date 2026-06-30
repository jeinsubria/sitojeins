import TeamMember from '@/components/ui/TeamMember'
import { prisma } from '@/lib/prisma'
import type { TeamMember as TeamMemberModel } from '@prisma/client'

import type { Metadata } from 'next'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Chi Siamo - JEIns | Il Team e la Nostra Missione',
  description: 'Scopri JEIns, la Junior Enterprise dell\'Università dell\'Insubria. Conosci il nostro team di studenti motivati, la nostra missione e i valori che ci guidano nel fornire consulenza aziendale di qualità.',
  keywords: 'team JEIns, missione Junior Enterprise, valori universitari, studenti Insubria, chi siamo JEIns',
  openGraph: {
    title: 'Chi Siamo - JEIns | Il Team e la Nostra Missione',
    description: 'Scopri JEIns, la Junior Enterprise dell\'Università dell\'Insubria. Conosci il nostro team di studenti motivati e la nostra missione.',
    url: 'https://jeins.it/chi-siamo',
  },
  alternates: {
    canonical: 'https://jeins.it/chi-siamo',
  },
}

async function getTeamMembers(): Promise<TeamMemberModel[]> {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
  return members
}

export default async function ChiSiamoPage() {
  const teamMembers = await getTeamMembers()

  return (
    <main>
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 newspaper-headline tracking-tighter text-white">
              Chi siamo
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-neutral-400 font-light leading-relaxed">
              JUNIOR ENTERPRISE DELL’UNIVERSITA’ DEGLI STUDI DELL’INSUBRIA è un ponte tra il mondo accademico e quello professionale.
            </p>
          </div>
        </div>
      </section>

      {/* Mission e Vision */}
      <section className="py-32 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {/* Mission */}
            <div className="pb-16 md:pb-0 md:pr-16 animate-fade-in-left">
              <h2 className="text-2xl font-semibold text-insubria-400 mb-4">Mission</h2>
              <p className="text-white text-xl leading-relaxed font-light">
                Valorizziamo il talento degli studenti universitari attraverso esperienze concrete di consulenza, formazione pratica e collaborazione con imprese, istituzioni e territorio, favorendo crescita professionale, spirito imprenditoriale, responsabilità e impatto positivo sulla comunità.
              </p>
            </div>

            {/* Vision */}
            <div className="pt-16 md:pt-0 md:pl-16 animate-fade-in-right">
              <h2 className="text-2xl font-semibold text-insubria-400 mb-4">Vision</h2>
              <p className="text-white text-xl leading-relaxed font-light">
                Essere un ponte stabile tra università, mondo del lavoro e territorio, formando i professionisti del domani, capaci di affrontare la complessità, generare valore reale per organizzazioni e comunità, e contribuire allo sviluppo di un ecosistema più dinamico, innovativo e consapevole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="py-32 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold newspaper-headline text-white mb-20 animate-fade-in-up">
            I nostri valori
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0 divide-y divide-white/5 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:border-white/5 md:[&>*:nth-child(odd)]:pr-24">
            {[
              { title: 'Collaborazione', text: 'Lavoriamo insieme perché crediamo che la diversità di prospettive sia il motore dell\'innovazione reale.' },
              { title: 'Eccellenza', text: 'Ogni progetto è un\'opportunità per dare il meglio. Non consegniamo mai qualcosa di cui non siamo fieri.' },
              { title: 'Professionalità', text: 'Rispettiamo scadenze, impegni e clienti. Un approccio serio e competente non è un optional — è il minimo.' },
              { title: 'Innovazione', text: 'Guardiamo avanti. Portiamo idee fresche e soluzioni non convenzionali ai problemi di business.' },
            ].map((v, i) => (
              <div key={v.title} className="py-10 animate-fade-in-up" style={{animationDelay: `${i * 0.08}s`}}>
                <h3 className="text-xl font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Il Team */}
      <section className="py-32 relative">

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 newspaper-headline tracking-tighter">
              Il nostro team
            </h2>
            <p className="text-neutral-400 text-xl max-w-3xl mx-auto font-light">
              Gli studenti che rendono possibile JEIns e che portano innovazione 
              nel territorio insubre
            </p>
          </div>
          
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">
                I membri del team verranno aggiunti a breve.
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 justify-items-center ${
              teamMembers.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              teamMembers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              teamMembers.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              teamMembers.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className={`animate-fade-in-left hover-lift w-full`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <TeamMember
                    name={member.name}
                    role={member.role}
                    image={member.image || undefined}
                    description={member.description || undefined}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
