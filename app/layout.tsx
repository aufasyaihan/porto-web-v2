import type { Metadata } from 'next'
import { Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/custom-cursor'
import Navbar from '@/components/navigations/navbar'
import ThemeToggle from '@/components/theme-toggle'
import ThemeProvider from '@/providers/theme-provider'
import { PORTOFOLIO } from '@/lib/constant'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #ld {
            position: fixed; inset: 0; z-index: 9999;
            background: #0a0a0a;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            transition: opacity 0.5s ease;
          }
          #ld-num {
            color: #fff; font-size: 3rem;
            font-family: monospace; margin-bottom: 2rem;
          }
          #ld-track {
            width: 240px; height: 2px;
            background: #2a2a2a; border-radius: 999px; overflow: hidden;
          }
          #ld-bar {
            height: 100%; width: 0%; background: #fff;
            border-radius: 999px;
            transition: width 0.3s ease;
          }
        `,
          }}
        />

        {/* Runs immediately on first byte — no React, no bundles */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              var pct = 0;
              var target = 0;
              var finished = false;
              var loadFired = false;  // ← track if load already happened

              function setBar(v) {
                var bar = document.getElementById('ld-bar');
                var num = document.getElementById('ld-num');
                if (bar) bar.style.width = v + '%';
                if (num) num.textContent = v + '%';
              }

              function tick() {
                if (finished) return;
                var diff = target - pct;
                if (Math.abs(diff) > 0.1) {
                  pct += diff * 0.08;
                } else {
                  pct = target; // snap when close enough
                }
                setBar(Math.min(100, Math.round(pct)));

                if (loadFired && pct >= 99.5) {
                  finished = true;
                  pct = 100;
                  setBar(100);
                  var screen = document.getElementById('ld');
                  if (screen) {
                    screen.style.opacity = '0';
                    screen.style.pointerEvents = 'none';
                    setTimeout(function () { screen.style.display = 'none'; }, 500);
                  }
                  return;
                }

                requestAnimationFrame(tick);
              }

              // Only advance staggered targets if load hasn't fired yet
              function stage(t, delay) {
                setTimeout(function () {
                  if (!loadFired) target = t;  // ← don't overwrite after load
                }, delay);
              }

              stage(20, 0);
              stage(40, 2000);
              stage(60, 4000);
              stage(75, 6000);
              stage(85, 8000);
              stage(90, 12000);

              window.addEventListener('load', function () {
                loadFired = true;
                target = 100;  // easing will smoothly reach it
              });

              document.addEventListener('DOMContentLoaded', function () {
                requestAnimationFrame(tick);
              });
            })();
        `,
          }}
        />
      </head>

      <body className="antialiased font-sans bg-bg text-text selection:bg-text selection:text-bg">
        {/* Loading screen lives outside React tree — never re-renders, never resets */}
        <div id="ld" suppressHydrationWarning>
          <div id="ld-num" suppressHydrationWarning>
            0%
          </div>
          <div id="ld-track">
            <div id="ld-bar" suppressHydrationWarning />
          </div>
        </div>

        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <ThemeToggle />
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
