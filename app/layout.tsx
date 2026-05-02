import type { Metadata } from 'next'
import { Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/custom-cursor'
import Navbar from '@/components/navigations/navbar'
import ThemeToggle from '@/components/theme-toggle'
import ThemeProvider from '@/providers/theme-provider'
import { PORTOFOLIO } from '@/lib/constant'

const title = `${PORTOFOLIO.NAME} - ${PORTOFOLIO.ROLE}`
const description = `Portfolio of ${PORTOFOLIO.NAME}, an Indonesia-based ${PORTOFOLIO.ROLE} building fast, accessible, and polished web experiences with React, Next.js, and TypeScript.`
const siteUrl = new URL(PORTOFOLIO.SITE_URL)

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s | ${PORTOFOLIO.NAME}`,
  },
  description,
  applicationName: PORTOFOLIO.NAME,
  keywords: [
    PORTOFOLIO.NAME,
    PORTOFOLIO.ROLE,
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Frontend developer',
    'Web developer Indonesia',
    'Portfolio',
  ],
  authors: [{ name: PORTOFOLIO.NAME, url: PORTOFOLIO.SITE_URL }],
  creator: PORTOFOLIO.NAME,
  publisher: PORTOFOLIO.NAME,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: PORTOFOLIO.NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${PORTOFOLIO.NAME} portfolio preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-bg text-text selection:bg-text selection:text-bg">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
