"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Đảm bảo component chỉ render ở client side để tránh hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="opacity-0 w-9 h-9" />
  }

  // Debug - kiểm tra theme hiện tại
  console.log("Current theme in toggle:", theme)
  console.log("HTML classes in toggle:", document.documentElement.className)

  function toggleTheme() {
    // Xóa class dark trước khi thay đổi theme
    if (theme === "dark") {
      document.documentElement.classList.remove("dark")
    }
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Chuyển đổi giao diện sáng/tối">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
