"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InviteCountdown } from "@/components/wedding/invite-countdown";

gsap.registerPlugin(ScrollTrigger);

export function InviteCountdownSection({
  titleClassName,
}: {
  titleClassName: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [countdownReady, setCountdownReady] = useState(false);

  useLayoutEffect(() => {
    if (!countdownReady) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const title = root.querySelector<HTMLElement>('[data-reveal="title"]');
      const values = root.querySelectorAll<HTMLElement>(
        '[data-reveal="cell-value"]',
      );
      const labels = root.querySelectorAll<HTMLElement>(
        '[data-reveal="cell-label"]',
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.85, immediateRender: false },
          0,
        );
      }
      if (values.length) {
        tl.fromTo(
          values,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            immediateRender: false,
          },
          0.12,
        );
      }
      if (labels.length) {
        tl.fromTo(
          labels,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            immediateRender: false,
          },
          0.22,
        );
      }
    }, root);

    return () => ctx.revert();
  }, [countdownReady]);

  return (
    <section
      ref={rootRef}
      id="dem-nguoc"
      className="py-10"
      data-wedding-reveal-skip
    >
      <div className="container-custom max-w-2xl">
        <h2
          data-reveal="title"
          className={titleClassName}
        >
          Đếm ngược đến ngày vui
        </h2>
        <div className="mt-8">
          <InviteCountdown onCountdownReady={() => setCountdownReady(true)} />
        </div>
      </div>
    </section>
  );
}
