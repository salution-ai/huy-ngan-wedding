"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EvasiveDeclineButtonProps = {
  className?: string;
  children: ReactNode;
};

const PLAY_AREA_CLASS =
  "inline-grid min-h-[12rem] w-[min(100%,18rem)] shrink-0";

/**
 * Ban đầu: nút bình thường, cùng hàng với nút kia.
 * Sau hover / click / chạm: khung lớn + absolute + top/right ngẫu nhiên để khó bấm trúng.
 */
export function EvasiveDeclineButton({
  className,
  children,
}: EvasiveDeclineButtonProps) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [escaped, setEscaped] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

  const randomPosInWrap = useCallback(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;
    const pad = 8;
    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;
    const maxTop = Math.max(pad, wrap.clientHeight - bh - pad);
    const maxRight = Math.max(pad, wrap.clientWidth - bw - pad);
    setPos({
      top: pad + Math.random() * (maxTop - pad),
      right: pad + Math.random() * (maxRight - pad),
    });
  }, []);

  useLayoutEffect(() => {
    if (!escaped) return;
    randomPosInWrap();
  }, [escaped, randomPosInWrap]);

  const jump = useCallback(() => {
    if (!escaped) {
      setEscaped(true);
      return;
    }
    randomPosInWrap();
  }, [escaped, randomPosInWrap]);

  return (
    <span
      ref={wrapRef}
      className={cn(
        "relative",
        escaped ? PLAY_AREA_CLASS : "inline-flex shrink-0",
        escaped && pos == null && "place-items-center",
      )}
    >
      <Button
        ref={btnRef}
        type="button"
        className={cn(
          className,
          escaped &&
            pos != null &&
            "absolute z-[100] select-none touch-manipulation",
        )}
        style={
          escaped && pos != null
            ? { top: pos.top, right: pos.right }
            : undefined
        }
        onMouseEnter={jump}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          jump();
        }}
      >
        {children}
      </Button>
    </span>
  );
}
