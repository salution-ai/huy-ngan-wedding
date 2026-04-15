"use client"

import { useMemo, useRef, useState } from "react"
import type { WeddingGuest } from "@/components/wedding/wedding-invitation"
import { EvasiveDeclineButton } from "@/components/wedding/evasive-decline-button"

type Props = {
  guest: WeddingGuest
  className?: string
}

function toInt(v: unknown) {
  const n = Number.parseInt(String(v ?? "0"), 10)
  return Number.isFinite(n) ? n : 0
}

export function ComingDeclineButton({ guest, className }: Props) {
  const initial = useMemo(() => toInt(guest.declineNum), [guest.declineNum])
  const [declineNum, setDeclineNum] = useState(initial)
  const inFlightRef = useRef(false)

  const attempt = async () => {
    const next = declineNum + 1
    setDeclineNum(next)

    if (inFlightRef.current) return
    inFlightRef.current = true
    try {
      await fetch("https://n8n.salution.net/webhook/coming-decline", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug: guest.slug,
          id: guest.id,
          row_number: guest.row_number,
          name: guest.name,
          title: guest.title,
          titleLow: guest.titleLow,
          self: guest.self,
          selfLow: guest.selfLow,
          declineNum: next,
        }),
      })
    } finally {
      // small debounce window to avoid spamming if user taps rapidly
      window.setTimeout(() => {
        inFlightRef.current = false
      }, 600)
    }
  }

  return (
    <EvasiveDeclineButton className={className} onDeclineAttempt={attempt}>
      {guest.title} không thể đến
    </EvasiveDeclineButton>
  )
}

