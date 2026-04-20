"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ScrollDownHint } from "@/components/wedding/scroll-down-hint";
import { weddingContent } from "@/content/wedding";
import { Luxurious_Script, Roboto_Slab } from "next/font/google";

type ImagesSlide = {
  kind: "images";
  year: string;
  /** Danh sách ảnh (1, 2, 3, …) — bố cục tự căn để lấp đủ một màn hình. */
  imageSrcs: string[];
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

const luxuriousScript = Luxurious_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-luxurious-script",
});

type YearSlide = ImagesSlide | FinalSlide;

/** Thời gian hiển thị đầy đủ số năm 2026 trước khi bắt đầu mờ (ms). */
const FINAL_YEAR_DIGITS_VISIBLE_MS = 1500;

/** Chia N ảnh thành các hàng (số ô mỗi hàng) để lấp viewport: cân đối, ưu tiên bố cục đẹp cho N nhỏ. */
function groupImagesIntoRows(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [1];
  if (count === 2) return [1, 1];
  if (count === 3) return [1, 1, 1];
  if (count === 4) return [2, 2];
  if (count === 5) return [3, 2];
  if (count === 6) return [3, 3];
  if (count === 7) return [4, 3];
  if (count === 8) return [4, 4];
  if (count === 9) return [3, 3, 3];
  const cols = Math.ceil(Math.sqrt(count));
  const rows: number[] = [];
  let remaining = count;
  while (remaining > 0) {
    const take = Math.min(cols, remaining);
    rows.push(take);
    remaining -= take;
  }
  return rows;
}

/** Vùng gradient (%) từ mép vào trong — càng lớn càng mềm; khớp vibe thiệp cũ ~18–22%. */
const COLLAGE_EDGE_FADE_PCT = 20;
/** Chồng lấn theo chiều dọc (vh) giữa các hàng — vùng giao để fade hòa trộn. */
const COLLAGE_ROW_OVERLAP_VH = 4.5;
/** Chồng lấn theo chiều ngang (%) giữa các cột trong một hàng. */
const COLLAGE_COL_OVERLAP_PCT = 7;

/** Mask giao nhiều lớp: mép có láng giềng mờ dần, mép ngoài cùng giữ nguyên. */
function collageImageMaskStyle(edge: {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}): CSSProperties {
  const f = COLLAGE_EDGE_FADE_PCT;
  const solidH = `linear-gradient(to bottom, black 0%, black 100%)`;
  const solidV = `linear-gradient(to right, black 0%, black 100%)`;
  const topGrad = edge.top
    ? `linear-gradient(to bottom, transparent 0%, black ${f}%, black 100%)`
    : solidH;
  const bottomGrad = edge.bottom
    ? `linear-gradient(to top, transparent 0%, black ${f}%, black 100%)`
    : solidH;
  const leftGrad = edge.left
    ? `linear-gradient(to right, transparent 0%, black ${f}%, black 100%)`
    : solidV;
  const rightGrad = edge.right
    ? `linear-gradient(to left, transparent 0%, black ${f}%, black 100%)`
    : solidV;

  const layers = [topGrad, bottomGrad, leftGrad, rightGrad].join(", ");

  return {
    WebkitMaskImage: layers,
    WebkitMaskComposite: "source-in",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskImage: layers,
    maskComposite: "intersect",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
  };
}

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

