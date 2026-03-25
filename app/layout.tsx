import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '../components/WhatsAppButton'

// Unique font combinations for Sri Lankan TripTip
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7931E' }, // Sri Lankan Saffron
    { media: '(prefers-color-scheme: dark)', color: '#1A2F1A' } // Ceylon Tea Night
  ],
}

// SEO Metadata for Sri Lankan TripTip
export const metadata: Metadata = {
  metadataBase: new URL('https://srilankantriptip.com'),

  title: {
    default: "Sri Lankan TripTip — Unforgettable Sri Lanka Travel Experiences",
    template: "%s | Sri Lankan TripTip"
  },

  description:
    "Discover the pearl of the Indian Ocean with Sri Lankan TripTip. Experience authentic Sri Lankan culture, breathtaking adventures, and pristine beauty through our expertly curated tours, reliable taxi services, and fully customized travel experiences tailored just for you.",

  keywords: [
    "Sri Lanka travel",
    "Sri Lanka tours",
    "Sri Lanka taxi service",
    "customized Sri Lanka tours",
    "Sri Lanka cultural tours",
    "Sri Lanka adventure travel",
    "Ceylon travel agency",
    "Sri Lanka holiday packages",
    "Colombo taxi service",
    "Sri Lanka tour guide",
    "Sri Lanka beach tours",
    "Sri Lanka heritage sites",
    "Sigiriya tours",
    "Ella Sri Lanka",
    "Kandy cultural tours",
    "Sri Lanka wildlife safari",
    "Adam's Peak trekking",
    "Sri Lanka tea plantation tours",
    "Galle fort tours",
    "Sri Lanka honeymoon packages",
    "Sri Lanka family tours",
    "trusted Sri Lanka travel agency",
    "affordable Sri Lanka tours",
    "luxury Sri Lanka travel"
  ],

  authors: [{ name: "Sri Lankan TripTip Team" }],
  creator: "Sri Lankan TripTip",
  publisher: "Sri Lankan TripTip",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ['si_LK', 'ta_LK'],
    url: "https://srilankantriptip.com",
    siteName: "Sri Lankan TripTip",
    title: "Sri Lankan TripTip — Your Gateway to Authentic Sri Lankan Adventures",
    description:
      "From misty tea plantations to golden beaches, ancient temples to wildlife safaris. Experience Sri Lanka like never before with personalized tours, reliable transport, and unforgettable memories.",
    images: [
      {
        url: "/og-image-srilanka.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Lankan TripTip - Explore Sri Lanka's Beauty, Culture & Adventure",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sri Lankan TripTip — Unforgettable Sri Lanka Experiences",
    description: "Your trusted partner for exploring Sri Lanka's cultural treasures, adventure hotspots, and natural wonders.",
    creator: "@SriLankanTripTip",
    images: ["/twitter-image-srilanka.jpg"],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-triptip.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/site.webmanifest',

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

  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code',
  },

  category: 'travel',

  other: {
    'contact:phone_number': '+94 77 123 4567',
    'contact:email': 'hello@srilankantriptip.com',
    'geo.region': 'LK',
    'geo.placename': 'Colombo, Sri Lanka',
  },

  alternates: {
    canonical: 'https://srilankantriptip.com',
    languages: {
      'en': 'https://srilankantriptip.com/en',
      'si': 'https://srilankantriptip.com/si',
      'ta': 'https://srilankantriptip.com/ta',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // Structured Data (JSON-LD) for Sri Lankan TripTip
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://srilankantriptip.com',
    name: 'Sri Lankan TripTip',
    alternateName: 'TripTip Sri Lanka Tours & Travel',
    description:
      'Sri Lankan TripTip is your trusted travel partner offering authentic Sri Lankan experiences through curated tours, reliable taxi services, and fully customized travel packages. Explore Sri Lanka\'s rich culture, thrilling adventures, and breathtaking beauty with expert local guides.',
    url: 'https://srilankantriptip.com',
    logo: 'https://srilankantriptip.com/logo-triptip.png',
    image: 'https://srilankantriptip.com/og-image-srilanka.jpg',
    telephone: '+94 77 123 4567',
    email: 'hello@srilankantriptip.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Galle Road',
      addressLocality: 'Colombo',
      addressRegion: 'Western Province',
      postalCode: '00300',
      addressCountry: 'LK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.9271,
      longitude: 79.8612
    },
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/srilankantriptip',
      'https://www.instagram.com/srilankantriptip',
      'https://twitter.com/SriLankanTripTip',
      'https://www.youtube.com/@srilankantriptip',
      'https://www.linkedin.com/company/srilankantriptip'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+94 77 123 4567',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Sinhala', 'Tamil'],
        areaServed: 'LK',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+94 77 123 4567',
        contactType: 'Reservations',
        availableLanguage: ['English', 'Sinhala', 'Tamil'],
        areaServed: ['LK', 'US', 'GB', 'AU', 'IN', 'CN']
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sri Lankan TripTip Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Taxi Services',
            description: 'Reliable, comfortable, and safe taxi services across Sri Lanka. Airport transfers, city tours, and intercity travel with professional drivers.',
            provider: {
              '@type': 'TravelAgency',
              name: 'Sri Lankan TripTip'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Curated Tours',
            description: 'Expertly designed tour packages covering Sri Lanka\'s cultural heritage, adventure activities, wildlife safaris, beach escapes, and scenic landscapes.',
            provider: {
              '@type': 'TravelAgency',
              name: 'Sri Lankan TripTip'
            },
            touristType: ['Family', 'Solo Traveler', 'Couples', 'Groups']
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Customized Tours',
            description: 'Fully personalized travel experiences tailored to your preferences. Plan your dream Sri Lankan adventure with our expert guidance and local insights.',
            provider: {
              '@type': 'TravelAgency',
              name: 'Sri Lankan TripTip'
            },
            touristType: ['All']
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '287',
      bestRating: '5',
      worstRating: '1'
    },
    slogan: 'Your Unforgettable Sri Lankan Journey Starts Here'
  }

  // Additional LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://srilankantriptip.com/#localbusiness',
    name: 'Sri Lankan TripTip',
    image: 'https://srilankantriptip.com/storefront.jpg',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Galle Road',
      addressLocality: 'Colombo',
      addressRegion: 'Western Province',
      postalCode: '00300',
      addressCountry: 'LK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.9271,
      longitude: 79.8612
    },
    url: 'https://srilankantriptip.com',
    telephone: '+94 77 123 4567',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    ]
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://srilankantriptip.com/#organization',
    name: 'Sri Lankan TripTip',
    url: 'https://srilankantriptip.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://srilankantriptip.com/logo-triptip.png',
      width: 250,
      height: 60
    },
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'Sri Lankan TripTip Founders'
      }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+94 77 123 4567',
      email: 'hello@srilankantriptip.com',
      availableLanguage: ['English', 'Sinhala', 'Tamil']
    },
    sameAs: [
      'https://www.facebook.com/srilankantriptip',
      'https://www.instagram.com/srilankantriptip',
      'https://twitter.com/SriLankanTripTip',
      'https://www.youtube.com/@srilankantriptip'
    ]
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Structured Data - Travel Agency */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Additional meta tags for Sri Lankan context */}
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Sri Lanka" />
        <meta name="geo.position" content="7.8731;80.7718" />
        <meta name="ICBM" content="7.8731, 80.7718" />
      </head>

      <body className="font-jakarta antialiased bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-saffron-500 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        {children}
        
        {/* WhatsApp Button for instant communication */}
        <WhatsAppButton />

        {/* Google Analytics or other analytics scripts */}
        {/* Add your analytics ID here */}
      </body>
    </html>
  )
}