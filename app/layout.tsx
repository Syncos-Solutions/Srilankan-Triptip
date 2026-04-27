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

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
     

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
