import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - JEIns | Articoli e News sulla Junior Enterprise',
  description: 'Scopri gli ultimi articoli e news di JEIns. Approfondimenti su consulenza aziendale, progetti universitari, eventi e opportunità per studenti dell\'Università dell\'Insubria.',
  keywords: 'blog JEIns, articoli Junior Enterprise, news università, progetti studenti, consulenza aziendale blog',
  openGraph: {
    title: 'Blog - JEIns | Articoli e News sulla Junior Enterprise',
    description: 'Scopri gli ultimi articoli e news di JEIns su consulenza aziendale e progetti universitari.',
    url: 'https://jeins.it/blog',
  },
  alternates: {
    canonical: 'https://jeins.it/blog',
  },
}

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-32 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 newspaper-headline tracking-tighter">
            Blog JEIns
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-400 font-light leading-relaxed">
            Idee, strategie e approfondimenti dal mondo delle Junior Enterprise e della consulenza aziendale.
          </p>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-6">Coming soon</h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            Questa sezione è in fase di strutturazione. Torna a trovarci presto!
          </p>
        </div>
      </section>
    </main>
  )
}
