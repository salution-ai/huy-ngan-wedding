"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from "framer-motion"

type YearSlide = {
  year: string
  topImageSrc: string
  bottomImageSrc: string
}

function YearFrame({ slide }: { slide: YearSlide }) {
  const overlapPct = 12
  return (
    <div className="relative h-screen w-full">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Top image (fade out at bottom) */}
        <div
          className="absolute left-0 top-0 w-full"
          style={{ height: `${50 + overlapPct / 2}%` }}
        >
          <img
            src={slide.topImageSrc}
            alt="Huy Ngân Wedding"
            className="h-full w-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* Bottom image (fade out at top) */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: `${50 + overlapPct / 2}%` }}
        >
          <img
            src={slide.bottomImageSrc}
            alt="Huy Ngân Wedding"
            className="h-full w-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Old-film warm overlay (only in YearScroll) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 236, 193, 0.10) 0%, rgba(255, 216, 140, 0.14) 55%, rgba(160, 110, 30, 0.10) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />
    </div>
  )
}

export function YearScroll() {
  const ref = useRef<HTMLDivElement | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const wheelAccumRef = useRef(0)
  const lockRef = useRef(false)

  const slides = useMemo<YearSlide[]>(() => {
    // NOTE: Hiện repo chỉ có 3 ảnh trong /public/gallery.
    // Bạn có thể thay src từng năm sau, logic scroll sẽ tự chạy 2016→2026.
    const fallbackTop = "/gallery/TAJ09178.JPG"
    const fallbackBottom = "/gallery/TAJ09178.JPG"

    const byYear: Record<string, { top: string; bottom: string }> = {
      "2016": { top: "/gallery/2016.jpg", bottom: "/gallery/2016%20(2).jpg" },
      "2017": { top: "/gallery/2017.jpg", bottom: "/gallery/2017%20(2).jpg" },
      "2018": { top: "/gallery/2018.jpg", bottom: "/gallery/2018%20(2).jpg" },
      "2019": { top: "/gallery/2019.jpg", bottom: "/gallery/2019%20(2).jpg" },
      "2020": { top: "/gallery/2020.jpg", bottom: "/gallery/2020%20(2).jpg" },
      "2021": { top: "/gallery/2021.jpeg", bottom: "/gallery/2021%20(2).jpg" },
      "2022": { top: "/gallery/2022.jpg", bottom: "/gallery/2022%20(2).jpg" },
      "2023": { top: "/gallery/2023.jpg", bottom: "/gallery/2023%20(2).jpg" },
      "2024": { top: "/gallery/2024.jpg", bottom: "/gallery/2024%20(2).jpg" },
      "2025": { top: "/gallery/2025.jpg", bottom: "/gallery/2025%20(2).jpg" },
      "2026": { top: "/gallery/2026.jpg", bottom: "/gallery/2026%20(2).jpg" },
    }

    return Object.entries(byYear).map(([year, src]) => ({
      year,
      topImageSrc: src.top,
      bottomImageSrc: src.bottom,
    }))
  }, [])

  const [index, setIndex] = useState(0)
  const currentYear = slides[index]?.year ?? "2016"
  const yearSuffix = currentYear.slice(2) // "2016" -> "16"
  const maxIndex = slides.length - 1

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const step = (dir: 1 | -1) => {
      if (lockRef.current) return
      setIndex((prev) => {
        const next = Math.max(0, Math.min(maxIndex, prev + dir))
        if (next === prev) return prev
        lockRef.current = true
        window.setTimeout(() => {
          lockRef.current = false
          wheelAccumRef.current = 0
        }, 420)
        return next
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) {
        e.preventDefault()
        return
      }

      // Prevent page from scrolling while YearScroll can handle this direction,
      // even before we reach the threshold to change the year.
      if ((e.deltaY > 0 && index < maxIndex) || (e.deltaY < 0 && index > 0)) {
        e.preventDefault()
      }

      // Reset accumulation when direction changes.
      if (wheelAccumRef.current !== 0 && Math.sign(wheelAccumRef.current) !== Math.sign(e.deltaY)) {
        wheelAccumRef.current = 0
      }

      wheelAccumRef.current += e.deltaY
      const threshold = 60

      if (wheelAccumRef.current > threshold) {
        // Scroll down => next year (unless already at last)
        if (index < maxIndex) {
          step(1)
        } else {
          wheelAccumRef.current = 0
        }
      } else if (wheelAccumRef.current < -threshold) {
        // Scroll up => previous year (unless already at first)
        if (index > 0) {
          step(-1)
        } else {
          wheelAccumRef.current = 0
        }
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    const onTouchMove = (e: TouchEvent) => {
      // While we can still change years, prevent the page from scrolling.
      if (lockRef.current) {
        e.preventDefault()
        return
      }
      const startY = touchStartYRef.current
      if (startY == null) return
      const curY = e.touches[0]?.clientY
      if (curY == null) return
      const dy = startY - curY // swipe up => positive (scroll down)
      const threshold = 40

      // Prevent page from scrolling while YearScroll can handle this direction,
      // even before we reach the threshold to change the year.
      if ((dy > 0 && index < maxIndex) || (dy < 0 && index > 0)) {
        e.preventDefault()
      }

      if (dy > threshold && index < maxIndex) {
        touchStartYRef.current = null
        step(1)
      } else if (dy < -threshold && index > 0) {
        touchStartYRef.current = null
        step(-1)
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
    }
  }, [index, maxIndex])

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        className="relative h-screen w-full overflow-hidden"
        style={{
          // Allow leaving the YearScroll when at boundaries.
          // Lock touch panning only while we can step between years.
          touchAction: index > 0 && index < maxIndex ? "none" : "pan-y",
          overscrollBehavior: index > 0 && index < maxIndex ? "contain" : "auto",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentYear}
            initial={{ opacity: 0, scale: 1.01, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.99, filter: "blur(2px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <YearFrame slide={slides[index] ?? slides[0]} />
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap text-8xl font-black leading-none text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)] [font-variant-numeric:tabular-nums]">
          <span className="leading-none">20</span>
          <span className="relative inline-grid h-[1em] w-[2ch] place-items-center overflow-hidden align-middle leading-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={yearSuffix}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 grid place-items-center leading-none"
              >
                {yearSuffix}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </div>
    </MotionConfig>
  )
}

