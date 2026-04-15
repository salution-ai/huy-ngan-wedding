"use client"

import type React from "react"
import { useEffect, useRef } from "react"

type Props = {
  children: React.ReactNode
  /** Scroll to this element when user scrolls UP */
  snapUpToId: string
  /**
   * Only snap when this section is effectively at the top of viewport
   * (so we don't hijack scroll in the middle of the page).
   */
  topThresholdPx?: number
}

export function SectionScrollSnap({
  children,
  snapUpToId,
  topThresholdPx = 28,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const lockRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const canSnapNow = () => {
      const rect = host.getBoundingClientRect()
      return Math.abs(rect.top) <= topThresholdPx
    }

    const snapUp = () => {
      if (lockRef.current) return
      if (!canSnapNow()) return
      const el = document.getElementById(snapUpToId)
      if (!el) return
      lockRef.current = true
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      window.setTimeout(() => {
        lockRef.current = false
      }, 700)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return
      if (!canSnapNow()) return
      e.preventDefault()
      snapUp()
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
      // dy < 0 => user swipes DOWN (wants to scroll up)
      if (dy >= 0) return
      if (!canSnapNow()) return
      e.preventDefault()
      touchStartYRef.current = null
      snapUp()
    }

    host.addEventListener("wheel", onWheel, { passive: false })
    host.addEventListener("touchstart", onTouchStart, { passive: true })
    host.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      host.removeEventListener("wheel", onWheel)
      host.removeEventListener("touchstart", onTouchStart)
      host.removeEventListener("touchmove", onTouchMove)
    }
  }, [snapUpToId, topThresholdPx])

  return (
    <div ref={hostRef} className="w-full">
      {children}
    </div>
  )
}

