"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type GalleryMarqueeItem = {
  src: string;
  alt: string;
};

export function GalleryHorizontalMarquee({
  items,
  reverse = false,
  className,
}: {
  items: GalleryMarqueeItem[];
  /** Cuộn sang phải (ngược chiều mặc định). */
  reverse?: boolean;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const row = rowRef.current;
    if (!root || !track || !row || items.length === 0) return;

    let tween: gsap.core.Tween | undefined;

    const run = () => {
      tween?.kill();
      const w = row.scrollWidth;
      if (w < 1) return;
      const duration = Math.max(22, w / 42);
      if (reverse) {
        gsap.set(track, { x: -w });
        tween = gsap.to(track, {
          x: 0,
          duration,
          ease: "none",
          repeat: -1,
        });
      } else {
        gsap.set(track, { x: 0 });
        tween = gsap.to(track, {
          x: -w,
          duration,
          ease: "none",
          repeat: -1,
        });
      }
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(root);
    return () => {
      ro.disconnect();
      tween?.kill();
    };
  }, [items, reverse]);

  if (items.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "mt-10 w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={rowRef} className="flex shrink-0 gap-4 pr-4">
          {items.map((img, i) => (
            <div
              key={`marquee-a-${i}`}
              className="relative h-56 w-40 shrink-0 overflow-hidden rounded-xl border border-[#b22f2f]/15 shadow-md md:h-72 md:w-52 dark:border-[#b22f2f]/25"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover select-none"
                sizes="(max-width:768px) 160px, 208px"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 gap-4 pr-4"
          aria-hidden
        >
          {items.map((img, i) => (
            <div
              key={`marquee-b-${i}`}
              className="relative h-56 w-40 shrink-0 overflow-hidden rounded-xl border border-[#b22f2f]/15 shadow-md md:h-72 md:w-52 dark:border-[#b22f2f]/25"
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover select-none"
                sizes="(max-width:768px) 160px, 208px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
