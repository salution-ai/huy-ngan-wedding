"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ScrollDownHint } from "@/components/wedding/scroll-down-hint";
import { weddingContent } from "@/content/wedding";
import { Playwrite_IE, Roboto_Slab } from "next/font/google";

type ImagesSlide = {
  kind: "images";
  year: string;
  topImageSrc: string;
  bottomImageSrc: string;
};

type FinalSlide = {
  kind: "final";
  year: "2026";
};

const robotoSlab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const playwrightIE = Playwrite_IE({
  variable: "--font-playwrite-ie",
});

type YearSlide = ImagesSlide | FinalSlide;

/** Thời gian hiển thị đầy đủ số năm 2026 trước khi bắt đầu mờ (ms). */
const FINAL_YEAR_DIGITS_VISIBLE_MS = 1500;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      img
        .decode?.()
        .then(resolve)
        .catch(() => resolve());
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

function YearImageFrame({ slide }: { slide: ImagesSlide }) {
  const overlapPct = 12;
  return (
    <div className="relative h-screen w-full">
      <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
        <div
          className="absolute left-0 top-0 w-full"
          style={{ height: `${50 + overlapPct / 2}%` }}
        >
          <img
            src={slide.topImageSrc}
            alt="Huy Ngân Wedding"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: `${50 + overlapPct / 2}%` }}
        >
          <img
            src={slide.bottomImageSrc}
            alt="Huy Ngân Wedding"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 236, 193, 0.10) 0%, rgba(255, 216, 140, 0.14) 55%, rgba(160, 110, 30, 0.10) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 opacity-90">
        <ScrollDownHint />
      </div>
    </div>
  );
}

function Year2026Hero({ side }: { side?: "" | "groom" | "bride" }) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  } as const;

  const isBrideSide = side === "bride";

  const groomParents = (
    <div className="flex flex-1 flex-col items-center gap-1 text-center">
      <p>Ông bà</p>
      <p className="font-bold">LÊ HỮU MINH</p>
      <p className="font-bold">ĐÀO THỊ MINH</p>
      {/* <p className="text-stone-900">339 Hoàng Quốc Việt, P. Vũ Ninh, Bắc Ninh</p> */}
    </div>
  );

  const brideParents = (
    <div className="flex flex-1 flex-col items-center gap-1 text-center">
      <p>Ông bà</p>
      <p className="font-bold">NGUYỄN VĂN QUY</p>
      <p className="font-bold">ĐẶNG HẰNG MÂY</p>
      {/* <p className="text-stone-900">10 - CN4, Cụm công nghiệp và dịch vụ làng nghề Khúc Xuyên, P. Kinh Bắc, Bắc Ninh</p> */}
    </div>
  );

  const mapEmbed = isBrideSide
    ? weddingContent.mapEmbedUrl
    : weddingContent.receptionMapEmbedUrl;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen w-full bg-[#faf7f2] py-8 font-wedding-serif text-[#b22f2f] flex flex-col items-center justify-between"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/gallery/hero.JPG')] bg-cover bg-center opacity-[0.32]"
        aria-hidden
      />
      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex justify-center items-center"
      >
        <img
          src="/objects/ChuHy.png"
          alt="Chữ Hỷ"
          className="w-[25%] h-full object-cover"
        />
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex flex-row items-center justify-center gap-6 px-4 w-full"
      >
        {isBrideSide ? brideParents : groomParents}
        <div className="h-16 w-px shrink-0 bg-[#b22f2f]/40" aria-hidden />
        {isBrideSide ? groomParents : brideParents}
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-0 font-bold text-xl py-2"
      >
        <div>TRÂN TRỌNG BÁO TIN</div>
        <div>LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</div>
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`flex flex-col items-center justify-center gap-3 font-bold text-3xl py-2 ${playwrightIE.className}`}
      >
        {isBrideSide ? (
          <>
            <div>Nguyễn Thúy Ngân</div>
            <div>&</div>
            <div>Lê Đức Huy</div>
          </>
        ) : (
          <>
            <div>Lê Đức Huy</div>
            <div>&</div>
            <div>Nguyễn Thúy Ngân</div>
          </>
        )}
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`flex flex-col items-center justify-center gap-0 font-bold text-xl py-2 ${robotoSlab.className} gap-2`}
      >
        <div className="font-normal text-lg">
          Hôn lễ được cử hành tại Nhà văn hóa khu 4
        </div>
        <div>VÀO LÚC 10 GIỜ 00, THỨ BẢY</div>
        <div className="border-y-3 border-[#b22f2f]/40 px-8 py-2 text-3xl">
          02.05.2026
        </div>
        <div className="text-lg font-normal">
          (Nhằm ngày 16 tháng 3 năm Bính Ngọ)
        </div>
        <div className="mt-4 w-[80%] max-w-lg px-4">
          {mapEmbed ? (
            <div className="aspect-[5/3] w-full overflow-hidden rounded-lg border border-[#b22f2f]/30 bg-stone-100 shadow-sm">
              <iframe
                title="Bản đồ địa điểm hôn lễ"
                src={mapEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.942979708695!2d106.09018461184922!3d21.194423980415372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350c418fd79151%3A0xf759391b2c7844a7!2zTmjDoCB2xINuIGhvw6Ega2h1IHBo4buRIDQgVGjhu4sgQ-G6p3U!5e0!3m2!1svi!2s!4v1775882036991!5m2!1svi!2s" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
          ) : (
            <p className="text-center text-xs leading-relaxed text-stone-600">
              Thêm URL nhúng Google Maps vào{" "}
              <code className="rounded bg-stone-200/80 px-1 py-0.5 font-mono text-[0.7rem] text-stone-800">
                {isBrideSide ? "mapEmbedUrl" : "receptionMapEmbedUrl"}
              </code>{" "}
              trong{" "}
              <span className="font-mono text-[0.7rem]">content/wedding.ts</span>
            </p>
          )}
        </div>
      </motion.div>
      {/* <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf7f2]/90 via-[#faf7f2] to-[#faf7f2]"
        aria-hidden
      /> */}
    </motion.div>
  );
}

