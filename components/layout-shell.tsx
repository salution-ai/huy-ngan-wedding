"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

type LayoutShellProps = {
  children: React.ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname()
  // This project has two invite entry routes: `/` and `/:slug`.
  // Both should be full-bleed without global header/footer.
  const isInviteRoute = pathname === "/" || /^\/[^/]+$/.test(pathname)

  if (isInviteRoute) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
