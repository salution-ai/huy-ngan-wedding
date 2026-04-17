"use client"

import { NotebookPen } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

type Props = {
  /** show CTA only when wish is empty */
  wish?: string | null
  targetId: string
  /** Only show CTA after scrolling past this section (e.g. "thiep-moi") */
  startAfterId?: string
}

export function WishCta({ wish, targetId, startAfterId }: Props) {
  const wishEmpty = useMemo(() => (wish ?? "").trim().length === 0, [wish])
  const [targetVisible, setTargetVisible] = useState(false)
  const [pastStart, setPastStart] = useState(startAfterId ? false : true)

  useEffect(() => {
    if (!wishEmpty) return
    const el = document.getElementById(targetId)
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setTargetVisible(Boolean(entry?.isIntersecting))
      },
      { threshold: 0.2 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [targetId, wishEmpty])

  useEffect(() => {
    if (!wishEmpty) return
    if (!startAfterId) {
      setPastStart(true)
      return
    }

    const computeStartTop = () => {
      const startEl = document.getElementById(startAfterId)
      if (!startEl) return null
      const rect = startEl.getBoundingClientRect()
      return rect.top + window.scrollY
    }

    let startTop: number | null = computeStartTop()

    const onScroll = () => {
      if (startTop == null) startTop = computeStartTop()
      if (startTop == null) return
      setPastStart(window.scrollY >= startTop)
    }

    const onResize = () => {
      startTop = computeStartTop()
      onScroll()
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [startAfterId, wishEmpty])

  if (!wishEmpty) return null
  if (!pastStart) return null
  if (targetVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <button
        type="button"
        data-wedding-reveal
        onClick={() => {
          const el = document.getElementById(targetId)
          if (!el) return
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }}
        className="w-fit whitespace-nowrap rounded-full border border-[#b22f2f]/30 bg-white/10 px-5 py-3 text-center font-semibold text-[#b22f2f] shadow-lg backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b22f2f]/40 dark:border-white/15 dark:bg-black/10 dark:text-white dark:hover:bg-black/15 flex items-center justify-center gap-2 cursor-pointer"
        aria-label="Gửi lời chúc"
      >
        <NotebookPen className="w-4 h-4" />
        Gửi lời chúc
      </button>
    </div>
  )
}

