import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/lib/lenis"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://joshgutierrez.vercel.app"),
  title: "Joshua Gutierrez — Data Scientist",
  description:
    "Data scientist by training. Translator by trade. From English major to ML engineer — I build models that explain themselves, because someone has to.",
  openGraph: {
    title: "Joshua Gutierrez — Data Scientist",
    description:
      "From English major to ML engineer. I build models that explain themselves.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
