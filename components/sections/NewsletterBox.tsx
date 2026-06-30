'use client'

import { useState } from 'react'

export default function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Integrare con Brevo/Mailchimp
    // Per ora simuliamo l'invio
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
      setConsent(false)
      alert('Iscrizione completata! (Simulazione)')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Resta aggiornato
        </h3>
        <p className="text-neutral-400 text-lg mb-8 font-light">
          Ricevi le ultime novità su progetti, eventi e opportunità di JEIns
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-insubria-500 transition-all"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="cta-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-insubria-500 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Invio...' : 'Iscriviti'}
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-insubria-500 focus:ring-insubria-500 focus:ring-offset-neutral-950"
            />
            <label htmlFor="consent" className="text-sm text-neutral-400">
              Acconsento al trattamento dei dati personali secondo la{' '}
              <a href="/privacy" className="text-insubria-500 hover:text-white transition-colors font-medium">
                Privacy Policy
              </a>
            </label>
          </div>
        </form>
    </div>
  )
}
