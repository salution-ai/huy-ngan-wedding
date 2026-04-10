import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Playwrite_IE, Audiowide, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutShell from "@/components/layout-shell"

const playwriteIE = Playwrite_IE({
  variable: "--font-playwrite-ie",
})

const audiowide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-audiowide",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wedding-serif",
})

export const metadata: Metadata = {
  title: "Huy Ngân Wedding",
  description: "Thiệp cưới online và thông tin lễ vu quy — Huy & Ngân.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${audiowide.variable} ${cormorant.variable} ${playwriteIE.className} scroll-smooth`}
    >
      <head>
      </head>
      <body className="" suppressHydrationWarning>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
