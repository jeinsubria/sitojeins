'use client'

import { useState, useEffect } from 'react'
import CookiePreferencesModal, { CookiePreferences } from '../layout/CookiePreferencesModal'

function getOrCreateCookieId(): string {
  if (typeof window === 'undefined') return ''
  let cookieId = localStorage.getItem('jeins-cookie-id')
  if (!cookieId) {
    cookieId = `cookie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('jeins-cookie-id', cookieId)
  }
  return cookieId
}

export default function CookiePreferencesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const saved = localStorage.getItem('jeins-cookie-preferences')
      if (saved) {
        setPreferences(JSON.parse(saved))
        setIsLoading(false)
        return
      }
      const cookieId = getOrCreateCookieId()
      if (cookieId) {
        const response = await fetch(`/api/cookie-preferences?cookieId=${cookieId}`)
        if (response.ok) {
          const data = await response.json()
          if (data) setPreferences(data)
        }
      }
    } catch {
      // Silenzioso
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (newPreferences: CookiePreferences) => {
    localStorage.setItem('jeins-cookies-accepted', 'true')
    localStorage.setItem('jeins-cookie-preferences', JSON.stringify(newPreferences))
    setPreferences(newPreferences)
    setIsModalOpen(false)

    try {
      const cookieId = getOrCreateCookieId()
      if (cookieId) {
        await fetch('/api/cookie-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cookieId, ...newPreferences }),
        })
      }
    } catch {
      // Silenzioso — già salvato in localStorage
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all font-medium"
        disabled={isLoading}
      >
        Modifica preferenze cookie
      </button>

      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialPreferences={preferences || undefined}
      />
    </>
  )
}
