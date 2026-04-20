"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WeddingGuest } from "@/components/wedding/wedding-invitation";
import { useGuestAliasSync } from "@/components/wedding/guest-alias-sync";
import { cn } from "@/lib/utils";

const PARTY_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "infinity", label: "∞" },
] as const;

type Props = {
  guest: WeddingGuest;
  className?: string;
};

export function ComingConfirmPublicForm({ guest, className }: Props) {
  const { setConfirmDisplayName } = useGuestAliasSync();
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState<string>("1");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const submit = async () => {
    const trimmed = name.trim();
    if (!trimmed || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(
        "https://n8n.salution.net/webhook/coming-confirm-guest",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            slug: guest.slug,
            id: guest.id,
            row_number: guest.row_number,
            title: guest.title,
            titleLow: guest.titleLow,
            self: guest.self,
            selfLow: guest.selfLow,
            inviteName: guest.name,
            respondentName: trimmed,
            partySize,
            join: "yes",
            joinAt: new Date().toISOString(),
          }),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1600);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col gap-6 text-left font-normal",
        className,
      )}
      data-wedding-reveal
    >
      <p className="text-center text-base font-semibold text-stone-800 dark:text-stone-100 md:text-lg">
        Quý khách vui lòng điền họ tên và số người tham dự để xác nhận cùng{" "}
        {guest.selfLow} nhé 💖
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="coming-guest-name" className="text-stone-800 dark:text-stone-100">
          Họ và tên
        </Label>
        <Input
          id="coming-guest-name"
          value={name}
          onChange={(e) => {
            const v = e.target.value;
            setName(v);
            setConfirmDisplayName(v);
          }}
          placeholder="Nhập họ tên"
          autoComplete="name"
          disabled={status === "sending" || status === "success"}
          className="border-[#b22f2f]/25 bg-white text-stone-900 focus-visible:ring-[#b22f2f]/40 dark:bg-stone-950 dark:text-stone-100"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="coming-party-size"
          className="text-stone-800 dark:text-stone-100"
        >
          Số lượng người
        </Label>
        <select
          id="coming-party-size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          disabled={status === "sending" || status === "success"}
          className="flex h-10 w-full rounded-md border border-[#b22f2f]/25 bg-white px-3 py-2 text-base text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#b22f2f]/40 disabled:opacity-50 md:text-sm dark:bg-stone-950 dark:text-stone-100"
        >
          {PARTY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        className="w-full bg-[#b22f2f] text-white hover:bg-[#b22f2f]/90"
        onClick={submit}
        disabled={
          status === "sending" ||
          status === "success" ||
          !name.trim()
        }
      >
        {status === "sending"
          ? "Đang gửi..."
          : status === "success"
            ? "Đã xác nhận"
            : status === "error"
              ? "Gửi lỗi — thử lại"
              : "Xác nhận tham dự"}
      </Button>
    </div>
  );
}
