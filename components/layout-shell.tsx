"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { weddingContent } from "@/content/wedding"

type LayoutShellProps = {
  children: React.ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname()
  // This project has two invite entry routes: `/` and `/:slug`.
  // Both should be full-bleed without global header/footer.
  const isInviteRoute = pathname === "/" || /^\/[^/]+$/.test(pathname)

  const sideImages = (weddingContent.gallery?.items ?? [])
    .map((x) => x.src)
    .filter(Boolean)

  const SideGallery = ({ reverse }: { reverse?: boolean }) => {
    if (!sideImages.length) return null
    const track = [...sideImages, ...sideImages]
    return (
      <div className="hidden lg:block lg:w-[min(18rem,calc((100vw-430px)/2))]">
        <div className="relative h-screen overflow-hidden">
          <div
            className={`side-gallery-track flex flex-col gap-3 py-3 ${
              reverse ? "reverse" : ""
            }`}
          >
            {track.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative mx-3 aspect-[3/4] overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-xl"
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />
        </div>
      </div>
    )
  }

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full bg-[#faf7f2]">
      <div className="min-h-screen w-full bg-gradient-to-b from-black/30 via-black/10 to-black/30">
        {/* Fixed side sliders (desktop only) */}
        <div className="pointer-events-none fixed inset-0 hidden lg:block">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-stretch justify-center">
            <div className="pointer-events-auto">
              <SideGallery />
            </div>
            <div className="w-full max-w-[430px]" />
            <div className="pointer-events-auto">
              <SideGallery reverse />
            </div>
          </div>
        </div>

        {/* Center "phone" content scrolls normally */}
        <div className="relative mx-auto min-h-screen w-full max-w-[1200px]">
          <div className="mx-auto w-full max-w-[430px] overflow-x-hidden bg-background shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  if (isInviteRoute) {
    return (
      <Shell>
        <main className="min-h-screen">{children}</main>
      </Shell>
    )
  }

  return (
    <Shell>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </Shell>
  )
}
