import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/sections/custom-cursor";
import Navbar from "@/components/navigations/navbar";
import ThemeToggle from "@/components/theme-toggle";
import ThemeProvider from "@/providers/theme-provider";
import { PORTOFOLIO } from "@/lib/constant";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${PORTOFOLIO.NAME} — ${PORTOFOLIO.ROLE}`,
  description:
    `Personal portfolio of ${PORTOFOLIO.NAME} — a ${PORTOFOLIO.ROLE} crafting digital experiences at the intersection of design and engineering.`,
  openGraph: {
    title: `${PORTOFOLIO.NAME} — ${PORTOFOLIO.ROLE}`,
    description:
      "Personal portfolio showcasing work, experience, and certifications.",
    type: "website",
  },
};

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
  );
}
