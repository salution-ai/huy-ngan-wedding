"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { WeddingGuest } from "@/components/wedding/wedding-invitation"

type Props = {
  guest: WeddingGuest
  className?: string
}

export function ComingConfirmButton({ guest, className }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  )

  const submit = async () => {
    if (status === "sending") return
    setStatus("sending")
    try {
      const res = await fetch("https://n8n.salution.net/webhook/coming-confirm", {
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
          join: "yes",
          joinAt: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("success")
    } catch {
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 1200)
    }
  }

  return (
    <Button
      className={className}
      data-wedding-reveal
      onClick={submit}
      disabled={status === "sending" || status === "success"}
    >
      {status === "sending"
        ? "Đang gửi..."
        : status === "success"
          ? "Đã xác nhận"
          : "Chắc chắn rồi"}
    </Button>
  )
}

