import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import StructuredData from '@/components/StructuredData'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jeins.it'),
  title: 'JEIns - Junior Enterprise Insubria | Consulenza e Progetti Universitari',
  description: 'JEIns è la Junior Enterprise dell\'Università dell\'Insubria. Offriamo consulenza aziendale, progetti di ricerca e opportunità di crescita per studenti e aziende. Scopri i nostri servizi di marketing, sviluppo web e business consulting.',
  keywords: 'Junior Enterprise, Università Insubria, consulenza aziendale, progetti universitari, studenti, business consulting, marketing, sviluppo web, Varese, Como',
  authors: [{ name: 'JEIns - Junior Enterprise Insubria' }],
  creator: 'JEIns - Junior Enterprise Insubria',
  publisher: 'JEIns - Junior Enterprise Insubria',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'JEIns - Junior Enterprise Insubria | Consulenza e Progetti Universitari',
    description: 'JEIns è la Junior Enterprise dell\'Università dell\'Insubria. Offriamo consulenza aziendale, progetti di ricerca e opportunità di crescita per studenti e aziende.',
    url: 'https://jeins.it',
    siteName: 'JEIns - Junior Enterprise Insubria',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JEIns - Junior Enterprise Insubria',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEIns - Junior Enterprise Insubria',
    description: 'Consulenza aziendale e progetti universitari per studenti e aziende dell\'Università dell\'Insubria.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://jeins.it',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="dark">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-inter antialiased bg-insubria-900 text-neutral-200 selection:bg-insubria-500/30 selection:text-insubria-100`}>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}