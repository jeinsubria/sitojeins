import type { Metadata } from 'next'
import CookiePreferencesButton from '@/components/ui/CookiePreferencesButton'

export const metadata: Metadata = {
  title: 'Cookie Policy - JEIns | Gestione Cookie',
  description: 'Cookie Policy di JUNIOR ENTERPRISE DELL\'UNIVERSITA\' DEGLI STUDI DELL\'INSUBRIA. Informazioni sui cookie utilizzati e gestione delle preferenze.',
  alternates: { canonical: 'https://jeins.it/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="py-32 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-bold newspaper-headline text-white mb-4">Cookie Policy</h1>
            <p className="text-neutral-400 font-light">JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA — 2025/2026 · Ultimo aggiornamento: Giugno 2026</p>
          </div>

          <div className="space-y-10 animate-fade-in-up">

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Cosa sono i cookie</h2>
              <p className="text-neutral-400 leading-relaxed font-light">I cookie sono piccoli file di testo o altri identificatori che i siti web installano sul dispositivo dell&apos;utente per consentire il funzionamento del sito, memorizzare preferenze, raccogliere informazioni statistiche o svolgere ulteriori funzioni. La presente Cookie Policy è redatta da JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA (di seguito anche &quot;JEIns Consulting&quot;, &quot;JEIns&quot; o &quot;Associazione&quot;). La disciplina dei cookie trova il proprio fondamento nell&apos;art. 122 del d.lgs. 196/2003 e negli artt. 4, 7, 12, 13 e 25 del GDPR, come richiamato dalle Linee guida del Garante del 10 giugno 2021.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Tipologie di cookie utilizzati</h2>
              <div className="space-y-4">
                <div className="border border-white/5 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">a) Cookie tecnici o strettamente necessari</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">Necessari al funzionamento del sito, alla navigazione, alla sicurezza e alla gestione della sessione. Possono essere utilizzati senza consenso ai sensi dell&apos;art. 122 del Codice Privacy.</p>
                </div>
                <div className="border border-white/5 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">b) Cookie analytics</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">Strumenti di analisi statistica degli accessi e dell&apos;utilizzo del sito. Possono essere assimilati ai cookie tecnici solo nelle condizioni individuate dal Garante; in caso contrario, richiedono il consenso dell&apos;utente.</p>
                </div>
                <div className="border border-white/5 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">c) Cookie di profilazione o altri strumenti non tecnici</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">Finalizzati ad analizzare comportamenti, personalizzare contenuti o effettuare attività assimilabili alla profilazione. Attivati solo previo consenso libero, specifico, informato e inequivocabile dell&apos;utente.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Gestione del consenso</h2>
              <p className="text-neutral-400 leading-relaxed font-light mb-6">Al primo accesso, l&apos;utente visualizza un banner che consente di accettare, rifiutare o personalizzare le categorie di cookie. Le preferenze possono essere modificate in qualsiasi momento tramite il pannello di controllo qui sotto.</p>
              <div className="flex">
                <CookiePreferencesButton />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Contatti</h2>
              <p className="text-neutral-400 leading-relaxed font-light mb-4">Per informazioni sui cookie o per esercitare i propri diritti in materia di protezione dei dati personali, è possibile contattare:</p>
              <div className="space-y-2 text-neutral-400 font-light">
                <p>JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA</p>
                <p>Sede legale: Via Stefano da Seregno n. 31, 20831 Seregno (MB)</p>
                <p>Email: <a href="mailto:jeinsubria@gmail.com" className="text-insubria-400 hover:text-white transition-colors">jeinsubria@gmail.com</a></p>
                <p>Telefono: <a href="tel:+393298999219" className="text-insubria-400 hover:text-white transition-colors">+39 3298999219</a></p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Aggiornamenti</h2>
              <p className="text-neutral-400 leading-relaxed font-light">La presente Cookie Policy può essere soggetta a modifiche in base a nuove normative o cambiamenti tecnici del sito. Gli utenti saranno informati tramite la pubblicazione della versione aggiornata su questa pagina.</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
