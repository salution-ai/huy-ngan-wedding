"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <footer className={isDark ? "bg-gray-900 border-t border-gray-800" : "bg-gray-50 border-t"}>
      <div className="container-custom py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Huy Ngân Wedding
            </Link>
          </p>
          <p className={isDark ? "text-xs text-gray-500" : "text-xs text-gray-500"}>Thiệp cưới online</p>
        </div>
      </div>
    </footer>
  )
}
