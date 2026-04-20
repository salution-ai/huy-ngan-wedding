"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Section hiện tại (vd. `thoi-gian-va-dia-diem`) */
  sectionId: string;
  /** Section phía trên cần nhảy tới (vd. `year-scroll`) */
  prevId: string;
  /**
   * Nếu đỉnh section còn cao hơn đỉnh viewport hơn px này → vẫn còn nội dung phía trên trong section,
   * cho phép cuộn bình thường. Khi đã gần đầu section → một lần cuộn/vuốt lên nhảy tới prev.
   */
  unreadAbovePx?: number;
};

/**
 * Cuộn lên / vuốt lên (xem nội dung phía trên trang) khi đang gần đầu section → scroll tới `prevId` một bước,
 * hiển thị đầy đủ màn phía trên (vd. từ Thời gian làm lễ → Year scroll).
 */
export function SectionUpScrollGate({
  sectionId,
  prevId,
  unreadAbovePx = 36,
}: Props) {
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const go = () => {
      if (lockRef.current) return;
      const el = document.getElementById(prevId);
      if (!el) return;
      lockRef.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    const canAdvanceToPrev = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Đã cuộn sâu vào section (đỉnh section nằm phía trên viewport) → vẫn cuộn trong section.
      if (rect.top < -unreadAbovePx) return false;
      // Section không còn trong viewport (đã cuộn xuống dưới).
      if (rect.top >= vh || rect.bottom <= 0) return false;
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return;
      if (!canAdvanceToPrev()) return;
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
      // Vuốt xuống (ngón tay kéo xuống) → nội dung cuộn lên / xem phía trên.
      if (dy >= 0) return;
      if (!canAdvanceToPrev()) return;
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
  }, [sectionId, prevId, unreadAbovePx]);

  return null;
}
