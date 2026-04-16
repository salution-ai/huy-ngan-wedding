"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tìm mọi phần tử `[data-wedding-reveal]` trong cây con, bỏ qua nhánh `[data-wedding-reveal-skip]`.
 * ScrollTrigger: fade + trượt nhẹ khi vào viewport.
 * MutationObserver: bắt phần tử xuất hiện sau (vd. nút WishCta khi đủ điều kiện).
 */
export function WeddingPageTextReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const seen = new WeakSet<HTMLElement>();
    const tweens: gsap.core.Tween[] = [];

    const bindOne = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      const tw = gsap.fromTo(
        el,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
          immediateRender: false,
        },
      );
      tweens.push(tw);
    };

    const scan = () => {
      const nodeList = root.querySelectorAll<HTMLElement>("[data-wedding-reveal]");
      nodeList.forEach((el) => {
        if (!el.closest("[data-wedding-reveal-skip]")) bindOne(el);
      });
    };

    scan();
    const mo = new MutationObserver(() => {
      scan();
    });
    mo.observe(root, { childList: true, subtree: true });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      mo.disconnect();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
