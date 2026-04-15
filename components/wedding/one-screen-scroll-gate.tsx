"use client"

import type React from "react"
import { useEffect, useRef } from "react"

type Props = {
  children: React.ReactNode
  /** element id to scroll to when user scrolls down */
  targetId: string
  /** only activate when window scrollY is within this threshold */
  maxScrollY?: number
}

export function OneScreenScrollGate({
  children,
  targetId,
  maxScrollY = 40,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const lockRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const go = () => {
      if (lockRef.current) return
      if (window.scrollY > maxScrollY) return
      const el = document.getElementById(targetId)
      if (!el) return
      lockRef.current = true
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      window.setTimeout(() => {
        lockRef.current = false
      }, 700)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return
      if (window.scrollY > maxScrollY) return
      e.preventDefault()
      go()
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    const onTouchMove = (e: TouchEvent) => {
      const startY = touchStartYRef.current
      if (startY == null) return
      const curY = e.touches[0]?.clientY
      if (curY == null) return
      const dy = startY - curY
      if (dy <= 0) return
      if (window.scrollY > maxScrollY) return
      // Any downward swipe should move exactly one screen.
      e.preventDefault()
      touchStartYRef.current = null
      go()
    }

    host.addEventListener("wheel", onWheel, { passive: false })
    host.addEventListener("touchstart", onTouchStart, { passive: true })
    host.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      host.removeEventListener("wheel", onWheel)
      host.removeEventListener("touchstart", onTouchStart)
      host.removeEventListener("touchmove", onTouchMove)
    }
  }, [maxScrollY, targetId])

  return (
    <div ref={hostRef} className="min-h-screen w-full">
      {children}
    </div>
  )
}

