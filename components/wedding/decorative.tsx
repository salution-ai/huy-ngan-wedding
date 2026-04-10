/** Họa tiết trang trí — SVG nhẹ, không phụ thuộc ảnh ngoài */

export function FloralCornerTR({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M95 5c8 12 12 28 8 42-4 14-16 24-30 28-14 4-30 2-42-6 18-4 34-14 44-28 10-14 14-32 20-36Z"
        className="fill-primary/15 dark:fill-primary/25"
      />
      <path
        d="M110 25c4 8 6 18 4 28-2 10-8 18-16 24-8 6-18 8-28 6 12-6 22-16 28-28 6-12 8-26 12-30Z"
        className="fill-amber-600/10 dark:fill-amber-400/15"
      />
      <circle cx="102" cy="18" r="3" className="fill-primary/30" />
      <circle cx="88" cy="32" r="2" className="fill-primary/25" />
    </svg>
  )
}

export function FloralCornerBL({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M25 115c-8-12-12-28-8-42 4-14 16-24 30-28 14-4 30-2 42 6-18 4-34 14-44 28-10 14-14 32-20 36Z"
        className="fill-primary/15 dark:fill-primary/25"
      />
      <path
        d="M10 95c-4-8-6-18-4-28 2-10 8-18 16-24 8-6 18-8 28-6-12 6-22 16-28 28-6 12-8 26-12 30Z"
        className="fill-amber-600/10 dark:fill-amber-400/15"
      />
      <circle cx="18" cy="102" r="3" className="fill-primary/30" />
      <circle cx="32" cy="88" r="2" className="fill-primary/25" />
    </svg>
  )
}

export function DividerOrnament({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`} role="presentation">
      <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-primary/40" />
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden className="text-primary/60">
        <path
          d="M14 0c2 3 6 5 10 5-4 2-6 5-6 7 0 2 2 4 6 5-4 0-8 2-10 5-2-3-6-5-10-5 4-2 6-4 6-6 0-3-2-6-6-8 4 1 8-1 10-3Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  )
}

export function BackgroundPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.35] dark:opacity-[0.2]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, hsl(32 89% 58% / 0.08) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, hsl(340 45% 75% / 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, hsl(40 60% 90% / 0.15) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 dark:opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
