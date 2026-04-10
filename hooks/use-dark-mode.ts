"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function useDarkMode() {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Kiểm tra theme từ provider
    if (theme === "dark") {
      setIsDark(true)
      return
    }

    // Kiểm tra class dark trên html element
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    // Theo dõi thay đổi class trên html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkMode = document.documentElement.classList.contains("dark")
          setIsDark(isDarkMode)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [theme])

  return isDark
}
