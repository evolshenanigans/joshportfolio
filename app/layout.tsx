import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/lib/lenis"
import { TopBar } from "@/components/hud/TopBar"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://b3soft.vercel.app"),
  title: "Wahnahbe — Joshua Gutierrez",
  description: "Fun, useful AI — built & explained in public. Projects, videos, and build logs from Joshua Gutierrez.",
  openGraph: {
    title: "Wahnahbe — Joshua Gutierrez",
    description: "Fun, useful AI — built & explained in public.",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} scanlines antialiased`}>
        <LenisProvider>
          <TopBar />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
