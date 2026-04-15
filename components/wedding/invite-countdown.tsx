"use client"

import { useEffect, useState } from "react"
import { weddingContent } from "@/content/wedding"
import { Great_Vibes, Roboto_Slab } from "next/font/google"

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const robotoSlab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export function InviteCountdown() {
  const target = new Date(weddingContent.date.countdownIso).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  if (now === null) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {["Ngày", "Giờ", "Phút", "Giây"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[#b22f2f]/20 bg-[#faf7f2] px-2 py-3 shadow-sm backdrop-blur-sm dark:bg-[#1c1917]"
          >
            <div className={`${greatVibes.className} text-2xl text-[#b22f2f] sm:text-3xl`}>--</div>
            <div className={`${robotoSlab.className} text-[10px] uppercase tracking-wider text-[#b22f2f] sm:text-xs`}>{label}</div>
          </div>
        ))}
      </div>
    )
  }

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((diff % (60 * 1000)) / 1000)

  const items = [
    { label: "Ngày", value: String(days) },
    { label: "Giờ", value: pad(hours) },
    { label: "Phút", value: pad(minutes) },
    { label: "Giây", value: pad(seconds) },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-[#b22f2f]/20 bg-[#faf7f2] px-2 py-3 shadow-sm backdrop-blur-sm dark:bg-[#1c1917]"
        >
          <div className={`${greatVibes.className} text-6xl tabular-nums text-[#b22f2f] sm:text-3xl`}>{value}</div>
          <div className={`${robotoSlab.className} text-[14px] uppercase tracking-wider text-[#b22f2f] sm:text-xs`}>{label}</div>
        </div>
      ))}
    </div>
  )
}
