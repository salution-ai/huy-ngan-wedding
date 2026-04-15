"use client";

import { useEffect, useRef } from "react";
import { weddingContent } from "@/content/wedding";

const { backgroundMusic } = weddingContent;

/**
 * Phát nhạc nền khi load — thử autoplay; nếu trình duyệt chặn thì phát sau lần tương tác đầu tiên.
 */
export function WeddingBackgroundMusic() {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const src = backgroundMusic?.src?.trim();
    if (!src) return;

    const el = ref.current;
    if (!el) return;

    el.volume = Math.min(1, Math.max(0, backgroundMusic.volume ?? 0.35));

    const cleanupListeners = () => {
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("keydown", resume);
    };

    const resume = () => {
      el.play()
        .then(() => {
          cleanupListeners();
        })
        .catch(() => {});
    };

    el.play()
      .then(() => {
        cleanupListeners();
      })
      .catch(() => {
        document.addEventListener("pointerdown", resume);
        document.addEventListener("keydown", resume);
      });

    return () => {
      cleanupListeners();
      el.pause();
      el.currentTime = 0;
    };
  }, []);

  const src = backgroundMusic?.src?.trim();
  if (!src) return null;

  return (
    <audio
      ref={ref}
      src={src}
      loop
      playsInline
      preload="auto"
      className="pointer-events-none fixed left-0 top-0 h-0 w-0 opacity-0"
      aria-hidden
    />
  );
}
