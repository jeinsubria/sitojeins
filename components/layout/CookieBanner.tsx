'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import CookiePreferencesModal, { CookiePreferences } from './CookiePreferencesModal'

function getOrCreateCookieId(): string {
  if (typeof window === 'undefined') return ''
  let cookieId = localStorage.getItem('jeins-cookie-id')
  if (!cookieId) {
    cookieId = `cookie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('jeins-cookie-id', cookieId)
  }
  return cookieId
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('jeins-cookies-accepted')
    if (!cookieAccepted) {
      setTimeout(() => setShowBanner(true), 800)
    }
  }, [])

  const savePreferences = async (preferences: CookiePreferences) => {
    localStorage.setItem('jeins-cookies-accepted', 'true')
    localStorage.setItem('jeins-cookie-preferences', JSON.stringify(preferences))
    setShowBanner(false)
    setIsModalOpen(false)

    try {
      const cookieId = getOrCreateCookieId()
      if (cookieId) {
        await fetch('/api/cookie-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cookieId, ...preferences }),
        })
      }
    } catch {
      // Silenzioso — il consenso è già salvato in localStorage
    }
  }

  const acceptCookies = () => savePreferences({ necessary: true, analytics: true, marketing: true, functional: true })
  const declineCookies = () => savePreferences({ necessary: true, analytics: false, marketing: false, functional: false })

  if (!showBanner) return null

  return (
    <>
      {/* Overlay sfocato */}
      <div className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-[2px] pointer-events-none" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 sm:p-6 animate-fade-in-up">
        <div className="max-w-5xl mx-auto">
          <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* Icona + testo */}
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-insubria-500/10 border border-insubria-500/20 p-3 rounded-xl shrink-0">
                  <Cookie className="text-insubria-400" size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Utilizziamo i cookie
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Usiamo cookie tecnici e, con il tuo consenso, cookie analitici per migliorare la navigazione.{' '}
                    <a href="/cookie-policy" className="text-insubria-400 hover:text-white transition-colors underline underline-offset-2">
                      Cookie Policy
                    </a>
                    {' '}·{' '}
                    <a href="/privacy" className="text-insubria-400 hover:text-white transition-colors underline underline-offset-2">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Bottoni */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all font-medium"
                >
                  Rifiuta
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 text-sm text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                >
                  <Settings size={14} />
                  Personalizza
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-5 py-2.5 text-sm bg-insubria-500 hover:bg-insubria-600 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={savePreferences}
      />
    </>
  )
}
