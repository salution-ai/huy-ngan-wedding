"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? isDark
            ? "bg-gray-900/80 backdrop-blur-md shadow-md"
            : "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image src="/logo.PNG" alt="Huy Ngân Wedding" width={40} height={40} className="w-8 h-8 md:w-14 md:h-14 shrink-0" />
            <span className="font-bold text-base sm:text-lg md:text-2xl font-audiowide tracking-tight truncate">
              HUY NGÂN WEDDING
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
