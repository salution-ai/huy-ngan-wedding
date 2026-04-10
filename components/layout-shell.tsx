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
  const isInviteHome = pathname === "/"

  if (isInviteHome) {
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
