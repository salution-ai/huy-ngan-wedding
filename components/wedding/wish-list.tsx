"use client";

import { useEffect, useMemo, useState } from "react";

export type WishListItem = {
  row_number?: number;
  wish: string;
  wishNickname: string;
  wishAt?: string;
};

function normalizeWishList(data: unknown): WishListItem[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((x) => {
      const rec = (x ?? {}) as Record<string, unknown>;
      const wish = typeof rec.wish === "string" ? rec.wish : "";
      const wishNickname =
        typeof rec.wishNickname === "string" ? rec.wishNickname : "";
      const wishAt = typeof rec.wishAt === "string" ? rec.wishAt : undefined;
      const row_number =
        typeof rec.row_number === "number" ? rec.row_number : undefined;
      return wish && wishNickname
        ? { wish, wishNickname, wishAt, row_number }
        : null;
    })
    .filter(Boolean) as WishListItem[];
}

function wishAtMs(w: WishListItem): number {
  const s = (w.wishAt ?? "").trim();
  if (!s) return -1;
  const ms = Date.parse(s);
  return Number.isFinite(ms) ? ms : -1;
}

export function WishList({
  apiUrl = "https://n8n.salution.net/webhook/wish-list",
}: {
  apiUrl?: string;
}) {
  const [items, setItems] = useState<WishListItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setStatus("loading");
      try {
        const res = await fetch(apiUrl, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as unknown;
        const list = normalizeWishList(json);
        if (cancelled) return;
        setItems(list);
        setStatus("success");
      } catch {
        if (cancelled) return;
        setStatus("error");
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const shown = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => wishAtMs(b) - wishAtMs(a));
    return copy;
  }, [items]);

  return (
    <div className="mt-10">
      <div
        className="text-center text-lg font-bold text-[#b22f2f]"
        data-wedding-reveal
      >
        Lời chúc của mọi người
      </div>

      {status === "loading" ? (
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#b22f2f]/15 bg-white/50 p-4 shadow-sm backdrop-blur dark:bg-black/10"
            >
              <div className="h-4 w-3/4 rounded bg-[#b22f2f]/10" />
              <div className="mt-3 h-3 w-1/3 rounded bg-[#b22f2f]/10" />
            </div>
          ))}
        </div>
      ) : status === "error" ? (
        <div
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center text-sm text-red-600"
          role="status"
          aria-live="polite"
        >
          Không tải được danh sách lời chúc. Vui lòng thử lại sau.
        </div>
      ) : shown.length === 0 ? (
        <div
          className="mt-4 rounded-xl border border-[#b22f2f]/15 bg-white/50 p-4 text-center text-sm text-[#b22f2f]/80 shadow-sm backdrop-blur dark:bg-black/10"
          role="status"
          aria-live="polite"
        >
          Chưa có lời chúc nào. Bạn hãy là người đầu tiên nhé.
        </div>
      ) : (
        <div className="wish-scrollbar mt-4 max-h-[60vh] overflow-y-auto rounded-xl border border-[#b22f2f]/15 bg-white/40 p-3 shadow-sm backdrop-blur dark:bg-black/10">
          <div className="grid gap-3">
            {shown.map((w, i) => (
            <div
              key={`${w.row_number ?? "x"}-${i}`}
              className="rounded-xl border border-[#b22f2f]/15 bg-white/60 p-4 shadow-sm backdrop-blur dark:bg-black/10"
            >
              <div className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                {w.wishNickname}
              </div>
              <div className="mt-1 whitespace-pre-wrap break-words text-sm font-normal text-stone-700 dark:text-stone-200">
                {w.wish}
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

