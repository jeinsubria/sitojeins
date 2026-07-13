'use client'

import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JUNIOR ENTERPRISE DELL'UNIVERSITA' DEGLI STUDI DELL'INSUBRIA",
    "alternateName": ["JEIns", "JEIns Consulting"],
    "description": "Junior Enterprise dell'Università dell'Insubria che offre consulenza aziendale, progetti di ricerca e opportunità di crescita per studenti e aziende.",
    "url": "https://jeins.it",
    "logo": "https://jeins.it/images/logo-jeins.png",
    "image": "https://jeins.it/images/og-image.jpg",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Stefano da Seregno n. 31",
      "addressLocality": "Seregno",
      "postalCode": "20831",
      "addressRegion": "Lombardia",
      "addressCountry": "IT"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-3298999219",
      "contactType": "customer service",
      "email": "jeinsubria@gmail.com"
    },
    "sameAs": [
      "https://it.linkedin.com/company/jeins",
      "https://www.instagram.com/jeins.consulting/",
      "https://www.facebook.com/jeinsubria"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Confederazione Nazionale Junior Enterprise Italia",
      "url": "https://www.junior-enterprise.it"
    },
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Università degli Studi dell'Insubria",
      "url": "https://www.uninsubria.it"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.6503,
        "longitude": 9.2062
      },
      "geoRadius": "50000"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Business Plan",
        "description": "Analisi strategica e documento di business plan",
        "category": "Business Consulting"
      },
      {
        "@type": "Offer",
        "name": "Sviluppo Web",
        "description": "Sviluppo di siti web e applicazioni",
        "category": "Web Development"
      },
      {
        "@type": "Offer",
        "name": "Comunicazione & Marketing",
        "description": "Servizi di comunicazione e marketing digitale",
        "category": "Digital Marketing"
      }
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  )
}