function YearImageCollage({ slide }: { slide: ImagesSlide }) {
  const { imageSrcs } = slide;
  if (imageSrcs.length === 0) {
    return (
      <div className="relative h-screen w-full bg-neutral-950" aria-hidden />
    );
  }
  const rows = groupImagesIntoRows(imageSrcs.length);
  const numRows = rows.length;
  let cursor = 0;

  return (
    <div className="relative h-screen w-full">
      <div className="relative flex h-screen min-h-0 w-full flex-col overflow-hidden bg-neutral-950">
        {rows.map((colsInRow, rowIdx) => {
          const slice = imageSrcs.slice(cursor, cursor + colsInRow);
          cursor += colsInRow;
          const cols = slice.length;
          return (
            <div
              key={rowIdx}
              className="relative flex min-h-0 flex-1 flex-row"
              style={{
                zIndex: rowIdx,
                marginTop:
                  rowIdx > 0 ? `-${COLLAGE_ROW_OVERLAP_VH}vh` : undefined,
              }}
            >
              {slice.map((src, colIdx) => {
                const maskStyle = collageImageMaskStyle({
                  top: rowIdx > 0,
                  bottom: rowIdx < numRows - 1,
                  left: colIdx > 0,
                  right: colIdx < cols - 1,
                });
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
                    style={{
                      zIndex: colIdx,
                      marginLeft:
                        colIdx > 0
                          ? `-${COLLAGE_COL_OVERLAP_PCT}%`
                          : undefined,
                    }}
                  >
                    <img
                      src={src}
                      alt="Huy Ngân Wedding"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                      fetchPriority={
                        rowIdx === 0 && colIdx === 0 ? "high" : "auto"
                      }
                      style={maskStyle}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
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
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setIsCoarsePointer(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const groomParents = (
    <div className="flex flex-1 flex-col items-center gap-1 text-center text-[13px]">
      <p>Nhà trai</p>
      <p className="font-bold">ÔNG LÊ HỮU MINH</p>
      <p className="font-bold">BÀ ĐÀO THỊ MINH</p>
      {/* <p className="text-stone-900">339 Hoàng Quốc Việt, P. Vũ Ninh, Bắc Ninh</p> */}
    </div>
  );

  const brideParents = (
    <div className="flex flex-1 flex-col items-center gap-1 text-center text-[13px]">
      <p>Nhà gái</p>
      <p className="font-bold">ÔNG NGUYỄN VĂN QUY</p>
      <p className="font-bold">BÀ ĐẶNG HẰNG MÂY</p>
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
        className="pointer-events-none absolute inset-0 bg-[url('/gallery/hero3.JPG')] bg-cover bg-center opacity-[0.22]"
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
        {/* <div>TRÂN TRỌNG BÁO TIN</div> */}
        <div>
          {isBrideSide
            ? "KÍNH MỜI QUÝ KHÁCH"
            : "TRÂN TRỌNG BÁO TIN"}
        </div>
        
        <div>
          {isBrideSide
            ? "TỚI DỰ BỮA CƠM THÂN MẬT"
            : "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`flex flex-col items-center justify-center gap-3 font-bold text-7xl leading-12 py-2 ${luxuriousScript.className} my-4`}
      >
        {isBrideSide ? (
          <>
            <div>Thúy Ngân</div>
            <div>&</div>
            <div>Đức Huy</div>
          </>
        ) : (
          <>
            <div>Đức Huy</div>
            <div>&</div>
            <div>Thúy Ngân</div>
          </>
        )}
      </motion.div>

      <motion.div
        variants={item}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`flex flex-col items-center justify-center gap-0 font-bold text-xl py-2 ${robotoSlab.className} gap-2`}
      >
        <div className="font-normal text-lg text-center">
          {(isBrideSide
            ? weddingContent.heroEvent?.bride?.venueLines
            : weddingContent.heroEvent?.groom?.venueLines) ? (
            (isBrideSide
              ? weddingContent.heroEvent?.bride?.venueLines
              : weddingContent.heroEvent?.groom?.venueLines
            )?.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))
          ) : (
            <>
              <span className="block text-center">
                {isBrideSide
                  ? "Hôn lễ được cử hành tại Tư gia nhà gái"
                  : "Hôn lễ được cử hành tại Nhà văn hóa khu 4"}
              </span>
            </>
          )}
        </div>
        <div>
          {isBrideSide
            ? (weddingContent.heroEvent?.bride?.timeLine ??
              "VÀO LÚC 09 GIỜ 30, THỨ BẢY")
            : (weddingContent.heroEvent?.groom?.timeLine ??
              "VÀO LÚC 10 GIỜ 00, THỨ BẢY")}
        </div>
        <div className="border-y-3 border-[#b22f2f]/40 px-8 py-2 text-3xl">
          02.05.2026
        </div>
        <div className="text-lg font-normal">
          (Nhằm ngày 16 tháng 3 năm Bính Ngọ)
        </div>
        <div className="mt-4 w-[80%] max-w-lg px-4">
          {mapEmbed ? (
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg border border-[#b22f2f]/30 bg-stone-100 shadow-sm">
              <iframe
                title="Bản đồ địa điểm hôn lễ"
                src={mapEmbed}
                className={
                  isCoarsePointer
                    ? "h-full w-full border-0 pointer-events-none"
                    : "h-full w-full border-0"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {isCoarsePointer ? (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-3">
                  <a
                    href={mapEmbed}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#b22f2f] shadow-md backdrop-blur hover:bg-white"
                  >
                    Mở bản đồ
                  </a>
                </div>
              ) : null}
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
  // When we transition into the final year (2026) inside iOS in-app browsers
  // (notably Messenger), native scroll can remain "stuck" if any non-passive
  // touch listeners are still attached on window. We use this flag to release
  // control immediately during the transition.
  const releaseNativeScrollRef = useRef(false);

  const slides = useMemo<YearSlide[]>(() => {
    const byYear: Record<string, string[]> = {
      "2016": ["/gallery/2016.jpg", "/gallery/2016%20(2).jpg"],
      "2017": ["/gallery/2017.jpg", "/gallery/2017%20(2).JPG"],
      "2018": ["/gallery/2018.jpg", "/gallery/2018%20(2).JPG", "/gallery/2018%20(3).JPG"] ,
      "2019": ["/gallery/2019.JPG", "/gallery/2019%20(2).jpg"],
      "2020": ["/gallery/2020.JPG", "/gallery/2020%20(2).JPG"],
      "2021": ["/gallery/2021%20(2).JPG"],
      "2022": ["/gallery/2022.jpg"],
      "2023": ["/gallery/2023.jpg", "/gallery/2023%20(2).jpg"],
      "2024": ["/gallery/2024 (old).jpg", "/gallery/2024.jpg"],
      "2025": ["/gallery/2025.JPG", "/gallery/2025%20(3).JPG"],
    };

    const imageSlides: ImagesSlide[] = Object.entries(byYear).map(
      ([year, imageSrcs]) => ({
        kind: "images" as const,
        year,
        imageSrcs,
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
    if (index < maxIndex) releaseNativeScrollRef.current = false;
  }, [index, maxIndex]);

  useEffect(() => {
    const urls = Array.from(
      new Set(
        slides.flatMap((s) =>
          s.kind === "images" ? s.imageSrcs : [],
        ),
      ),
    );
    void Promise.all(urls.map(preloadImage));
  }, [slides]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // In some in-app webviews (e.g. Messenger), merely registering a non-passive
    // `touchmove` listener on `window` can break native scrolling even if we
    // don't call preventDefault. When the user reaches the final year (2026),
    // we want to fully "release" scroll control back to the page.
    const shouldInterceptScroll = index < maxIndex;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent ?? "" : "";
    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      // iPadOS reports itself as Mac; detect via touch points.
      (typeof navigator !== "undefined" &&
        navigator.platform === "MacIntel" &&
        (navigator.maxTouchPoints ?? 0) > 1);
    const isFBInApp = /FBAN|FBAV|FB_IAB/i.test(ua);
    // Treat all iOS Facebook in-app browsers (Messenger/Facebook/IG IAB) as "unsafe"
    // for window-level non-passive touch listeners.
    const isIOSFBInApp = isIOS && isFBInApp;

    // We still allow "scroll up to go back to 2025" on the final year, but on
    // iOS FB in-app we must NOT attach window-level wheel/touch listeners.
    const shouldAllowBackFromFinalYear = index === maxIndex;

    const isActiveInViewport = () => {
      const rect = el.getBoundingClientRect();
      // YearScroll is intended to "own" the viewport while in step mode.
      // Treat it active when it covers a large part of the viewport.
      const vh = window.innerHeight || 1;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visible = Math.max(0, visibleBottom - visibleTop);
      return visible / vh >= 0.6;
    };

    const removeInterceptListeners = () => {
      window.removeEventListener("wheel", onWheel, true);
      if (isIOSFBInApp) {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
      } else {
        window.removeEventListener("touchstart", onTouchStart, true);
        window.removeEventListener("touchmove", onTouchMove, true);
      }
    };

    const step = (dir: 1 | -1) => {
      if (lockRef.current) return;
      setIndex((prev) => {
        const next = Math.max(0, Math.min(maxIndex, prev + dir));
        if (next === prev) return prev;
        if (next === maxIndex && isIOSFBInApp) {
          releaseNativeScrollRef.current = true;
          if (shouldInterceptScroll) {
            // Immediately detach listeners; do NOT wait for effect cleanup.
            // This prevents native scroll from getting "stuck" on iOS in-app browsers.
            removeInterceptListeners();
          }
        }
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
      // Chỉ đếm idle khi người dùng đã cuộn tới khối year scroll (đủ phần nhìn thấy).
      if (!isActiveInViewport()) return;
      idleTimerRef.current = window.setTimeout(() => {
        // If user stays too long without scrolling, auto-advance.
        if (lockRef.current) return;
        if (!isActiveInViewport()) return;
        step(1);
      }, 5000);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isActiveInViewport()) return;
      scheduleIdleAdvance();
      if (releaseNativeScrollRef.current) return;
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
      if (!isActiveInViewport()) return;
      scheduleIdleAdvance();
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!shouldInterceptScroll) return;
      if (!isActiveInViewport()) return;
      scheduleIdleAdvance();
      if (releaseNativeScrollRef.current) return;
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

    if (shouldInterceptScroll) {
      // Attach to window so wheel over "side background" still steps years.
      window.addEventListener("wheel", onWheel, {
        passive: false,
        capture: true,
      });
      // iOS FB in-app browsers can get native scrolling "stuck" when registering
      // non-passive touch listeners on window. Attach to the element instead.
      if (isIOSFBInApp) {
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
      } else {
        window.addEventListener("touchstart", onTouchStart, {
          passive: true,
          capture: true,
        });
        window.addEventListener("touchmove", onTouchMove, {
          passive: false,
          capture: true,
        });
      }
    } else {
      // Final year (2026): do NOT attach non-passive touch listeners on window.
      // But still allow "go back to 2025" gestures, attached to the component
      // element only (less likely to break native scroll in webviews).
    }

    const onFinalWheelBack = (e: WheelEvent) => {
      if (!shouldAllowBackFromFinalYear) return;
      if (!isActiveInViewport()) return;
      if (lockRef.current) {
        e.preventDefault();
        return;
      }
      // Only intercept upward wheel to go back a year; allow downward wheel to
      // scroll the page normally.
      if (e.deltaY < 0 && index > 0) {
        e.preventDefault();
        wheelAccumRef.current = 0;
        step(-1);
      }
    };

    const onFinalTouchStart = (e: TouchEvent) => {
      if (!shouldAllowBackFromFinalYear) return;
      if (!isActiveInViewport()) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onFinalTouchMove = (e: TouchEvent) => {
      if (!shouldAllowBackFromFinalYear) return;
      if (!isActiveInViewport()) return;
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

      // To go back (2026 -> 2025) the user swipes down (dy < 0).
      // Only then do we prevent default to avoid weird scroll/bounce.
      if (dy < 0) e.preventDefault();

      if (dy < -threshold && index > 0) {
        touchStartYRef.current = null;
        step(-1);
      }
    };

    if (shouldAllowBackFromFinalYear) {
      el.addEventListener("touchstart", onFinalTouchStart, { passive: true });
      el.addEventListener("touchmove", onFinalTouchMove, { passive: false });
      if (!isIOSFBInApp) {
        window.addEventListener("wheel", onFinalWheelBack, {
          passive: false,
          capture: true,
        });
      }
    }

    let prevViewportActive = false;
    const onIntersect: IntersectionObserverCallback = () => {
      const active = isActiveInViewport();
      if (active === prevViewportActive) return;
      prevViewportActive = active;
      if (active) {
        scheduleIdleAdvance();
      } else {
        clearIdle();
      }
    };
    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    io.observe(el);

    if (isActiveInViewport()) {
      scheduleIdleAdvance();
    }

    return () => {
      clearIdle();
      io.disconnect();
      if (shouldInterceptScroll) {
        removeInterceptListeners();
      }
      if (shouldAllowBackFromFinalYear) {
        if (!isIOSFBInApp) {
          window.removeEventListener("wheel", onFinalWheelBack, true);
        }
        el.removeEventListener("touchstart", onFinalTouchStart);
        el.removeEventListener("touchmove", onFinalTouchMove);
      }
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
              <YearImageCollage slide={slide} />
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
