"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { WeddingGuest } from "@/components/wedding/wedding-invitation"

type Props = {
  guest: WeddingGuest
}

export function WishForm({ guest }: Props) {
  const initial = useMemo(() => guest.wish?.toString().trim() ?? "", [guest.wish])
  const initialAlias = useMemo(() => guest.name?.toString().trim() ?? "", [guest.name])
  const [alias, setAlias] = useState(initialAlias)
  const [wish, setWish] = useState(initial)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  )
  const [message, setMessage] = useState<string>("")

  const canSubmit =
    alias.trim().length > 0 && wish.trim().length > 0 && status !== "sending"

  const submit = async () => {
    const content = wish.trim()
    if (!content || status === "sending") return

    setStatus("sending")
    setMessage("")

    try {
      const res = await fetch("https://n8n.salution.net/webhook/send-wish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug: guest.slug,
          id: guest.id,
          row_number: guest.row_number,
          name: guest.name,
          alias: alias.trim(),
          title: guest.title,
          titleLow: guest.titleLow,
          self: guest.self,
          selfLow: guest.selfLow,
          wish: content,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus("success")
      setMessage(`${guest.self} sẽ đọc lời chúc của ${guest.titleLow} hàng ngày. ${guest.self} cảm ơn rất nhiều ạaaa.`)
      setWish("")
    } catch {
      setStatus("error")
      setMessage("Gửi lời chúc thất bại. Vui lòng thử lại.")
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
      <div className="w-full">
        <div className="mb-2 text-sm font-semibold text-[#b22f2f]">Bí danh</div>
      <Input
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        className="w-full bg-white text-[#b22f2f] border-2 border-[#b22f2f]"
        placeholder="Nhập bí danh của bạn"
        aria-label="Bí danh"
      />
      </div>

      <Textarea
        rows={20}
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        className="w-full bg-white text-[#b22f2f] border-2 border-[#b22f2f]"
        placeholder={`Viết lời chúc của ${guest.titleLow} vào đây nè...`}
      />

      <div className="flex w-full flex-col items-center gap-3">
        <Button
          className="bg-[#b22f2f] text-white"
          onClick={submit}
          disabled={!canSubmit}
        >
          {status === "sending" ? "Đang gửi..." : "Gửi lời chúc"}
        </Button>

        {message ? (
          <div
            className={`text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        ) : null}
      </div>
    </div>
  )
}

