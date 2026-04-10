import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import { InviteCountdown } from "@/components/wedding/invite-countdown";
import {
  BackgroundPattern,
  DividerOrnament,
  FloralCornerBL,
  FloralCornerTR,
} from "@/components/wedding/decorative";
import { Archivo_Black } from "next/font/google";
import { ScrollDownHint } from "@/components/wedding/scroll-down-hint";
import { YearScroll } from "@/components/wedding/year-scroll";

const archivoBlack = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const {
  couple,
  invitationIntro,
  date,
  events,
  timeline,
  dressCode,
  gallery,
  contact,
  closingLine,
  mapEmbedUrl,
} = weddingContent;

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length ? `tel:${digits}` : "#";
}

export function WeddingInvitation() {
  const guest = {
    name: "Tuấn Hưng",
    title: "Anh",
  };
  return (
    <div className="relative bg-[#faf7f2] text-foreground dark:bg-[#1c1917] dark:text-stone-100">
      <div className="h-screen w-full text-black">
        <div className="relative flex justify-center items-center h-full">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/gallery/hero.JPG')] bg-cover bg-center"></div>

          {/* Overlay màu */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 text-white flex flex-col items-center justify-between h-full gap-3 py-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-2xl font-bold">
                <span className="font-wedding-serif">Kính gửi:</span>{" "}
                {guest.title} {guest.name}
              </p>
              <p className="text-2xl font-bold font-wedding-serif">
                Đây là thiệp cưới của
              </p>
              <p className="text-2xl font-bold">Thúy Ngân và Đức Huy</p>
              <p className="text-lg font-wedding-serif">
                {guest.title} hãy kéo xuống để mở nó ra nhé
              </p>
            </div>
            <ScrollDownHint />
          </div>
        </div>
        <div className={`font-archivo-black ${archivoBlack.className}`}>
          <YearScroll />
        </div>
      </div>

      {/* <BackgroundPattern /> */}

      {/* Hero */}
      {/* <section className="relative min-h-[92vh] flex flex-col justify-end pb-16 pt-28 md:pb-24">
        <FloralCornerTR className="absolute right-0 top-20 h-28 w-28 md:h-36 md:w-36" />
        <FloralCornerBL className="absolute bottom-8 left-0 h-28 w-28 md:h-36 md:w-36" />

        <div className="absolute inset-0 -z-[1]">
          <Image
            src={gallery.coverSrc}
            alt={gallery.coverAlt}
            fill
            priority
            className="object-cover brightness-[0.85] dark:brightness-[0.55]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-[#faf7f2]/70 to-transparent dark:from-[#1c1917] dark:via-[#1c1917]/75" />
        </div>

        <div className="container-custom relative text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-stone-600 dark:text-stone-300 md:text-sm">
            Wedding Invitation
          </p>
          <h1 className="mb-2 font-audiowide text-3xl tracking-tight text-primary md:text-5xl lg:text-6xl">
            {couple.groomFirstName} & {couple.brideFirstName}
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-stone-800 dark:text-stone-200 md:text-xl">
            {couple.groomFullName}
            <span className="mx-2 text-primary">♥</span>
            {couple.brideFullName}
          </p>
          <DividerOrnament className="my-8" />
          <p className="text-base font-medium text-stone-700 dark:text-stone-300 md:text-lg">
            {date.weekdayAndDate}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{date.lunarHint}</p>

          <nav className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="#thong-tin"
              className="rounded-full border border-primary/40 bg-white/80 px-5 py-2 font-medium text-primary shadow-sm backdrop-blur transition hover:bg-primary hover:text-primary-foreground dark:bg-stone-900/80"
            >
              Thông tin lễ
            </a>
            <a
              href="#album"
              className="rounded-full border border-primary/40 bg-white/80 px-5 py-2 font-medium text-primary shadow-sm backdrop-blur transition hover:bg-primary hover:text-primary-foreground dark:bg-stone-900/80"
            >
              Album ảnh
            </a>
            <a
              href="#lien-he"
              className="rounded-full border border-primary/40 bg-white/80 px-5 py-2 font-medium text-primary shadow-sm backdrop-blur transition hover:bg-primary hover:text-primary-foreground dark:bg-stone-900/80"
            >
              Liên hệ
            </a>
          </nav>
        </div>
      </section> */}

      {/* Gia đình */}
      {/* <section className="section-padding border-y border-primary/10 bg-white/60 dark:bg-stone-900/40">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 md:text-base">
            {couple.groomParentsLine}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300 md:text-base">
            {couple.brideParentsLine}
          </p>
          <DividerOrnament className="my-8" />
          <p className="text-base italic leading-relaxed text-stone-800 dark:text-stone-200 md:text-lg">
            {invitationIntro}
          </p>
        </div>
      </section> */}

      {/* Countdown */}
      {/* <section id="dem-nguoc" className="section-padding">
        <div className="container-custom max-w-2xl">
          <h2 className="text-center font-audiowide text-2xl text-primary md:text-3xl">
            Đếm ngược đến ngày vui
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Cập nhật ngày giờ trong file content/wedding.ts
          </p>
          <div className="mt-8">
            <InviteCountdown />
          </div>
        </div>
      </section> */}

      {/* Sự kiện */}
      {/* <section
        id="thong-tin"
        className="section-padding bg-white/50 dark:bg-stone-900/30"
      >
        <div className="container-custom">
          <h2 className="text-center font-audiowide text-2xl text-primary md:text-3xl">
            Thời gian & địa điểm
          </h2>
          <DividerOrnament className="mx-auto mt-6 mb-12 max-w-md" />

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {events.map((ev) => (
              <article
                key={ev.id}
                id={ev.id}
                className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card p-6 shadow-lg shadow-primary/5 dark:border-primary/25 dark:bg-stone-900/60"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10" />
                <h3 className="font-audiowide text-xl text-primary md:text-2xl">
                  {ev.label}
                </h3>
                <div className="mt-4 space-y-3 text-stone-700 dark:text-stone-300">
                  <p className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">{ev.time}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {ev.dateShort}
                      </span>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">{ev.venueName}</span>
                      <br />
                      {ev.address}
                    </span>
                  </p>
                </div>
                <p className="mt-4 text-sm italic text-muted-foreground">
                  {ev.note}
                </p>
                <Link
                  href={ev.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  Mở Google Maps
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      {/* <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <h2 className="text-center font-audiowide text-2xl text-primary md:text-3xl">
            Timeline trong ngày
          </h2>
          <DividerOrnament className="mx-auto mt-6 mb-10" />
          <ul className="space-y-0 border-l-2 border-primary/25 pl-6 dark:border-primary/35">
            {timeline.map((item, i) => (
              <li key={i} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-[#faf7f2] dark:bg-[#1c1917]" />
                <p className="font-audiowide text-lg text-primary">
                  {item.time}
                </p>
                <p className="font-semibold text-stone-800 dark:text-stone-100">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Dress code */}
      {/* <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10">
        <div className="container-custom max-w-xl text-center">
          <h2 className="font-audiowide text-2xl text-primary md:text-3xl">
            {dressCode.title}
          </h2>
          <DividerOrnament className="mx-auto mt-6 mb-6" />
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">
            {dressCode.hint}
          </p>
        </div>
      </section> */}

      {/* Gallery */}
      {/* <section id="album" className="section-padding">
        <div className="container-custom">
          <h2 className="text-center font-audiowide text-2xl text-primary md:text-3xl">
            Khoảnh khắc
          </h2>
          <DividerOrnament className="mx-auto mt-6 mb-10" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.items.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary/10 shadow-md dark:border-primary/20"
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
        </div>
      </section> */}

      {/* Map + contact */}
      {/* <section
        id="lien-he"
        className="section-padding bg-white/50 dark:bg-stone-900/30"
      >
        <div className="container-custom max-w-4xl">
          <h2 className="text-center font-audiowide text-2xl text-primary md:text-3xl">
            Bản đồ & liên hệ
          </h2>
          <DividerOrnament className="mx-auto mt-6 mb-10" />

          {mapEmbedUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-primary/15 shadow-lg">
              <iframe
                title="Bản đồ tiệc cưới"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/30 bg-muted/30 p-8 text-center text-sm text-muted-foreground dark:bg-stone-900/50">
              <p>
                Thêm link nhúng Google Maps vào{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  mapEmbedUrl
                </code>{" "}
                trong
              </p>
              <p className="mt-1 font-mono text-xs">content/wedding.ts</p>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={telHref(contact.groomPhone)}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 text-sm shadow-sm transition hover:border-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>Chú rể: {contact.groomPhone}</span>
            </a>
            <a
              href={telHref(contact.bridePhone)}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 text-sm shadow-sm transition hover:border-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>Cô dâu: {contact.bridePhone}</span>
            </a>
            <Link
              href={contact.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Nhắn Zalo
            </Link>
          </div>
        </div>
      </section> */}

      {/* Closing */}
      {/* <section className="section-padding text-center">
        <DividerOrnament className="mx-auto mb-8" />
        <p className="mx-auto max-w-2xl text-lg italic leading-relaxed text-stone-700 dark:text-stone-300">
          {closingLine}
        </p>
        <p className="mt-6 font-audiowide text-2xl text-primary md:text-3xl">
          {couple.groomFirstName} & {couple.brideFirstName}
        </p>
      </section> */}
    </div>
  );
}
