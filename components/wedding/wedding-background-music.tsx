"use client";

import { useEffect, useRef, useState } from "react";
import { weddingContent } from "@/content/wedding";
import { Volume2, VolumeX } from "lucide-react";

const { backgroundMusic } = weddingContent;

/**
 * Phát nhạc nền khi load — thử autoplay; nếu trình duyệt chặn thì phát sau lần tương tác đầu tiên.
 */
export function WeddingBackgroundMusic() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

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
      if (el.muted) return;
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
    if (!muted) {
      el.play().catch(() => {});
    }
  }, [muted]);

  const src = backgroundMusic?.src?.trim();
  if (!src) return null;

  return (
    <>
      <audio
        ref={ref}
        src={src}
        loop
        playsInline
        preload="auto"
        className="pointer-events-none fixed left-0 top-0 h-0 w-0 opacity-0"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-white/10 dark:bg-black/40 dark:text-white dark:hover:bg-black/55"
        aria-label={muted ? "Bật nhạc" : "Tắt nhạc"}
      >
        {muted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
