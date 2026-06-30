import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini e Condizioni - JEIns',
  description: 'Termini e Condizioni di utilizzo del sito e dei servizi di JUNIOR ENTERPRISE DELL\'UNIVERSITA\' DEGLI STUDI DELL\'INSUBRIA.',
  alternates: { canonical: 'https://jeins.it/terms' },
}

export default function TermsPage() {
  return (
    <main>
      <section className="py-32 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-bold newspaper-headline text-white mb-4">Termini e Condizioni</h1>
            <p className="text-neutral-400 font-light">Versione 1.0 — Ultima modifica: 10/04/2026</p>
          </div>

          <div className="space-y-10 animate-fade-in-up">

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Oggetto</h2>
              <p className="text-neutral-400 leading-relaxed font-light">I presenti termini e condizioni regolano l&apos;utilizzo del sito web e dei servizi offerti da JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Servizi offerti</h2>
              <p className="text-neutral-400 leading-relaxed font-light">JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA offre servizi di consulenza aziendale, sviluppo software, marketing digitale e formazione.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Responsabilità</h2>
              <p className="text-neutral-400 leading-relaxed font-light">JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA si impegna a fornire servizi di qualità, mantenendo la massima professionalità e riservatezza.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Modifiche</h2>
              <p className="text-neutral-400 leading-relaxed font-light">JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA si riserva il diritto di modificare i presenti termini e condizioni in qualsiasi momento.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Legge applicabile</h2>
              <p className="text-neutral-400 leading-relaxed font-light">I presenti termini sono regolati dalla legge italiana.</p>
            </div>

            <div className="border-t border-white/5 pt-10">
              <h2 className="text-2xl font-semibold text-white mb-4">Contatti</h2>
              <div className="space-y-2 text-neutral-400 font-light">
                <p>JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA</p>
                <p>Sede legale: Via Stefano da Seregno n.31, 20831 Seregno (MB)</p>
                <p>Email: <a href="mailto:jeinsubria@gmail.com" className="text-insubria-400 hover:text-white transition-colors">jeinsubria@gmail.com</a></p>
                <p>Telefono: <a href="tel:+393298999219" className="text-insubria-400 hover:text-white transition-colors">+39 3298999219</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
