import { MailOpen } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import { InviteCountdownSection } from "@/components/wedding/invite-countdown-section";
import {
  Archivo_Black,
  Playwrite_IE,
  Great_Vibes,
  Playwrite_PE,
  Roboto_Slab,
} from "next/font/google";
import { ScrollDownHint } from "@/components/wedding/scroll-down-hint";
import { YearScroll } from "@/components/wedding/year-scroll";
import { WishForm } from "@/components/wedding/wish-form";
import { WishCta } from "@/components/wedding/wish-cta";
import { AutoScrollOnIdle } from "@/components/wedding/auto-scroll-on-idle";
import { OneScreenScrollGate } from "@/components/wedding/one-screen-scroll-gate";
import { SectionScrollSnap } from "@/components/wedding/section-scroll-snap";
import { ComingConfirmButton } from "@/components/wedding/coming-confirm-button";
import { ComingDeclineButton } from "@/components/wedding/coming-decline-button";
import { GalleryHorizontalMarquee } from "@/components/wedding/gallery-horizontal-marquee";
import { GalleryGridScrollFlyIn } from "@/components/wedding/gallery-grid-scroll-fly-in";
import { WeddingPageTextReveal } from "@/components/wedding/wedding-page-text-reveal";
import { WishList } from "@/components/wedding/wish-list";

function pickRandomItems<T>(items: T[], count: number) {
  if (count <= 0) return [];
  if (items.length <= count) return items;
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, count);
}

export type WeddingGuest = {
  row_number?: number;
  slug?: string;
  id?: string;
  name: string;
  title: string;
  titleLow: string;
  self: string;
  selfLow: string;
  grateful?: string;
  side?: "" | "groom" | "bride";
  join?: string | boolean;
  wish?: string;
  joinAt?: string;
  declineNum?: string;
};

const archivoBlack = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const playwritePE = Playwrite_PE({
  weight: ["200"],
  variable: "--font-playwrite-pe",
});

