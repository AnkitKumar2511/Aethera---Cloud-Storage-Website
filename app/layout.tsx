import type { Metadata } from "next";
import { Space_Grotesk, Inter } from 'next/font/google'

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Aethera",
  description: "Aethera - File storage with clarity and control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
