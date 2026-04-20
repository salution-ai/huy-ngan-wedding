"use client";

import { useEffect, useState } from "react";
import { GalleryGridScrollFlyIn } from "@/components/wedding/gallery-grid-scroll-fly-in";
import { GalleryHorizontalMarquee } from "@/components/wedding/gallery-horizontal-marquee";

type Item = { src: string; alt: string };

function useIsMobile(breakpointPx = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpointPx]);

  return isMobile;
}

export function ResponsiveGallery({
  mobileItems,
  desktopItems,
  allItems,
}: {
  mobileItems: Item[];
  desktopItems: Item[];
  allItems: Item[];
}) {
  const isMobile = useIsMobile(1024); // Tailwind `lg` breakpoint
  const items = isMobile ? mobileItems : desktopItems;

  return (
    <>
      <GalleryGridScrollFlyIn items={items} />
      <GalleryHorizontalMarquee items={allItems} className="lg:hidden" />
      <GalleryHorizontalMarquee items={allItems} reverse className="mt-2 lg:hidden" />
    </>
  );
}

