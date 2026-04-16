"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type GalleryFlyInItem = {
  src: string;
  alt: string;
};

/** Dùng vw/vh để ScrollTrigger refresh ổn khi resize. */
function flyOffset(i: number) {
  const d = i % 6;
  switch (d) {
    case 0:
      return { x: "-30vw", y: "14vh" };
    case 1:
      return { x: "30vw", y: "12vh" };
    case 2:
      return { x: "-26vw", y: "22vh" };
    case 3:
      return { x: "28vw", y: "20vh" };
    case 4:
      return { x: "8vw", y: "-18vh" };
    default:
      return { x: "-6vw", y: "26vh" };
  }
}

/**
 * Grid ảnh: cuộn từ dưới lên section #thu-vien-anh, các ô bay từ ngoài vào vị trí (scrub theo scroll).
 */
export function GalleryGridScrollFlyIn({ items }: { items: GalleryFlyInItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || items.length === 0) return;

    const section = document.getElementById("thu-vien-anh");
    if (!section) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cells = gsap.utils.toArray<HTMLElement>(
      grid.querySelectorAll("[data-gallery-fly-cell]"),
    );
    if (cells.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 18%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      cells.forEach((cell, i) => {
        const { x, y } = flyOffset(i);
        const rot = (i % 2 === 0 ? -1 : 1) * (9 + (i % 4));
        tl.fromTo(
          cell,
          {
            x,
            y,
            rotation: rot,
            scale: 0.82,
            opacity: 0.35,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.55,
          },
          i * 0.065,
        );
      });
    }, grid);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [items]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-3 overflow-visible md:grid-cols-3 md:gap-4"
    >
      {items.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          data-gallery-fly-cell
          className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary/10 shadow-md will-change-transform dark:border-primary/20"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="(max-width:768px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
