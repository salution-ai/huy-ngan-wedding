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

/**
 * Nút “từ chối” đùa: luôn nhảy chỗ khi hover / click / chạm để khách khó bấm trúng.
 */
export function EvasiveDeclineButton({
  className,
  children,
}: EvasiveDeclineButtonProps) {
  const measureRef = useRef<HTMLButtonElement | null>(null);
  const [layout, setLayout] = useState<{
    w: number;
    h: number;
    left: number;
    top: number;
  } | null>(null);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setLayout({
      w: r.width,
      h: r.height,
      left: r.left,
      top: r.top,
    });
  }, []);

  const jump = useCallback(() => {
    setLayout((prev) => {
      if (!prev) return prev;
      const pad = 8;
      const maxL = Math.max(pad, window.innerWidth - prev.w - pad);
      const maxT = Math.max(pad, window.innerHeight - prev.h - pad);
      return {
        ...prev,
        left: pad + Math.random() * (maxL - pad),
        top: pad + Math.random() * (maxT - pad),
      };
    });
  }, []);

  if (!layout) {
    return (
      <span className="inline-flex">
        <Button ref={measureRef} type="button" className={className}>
          {children}
        </Button>
      </span>
    );
  }

  return (
    <>
      <span
        aria-hidden
        className="inline-block shrink-0"
        style={{ width: layout.w, height: layout.h }}
      />
      <Button
        ref={measureRef}
        type="button"
        className={cn(
          className,
          "fixed z-[100] select-none touch-manipulation",
        )}
        style={{ left: layout.left, top: layout.top }}
        onMouseEnter={jump}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          jump();
        }}
      >
        {children}
      </Button>
    </>
  );
}
