import './globals.css'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'

// Fonts (optional, but clean to keep)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}