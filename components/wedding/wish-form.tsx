"use client"

import gsap from "gsap"
import { Circle, Heart } from "lucide-react"
import { useCallback, useMemo, useRef, useState } from "react"
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
  const [bubbleMode, setBubbleMode] = useState(false)
  const [bubbleDeparted, setBubbleDeparted] = useState(false)
  const submitBtnRef = useRef<HTMLButtonElement | null>(null)
  const bubbleLockRef = useRef(false)

  const canSubmit =
    alias.trim().length > 0 && wish.trim().length > 0 && status !== "sending"

  const submit = useCallback(async () => {
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
  }, [alias, guest, status, wish])

  const animateBubble = useCallback(() => {
    const btn = submitBtnRef.current
    if (!btn) return
    if (bubbleLockRef.current) return
    bubbleLockRef.current = true
    setBubbleMode(true)

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setBubbleDeparted(true)
      return
    }

    const h = window.innerHeight

    gsap.killTweensOf(btn)
    gsap.set(btn, {
      willChange: "transform",
      backgroundColor: "rgba(255,255,255,0.10)",
      borderColor: "rgba(178,47,47,0.55)",
      boxShadow: "0 18px 44px rgba(0,0,0,0.12)",
      backdropFilter: "blur(10px)",
    })

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setBubbleDeparted(true),
    })
    tl.to(btn, { scale: 1.04, duration: 0.12 })
      .to(
        btn,
        {
          borderRadius: 9999,
          width: 56,
          minWidth: 56,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 2,
          duration: 0.22,
          ease: "power2.inOut",
        },
        "<0.02",
      )
      .to(
        btn,
        {
          y: -Math.min(170, h * 0.22),
          x: 18,
          rotation: 10,
          duration: 0.55,
          ease: "sine.inOut",
        },
        "<0.06",
      )
      .to(
        btn,
        {
          y: `-=${Math.min(46, h * 0.06)}`,
          x: 8,
          rotation: 6,
          duration: 0.55,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 3,
        },
        ">-0.05",
      )
      .to(btn, {
        y: -Math.min(520, h * 0.75),
        x: 0,
        rotation: 0,
        scale: 0.92,
        duration: 0.65,
        ease: "power2.in",
      })
      .to(btn, { opacity: 0, duration: 0.18 }, "<0.35")
  }, [])

  const onSubmitClick = useCallback(() => {
    animateBubble()
    void submit()
  }, [animateBubble, submit])

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
      <div className="w-full">
        <div
          className="mb-2 text-sm font-semibold text-[#b22f2f]"
          data-wedding-reveal
        >
          Bí danh
        </div>
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
        {bubbleDeparted ? null : (
          <Button
            ref={submitBtnRef}
            className={
              bubbleMode
                ? "bg-transparent text-[#b22f2f] border border-[#b22f2f]/50"
                : "bg-[#b22f2f] text-white"
            }
            data-wedding-reveal
            onClick={onSubmitClick}
            disabled={!canSubmit}
          >
            {bubbleMode ? (
              "💖"
            ) : status === "sending" ? (
              "Đang gửi..."
            ) : (
              "Gửi lời chúc"
            )}
          </Button>
        )}

        {message ? (
          <div
            className={`text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
            data-wedding-reveal
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