function YearDigits({
  yearSuffix,
  variant,
}: {
  yearSuffix: string;
  variant: "onPhoto" | "onPaper";
}) {
  const tone =
    variant === "onPhoto"
      ? "text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)]"
      : "text-stone-800 drop-shadow-[0_2px_24px_rgba(255,255,255,0.95)]";

  return (
    <span
      className={`pointer-events-none inline-flex items-center whitespace-nowrap text-8xl font-black leading-none [font-variant-numeric:tabular-nums] ${tone}`}
    >
      <span className="leading-none">20</span>
      <span className="relative inline-grid h-[1em] w-[2ch] place-items-center overflow-hidden align-middle leading-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={yearSuffix}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 grid place-items-center leading-none"
          >
            {yearSuffix}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export type YearScrollProps = {
  /** Nội dung thiệp / block thường — chỉ hiện ở màn 2026, cuộn trang bình thường. */
  year2026Content?: ReactNode;
  side?: "" | "groom" | "bride";
};

export function YearScroll({ year2026Content, side }: YearScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const wheelAccumRef = useRef(0);
  const lockRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);

  const slides = useMemo<YearSlide[]>(() => {
    const byYear: Record<string, { top: string; bottom: string }> = {
      "2016": { top: "/gallery/2016.jpg", bottom: "/gallery/2016%20(2).jpg" },
      "2017": { top: "/gallery/2017.jpg", bottom: "/gallery/2017%20(2).JPG" },
      "2018": { top: "/gallery/2018.jpg", bottom: "/gallery/2018%20(2).JPG" },
      "2019": { top: "/gallery/2019.JPG", bottom: "/gallery/2019%20(2).jpg" },
      "2020": { top: "/gallery/2020.JPG", bottom: "/gallery/2020%20(2).JPG" },
      "2021": { top: "/gallery/2021.jpeg", bottom: "/gallery/2021%20(2).JPG" },
      "2022": { top: "/gallery/2022.jpg", bottom: "/gallery/2022%20(2).jpg" },
      "2023": { top: "/gallery/2023.jpg", bottom: "/gallery/2023%20(2).jpg" },
      "2024": { top: "/gallery/2024.jpg", bottom: "/gallery/2024%20(2).JPG" },
      "2025": { top: "/gallery/2025.JPG", bottom: "/gallery/2025%20(2).JPG" },
    };

    const imageSlides: ImagesSlide[] = Object.entries(byYear).map(
      ([year, src]) => ({
        kind: "images",
        year,
        topImageSrc: src.top,
        bottomImageSrc: src.bottom,
      }),
    );

    const final: FinalSlide = { kind: "final", year: "2026" };
    return [...imageSlides, final];
  }, []);

  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];
  const currentYear = slide.year;
  const yearSuffix = currentYear.slice(2);
  const maxIndex = slides.length - 1;
  const isFinalYear = slide.kind === "final";

  useEffect(() => {
    const urls = Array.from(
      new Set(
        slides.flatMap((s) =>
          s.kind === "images" ? [s.topImageSrc, s.bottomImageSrc] : [],
        ),
      ),
    );
    void Promise.all(urls.map(preloadImage));
  }, [slides]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const step = (dir: 1 | -1) => {
      if (lockRef.current) return;
      setIndex((prev) => {
        const next = Math.max(0, Math.min(maxIndex, prev + dir));
        if (next === prev) return prev;
        lockRef.current = true;
        window.setTimeout(() => {
          lockRef.current = false;
          wheelAccumRef.current = 0;
        }, 420);
        return next;
      });
    };

    const clearIdle = () => {
      if (idleTimerRef.current != null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleAdvance = () => {
      clearIdle();
      // If user is already at final year (2026), do not auto-scroll/auto-advance.
      if (index >= maxIndex) return;
      idleTimerRef.current = window.setTimeout(() => {
        // If user stays too long without scrolling, auto-advance.
        if (lockRef.current) return;
        step(1);
      }, 5000);
    };

    const onWheel = (e: WheelEvent) => {
      scheduleIdleAdvance();
      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      if (index === maxIndex && e.deltaY > 0) {
        wheelAccumRef.current = 0;
        return;
      }
      if (index === 0 && e.deltaY < 0) {
        wheelAccumRef.current = 0;
        return;
      }

      if ((e.deltaY > 0 && index < maxIndex) || (e.deltaY < 0 && index > 0)) {
        e.preventDefault();
      }

      if (
        wheelAccumRef.current !== 0 &&
        Math.sign(wheelAccumRef.current) !== Math.sign(e.deltaY)
      ) {
        wheelAccumRef.current = 0;
      }

      wheelAccumRef.current += e.deltaY;
      const threshold = 60;

      if (wheelAccumRef.current > threshold) {
        if (index < maxIndex) {
          step(1);
        } else {
          wheelAccumRef.current = 0;
        }
      } else if (wheelAccumRef.current < -threshold) {
        if (index > 0) {
          step(-1);
        } else {
          wheelAccumRef.current = 0;
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      scheduleIdleAdvance();
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      scheduleIdleAdvance();
      if (lockRef.current) {
        e.preventDefault();
        return;
      }
      const startY = touchStartYRef.current;
      if (startY == null) return;
      const curY = e.touches[0]?.clientY;
      if (curY == null) return;
      const dy = startY - curY;
      const threshold = 40;

      if ((dy > 0 && index < maxIndex) || (dy < 0 && index > 0)) {
        e.preventDefault();
      }

      if (dy > threshold && index < maxIndex) {
        touchStartYRef.current = null;
        step(1);
      } else if (dy < -threshold && index > 0) {
        touchStartYRef.current = null;
        step(-1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    scheduleIdleAdvance();

    return () => {
      clearIdle();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [index, maxIndex]);

  const inYearStepMode = index > 0 && index < maxIndex;

  /** Màn 2026: hiện số năm một lúc rồi mờ dần. */
  const [finalYearDigitsOpacity, setFinalYearDigitsOpacity] = useState(1);
  const [finalContentVisible, setFinalContentVisible] = useState(false);

  useEffect(() => {
    if (!isFinalYear) {
      setFinalYearDigitsOpacity(1);
      setFinalContentVisible(false);
      return;
    }
    setFinalYearDigitsOpacity(1);
    setFinalContentVisible(false);
    const t = window.setTimeout(() => {
      setFinalYearDigitsOpacity(0);
      setFinalContentVisible(true);
    }, FINAL_YEAR_DIGITS_VISIBLE_MS);
    return () => window.clearTimeout(t);
  }, [isFinalYear]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        className={
          isFinalYear
            ? "relative min-h-screen w-full overflow-x-hidden overflow-y-visible"
            : "relative h-screen w-full overflow-hidden"
        }
        style={{
          touchAction: inYearStepMode ? "none" : "pan-y",
          overscrollBehavior: inYearStepMode ? "contain" : "auto",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentYear}
            initial={{ opacity: 0, scale: 1.01, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.99, filter: "blur(2px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={isFinalYear ? "relative w-full" : "absolute inset-0"}
          >
            {slide.kind === "images" ? (
              <YearImageFrame slide={slide} />
            ) : (
              <>
                <div className="relative min-h-screen w-full">
                  <Year2026Hero side={side} />
                </div>
                {year2026Content != null && year2026Content !== false ? (
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: finalContentVisible ? 1 : 0,
                      y: finalContentVisible ? 0 : 10,
                    }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="relative z-10 w-full bg-[#faf7f2] px-4 pb-20 pt-2 md:px-6"
                  >
                    {year2026Content}
                  </motion.div>
                ) : null}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tách khỏi motion key={currentYear} để AnimatePresence số năm chạy exit/enter (vd. 23 → 24). */}
        <div
          className={
            isFinalYear
              ? "pointer-events-none absolute left-0 right-0 top-0 z-20 flex h-screen items-center justify-center transition-opacity duration-[900ms] ease-out"
              : "pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          }
          style={isFinalYear ? { opacity: finalYearDigitsOpacity } : undefined}
          aria-hidden={isFinalYear && finalYearDigitsOpacity === 0}
        >
          <YearDigits
            variant={isFinalYear ? "onPaper" : "onPhoto"}
            yearSuffix={yearSuffix}
          />
        </div>
      </div>
    </MotionConfig>
  );
}
