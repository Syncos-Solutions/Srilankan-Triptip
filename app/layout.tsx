import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '../components/WhatsAppButton'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f1ee' },
    { media: '(prefers-color-scheme: dark)', color: '#181818' }
  ],
}

// SEO Metadata for Adventure
export const metadata: Metadata = {
  metadataBase: new URL('https://adventure.com'),

  title: {
    default: "Adventure — Epic Hiking & Outdoor Expeditions",
    template: "%s | Adventure"
  },

  description:
    "Embark on transformative hiking adventures with Adventure. Expert-led expeditions through stunning landscapes, from mountain peaks to pristine wilderness trails worldwide.",

  keywords: [
    "hiking adventures",
    "outdoor expeditions",
    "mountain hiking",
    "wilderness tours",
    "adventure travel",
    "guided hiking trips",
    "trekking experiences",
    "nature exploration",
    "hiking guides",
    "outdoor adventures",
    "mountain trekking",
    "wilderness camping",
    "adventure tours"
  ],

  authors: [{ name: "Adventure Team" }],
  creator: "Adventure",
  publisher: "Adventure",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adventure.com",
    siteName: "Adventure",
    title: "Adventure — Epic Hiking & Outdoor Expeditions",
    description:
      "Discover breathtaking trails and wilderness experiences with expert guides. Your gateway to epic outdoor adventures.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adventure — Epic Hiking & Outdoor Expeditions",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Adventure — Epic Hiking & Outdoor Expeditions",
    description: "Explore the wonders of the great outdoors with premier hiking adventures.",
    creator: "@adventure",
    images: ["/twitter-image.jpg"],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
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
    google: 'your-google-verification-code',
  },

  category: 'travel',

  other: {
    'contact:phone_number': '+1 (999) 999-9999',
    'contact:email': 'support@ditych.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // Structured Data (JSON-LD) for Adventure
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://adventure.com',
    name: 'Adventure',
    alternateName: 'Adventure Hiking & Outdoor Expeditions',
    description:
      "Adventure offers expert-led hiking expeditions and outdoor adventures through stunning landscapes worldwide. Experience transformative journeys with professional guides.",
    url: 'https://adventure.com',
    logo: 'https://adventure.com/logo.png',
    image: 'https://adventure.com/og-image.jpg',
    telephone: '+1 (999) 999-9999',
    email: 'support@ditych.com',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Independence Square 14',
      addressLocality: 'Kyiv',
      addressRegion: 'Kyiv Oblast',
      postalCode: '01001',
      addressCountry: 'UA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.4501,
      longitude: 30.5234
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/adventure',
      'https://www.instagram.com/adventure',
      'https://twitter.com/adventure',
      'https://www.youtube.com/@adventure'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1 (999) 999-9999',
      contactType: 'Customer Service',
      availableLanguage: ['en'],
      areaServed: ['US', 'CA', 'EU', 'UA']
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Adventure Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hiking Adventures',
            description: 'Guided hiking expeditions through mountains and wilderness'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mountain Biking',
            description: 'Thrilling mountain biking experiences on scenic trails'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Trail Running',
            description: 'Guided trail running programs for all skill levels'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Outdoor School',
            description: 'Educational outdoor programs for youth and families'
          }
        }
      ]
    }
  }

  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className="font-dm-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}