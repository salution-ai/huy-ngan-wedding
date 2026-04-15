import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ArrowDown, MailOpen } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import { InviteCountdown } from "@/components/wedding/invite-countdown";
import {
  BackgroundPattern,
  DividerOrnament,
  FloralCornerBL,
  FloralCornerTR,
} from "@/components/wedding/decorative";
import {
  Archivo_Black,
  Playwrite_IE,
  Great_Vibes,
  Playwrite_PE,
  Roboto_Slab,
} from "next/font/google";
import { EvasiveDeclineButton } from "@/components/wedding/evasive-decline-button";
import { ScrollDownHint } from "@/components/wedding/scroll-down-hint";
import { YearScroll } from "@/components/wedding/year-scroll";
import { WishForm } from "@/components/wedding/wish-form";
import { WishCta } from "@/components/wedding/wish-cta";
import { Button } from "../ui/button";

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
  join?: string;
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

export function WeddingInvitation({
  guest: guestProp,
}: {
  guest?: Partial<WeddingGuest> | null;
}) {
  const guest: WeddingGuest = {
    name: "Tuấn Hưng",
    title: "Anh",
    titleLow: "anh",
    self: "Chúng em",
    selfLow: "chúng em",
    grateful: "",
    ...(guestProp ?? {}),
  };
  return (
    <div className="bg-[#faf7f2] text-foreground dark:bg-[#1c1917] dark:text-stone-100">
      <WishCta
        wish={guest.wish ?? ""}
        targetId="tang-loi-chuc"
        startAfterId="thiep-moi"
      />
      <div className="w-full text-black">
        <div className="relative flex min-h-screen justify-center items-center">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/gallery/hero.JPG')] bg-cover bg-center"></div>

          {/* Overlay màu */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between gap-3 py-10 text-white">
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-2xl font-bold">
                <span className="font-wedding-serif">Kính gửi:</span>{" "}
                <span className={`${playwriteIE.className}`}>
                  {guest.title} {guest.name}
                </span>
              </p>
              <p className="text-2xl font-bold">Đây là thiệp cưới của</p>
              <p className={`text-2xl font-bold ${playwriteIE.className}`}>
                Thúy Ngân và Đức Huy
              </p>
              <p className="text-lg">
                {guest.title} hãy kéo xuống để mở nó ra nhé
              </p>
            </div>
            <div className="flex justify-center items-center">
              <a
                href="#year-scroll"
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
        <div
          id="year-scroll"
          className={`font-archivo-black ${archivoBlack.className}`}
        >
          <YearScroll
            year2026Content={
              <div className="container-custom mx-auto max-w-3xl" />
            }
          />
        </div>

        <section
          id="thiep-moi"
          className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
          >
            Lời ngỏ
          </div>
          <div
            className={`${playwritePE.className} text-xl font-normal leading-relaxed text-center`}
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

        <section
          id="thoi-gian-va-dia-diem"
          className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
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
                  <p className="text-lg font-bold text-[#b22f2f]">
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
        </section>

        <section
          id="xac-nhan-tham-du"
          className="relative min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
          >
            Xác nhận tham dự
          </div>
          <div
            className={`${robotoSlab.className} text-xl font-bold leading-relaxed w-full p-4`}
          >
            {guest.title} {guest.name} thân mến, {guest.titleLow} sẽ đến chung
            vui cùng {guest.selfLow} chứ ạ.
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <Button className="bg-[#b22f2f] text-white">Chắc chắn rồi</Button>
              <EvasiveDeclineButton className="bg-white text-[#b22f2f]">
                {guest.title} không thể đến
              </EvasiveDeclineButton>
            </div>
          </div>
        </section>

        <section
          id="tang-loi-chuc"
          className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8"
        >
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f]`}
          >
            Tặng lời chúc
          </div>
          <div
            className={`${robotoSlab.className} text-xl font-bold leading-relaxed w-full p-4`}
          >
            {guest.title} có lời nào muốn tặng {guest.selfLow} không. Viết vào
            đây nè!!!
            <WishForm guest={guest} />
          </div>
        </section>

        <section id="thu-vien-anh" className="min-h-screen w-full scroll-mt-4 border-t border-[#b22f2f]/20 bg-[#faf7f2] px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-start gap-8">
          <div className="container-custom">
          <div
            className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f] text-center mb-12`}
          >
            Thư viện ảnh
          </div>
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
        </section>

        {/* Countdown */}
        <section id="dem-nguoc" className="section-padding">
          <div className="container-custom max-w-2xl">
            <h2 className={`${greatVibes.className} text-5xl font-bold text-[#b22f2f] text-center mb-12`}>
              Đếm ngược đến ngày vui
            </h2>
            <div className="mt-8">
              <InviteCountdown />
            </div>
          </div>
        </section>

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

      {/* <BackgroundPattern /> */}

      {/* Hero */}
    </div>
  );
}
