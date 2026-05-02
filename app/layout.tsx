import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import Navbar from "@/components/navbar";

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
  title: "Aufa Syaihan Azzahidi — Web Developer",
  description:
    "Personal portfolio of Aufa Syaihan Azzahidi — a Web Developer crafting digital experiences at the intersection of design and engineering.",
  openGraph: {
    title: "Aufa Syaihan Azzahidi — Web Developer",
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
    >
      <body className="antialiased font-sans bg-bg text-text selection:bg-white selection:text-black">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
