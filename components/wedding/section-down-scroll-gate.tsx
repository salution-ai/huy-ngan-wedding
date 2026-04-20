"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Section nguồn (vd. `thiep-moi`) */
  sectionId: string;
  /** Section đích (vd. `year-scroll`) */
  nextId: string;
  /**
   * Nếu đáy section còn thấp hơn đáy viewport hơn px này → vẫn còn nội dung phía dưới,
   * cho phép cuộn trang bình thường. Khi đã cuối section → một lần cuốn xuống nhảy tới next.
   */
  unreadBelowPx?: number;
};

/**
 * Khi người dùng đang xem `sectionId` và cuộn/vuốt xuống:
 * - Nếu còn nội dung phía dưới trong section → không chặn (đọc tiếp).
 * - Nếu đã thấy hết nội dung section (hoặc section gọn trong một màn) → scroll tới `nextId` một bước (giống OneScreenScrollGate ở hero).
 */
export function SectionDownScrollGate({
  sectionId,
  nextId,
  unreadBelowPx = 36,
}: Props) {
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent ?? "" : "";
    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (typeof navigator !== "undefined" &&
        navigator.platform === "MacIntel" &&
        (navigator.maxTouchPoints ?? 0) > 1);
    const isFBInApp = /FBAN|FBAV|FB_IAB/i.test(ua);
    // iOS FB/Messenger/IG in-app browsers are very sensitive to non-passive
    // scroll listeners; snapping here can trap native scroll.
    if (isIOS && isFBInApp) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const go = () => {
      if (lockRef.current) return;
      const el = document.getElementById(nextId);
      if (!el) return;
      lockRef.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    const canAdvanceFromSection = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Còn phần section nằm dưới đáy viewport → chưa nhảy.
      if (rect.bottom > vh + unreadBelowPx) return false;
      // Section không còn (hoặc gần như) trong viewport → không áp dụng.
      if (rect.bottom <= 0 || rect.top >= vh) return false;
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      if (!canAdvanceFromSection()) return;
      e.preventDefault();
      go();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const startY = touchStartYRef.current;
      if (startY == null) return;
      const curY = e.touches[0]?.clientY;
      if (curY == null) return;
      const dy = startY - curY;
      if (dy <= 0) return;
      if (!canAdvanceFromSection()) return;
      e.preventDefault();
      touchStartYRef.current = null;
      go();
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
    };
  }, [sectionId, nextId, unreadBelowPx]);

  return null;
}