const playwriteIE = Playwrite_IE({
  variable: "--font-playwrite-ie",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const robotoSlab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const {
  timeline,
  gallery,
} = weddingContent;

export function WeddingInvitation({
  guest: guestProp,
}: {
  guest?: Partial<WeddingGuest> | null;
}) {
  const guest: WeddingGuest = {
    name: "",
    title: "Quý khách",
    titleLow: "quý khách",
    self: "Gia đình chúng tôi",
    selfLow: "gia đình chúng tôi",
    grateful: "",
    ...(guestProp ?? {}),
  };

  const randomGalleryItems = pickRandomItems(gallery.items ?? [], 6);

  return (
    <div className="bg-[#faf7f2] text-foreground dark:bg-[#1c1917] dark:text-stone-100">
      <WeddingPageTextReveal>
      <AutoScrollOnIdle targetId="year-scroll" idleMs={5000} maxScrollY={40} />
      {/* <WishCta
        wish={guest.wish ?? ""}
        targetId="tang-loi-chuc"
        startAfterId="thiep-moi"
      /> */}
      <div className="w-full text-black">
        <OneScreenScrollGate targetId="year-scroll" maxScrollY={40}>
          <div className="relative flex min-h-screen justify-center items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/gallery/hero.JPG')] bg-cover bg-center"></div>

            {/* Overlay màu */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between gap-3 py-10 text-white">
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold" data-wedding-reveal>
                  <span className="font-wedding-serif">Kính gửi:</span>{" "}
                  <span className={`${playwriteIE.className}`}>
                    {guest.title} {guest.name}
                  </span>
                </p>
                <p className="text-2xl font-bold" data-wedding-reveal>
                  Đây là thiệp cưới của
                </p>
                <p
                  className={`text-2xl font-bold ${playwriteIE.className}`}
                  data-wedding-reveal
                >
                  Thúy Ngân và Đức Huy
                </p>
                <p className="text-lg" data-wedding-reveal>
                  {guest.title} hãy kéo xuống để mở nó ra nhé
                </p>
              </div>
              <div className="flex justify-center items-center">
                <a
                  href="#year-scroll"
                  data-wedding-reveal
                  className="invite-open-btn-pulse inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-white border border-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <span className="flex items-center gap-3 font-wedding-serif font-bold text-lg">
                    <MailOpen className="h-6 w-6" />
                    Mở thiệp
                  </span>
                </a>
              </div>
              <ScrollDownHint />
            </div>
          </div>
        </OneScreenScrollGate>
        <div
          id="year-scroll"
          data-wedding-reveal-skip
          className={`font-archivo-black ${archivoBlack.className}`}
        >
          <YearScroll
            side={guest.side}
            year2026Content={
              <div className="container-custom mx-auto max-w-3xl" />
            }
          />
        </div>

        <SectionScrollSnap snapUpToId="year-scroll">
          <section
            id="thiep-moi"
            className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
          >
            <div
              className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
              data-wedding-reveal
            >
              Lời ngỏ
            </div>
            <div
              className={`${playwritePE.className} text-xl font-normal leading-relaxed text-center`}
              data-wedding-reveal
            >
              {guest.self} xin trân trọng kính mời {guest.titleLow} {guest.name}{" "}
              đến dự buổi lễ thành hôn của {guest.selfLow}.
              <br />
              <br />
              {guest.self} xin cảm ơn {guest.titleLow} đã dành thời gian quý báu
              của mình để có mặt tại buổi lễ đặc biệt của {guest.selfLow}. Sự hiện
              diện của {guest.titleLow} là niềm vinh hạnh lớn đối với{" "}
              {guest.selfLow}.
              {guest.grateful != null && guest.grateful !== "" ? (
                <>
                  <br />
                  <br />
                  <span>
                    Một lần nữa, {guest.selfLow} xin kính mời {guest.titleLow}{" "}
                    {guest.name} - {guest.grateful}.
                  </span>
                </>
              ) : null}
            </div>
          </section>
        </SectionScrollSnap>

        <section
          id="thoi-gian-va-dia-diem"
          className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
            data-wedding-reveal
          >
            Thời gian làm lễ
          </div>
          <div
            className={`${robotoSlab.className} text-xl font-normal leading-relaxed w-full p-4`}
          >
            <ul className="space-y-0 border-l-2 border-[#b22f2f]/25 pl-6 dark:border-[#b22f2f]/35">
              {timeline.map((item, i) => (
                <li key={i} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[32.8px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#b22f2f] bg-[#faf7f2] dark:bg-[#1c1917]" />
                  <p
                    className="text-lg font-bold text-[#b22f2f]"
                    data-wedding-reveal
                  >
                    {item.time}
                  </p>
                  <p
                    className="font-semibold text-stone-800 dark:text-stone-100"
                    data-wedding-reveal
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    data-wedding-reveal
                  >
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="xac-nhan-tham-du"
          className="relative min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
            data-wedding-reveal
          >
            Xác nhận tham dự
          </div>
          <div
            className={`${robotoSlab.className} text-xl font-bold leading-relaxed w-full p-4`}
          >
            <p className="text-center" data-wedding-reveal>
              {guest.title} {guest.name} thân mến, {guest.titleLow} sẽ đến chung
              vui cùng {guest.selfLow} chứ ạ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <ComingConfirmButton
                guest={guest}
                className="bg-[#b22f2f] text-white"
              />
              <ComingDeclineButton guest={guest} className="bg-white text-[#b22f2f]" />
            </div>
          </div>
        </section>

        <section
          id="tang-loi-chuc"
          className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
            data-wedding-reveal
          >
            Tặng lời chúc
          </div>
          <div
            className={`${robotoSlab.className} text-xl font-bold leading-relaxed w-full p-4`}
          >
            <p className="mb-2 text-center" data-wedding-reveal>
              {guest.title} có lời nào muốn tặng {guest.selfLow} không. Viết vào
              đây nè!!!
            </p>
            <WishForm guest={guest} />
            {/* Danh sách lời chúc */}
            <WishList />
          </div>
        </section>

        <section
          id="thu-vien-anh"
          className="min-h-screen w-full scroll-mt-4 overflow-x-visible border-t border-[#b22f2f]/20 bg-[#faf7f2] py-16 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div className="container-custom">
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f] text-center mb-12`}
            data-wedding-reveal
          >
            Thư viện ảnh
          </div>
            <GalleryGridScrollFlyIn items={randomGalleryItems} />
            <GalleryHorizontalMarquee
              items={randomGalleryItems}
              className="lg:hidden"
            />
            <GalleryHorizontalMarquee
              items={randomGalleryItems}
              reverse
              className="mt-2 lg:hidden"
            />
          </div>
        </section>

        {/* Countdown */}
        <InviteCountdownSection
          titleClassName={`${greatVibes.className} text-5xl font-bold text-[#b22f2f] text-center mb-8`}
        />

        {/* Gallery */}
        {/* <section id="album" className="section-padding">
          <div className="container-custom">
            <h2 className="text-center text-2xl text-primary md:text-3xl">
              Album ảnh
            </h2>
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
      </div>
      </WeddingPageTextReveal>

      {/* <BackgroundPattern /> */}

      {/* Hero */}
    </div>
  );
}
