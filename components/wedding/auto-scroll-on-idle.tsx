"use client"

import { useEffect, useRef } from "react"

type Props = {
  /** target element id to scroll into view */
  targetId: string
  /** how long to wait without scroll (ms) */
  idleMs?: number
  /** only trigger when scrollY is within this threshold (px) */
  maxScrollY?: number
}

export function AutoScrollOnIdle({
  targetId,
  idleMs = 5000,
  maxScrollY = 40,
}: Props) {
  const firedRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const clear = () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const schedule = () => {
      if (firedRef.current) return
      clear()
      timerRef.current = window.setTimeout(() => {
        if (firedRef.current) return
        if (window.scrollY > maxScrollY) return
        const el = document.getElementById(targetId)
        if (!el) return
        firedRef.current = true
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, idleMs)
    }

    const onUserActivity = () => {
      // Any interaction counts as "not idle": reschedule.
      schedule()
    }

    schedule()
    window.addEventListener("scroll", onUserActivity, { passive: true })
    window.addEventListener("wheel", onUserActivity, { passive: true })
    window.addEventListener("touchmove", onUserActivity, { passive: true })
    window.addEventListener("keydown", onUserActivity)
    window.addEventListener("pointerdown", onUserActivity, { passive: true })

    return () => {
      clear()
      window.removeEventListener("scroll", onUserActivity)
      window.removeEventListener("wheel", onUserActivity)
      window.removeEventListener("touchmove", onUserActivity)
      window.removeEventListener("keydown", onUserActivity)
      window.removeEventListener("pointerdown", onUserActivity)
    }
  }, [idleMs, maxScrollY, targetId])

  return null
}

