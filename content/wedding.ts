/**
 * Chỉnh toàn bộ nội dung thiệp cưới tại đây — thay bằng thông tin thật khi chuẩn bị xong.
 */

export const weddingContent = {
  couple: {
    /** Tên hiển thị (có dấu) */
    groomFirstName: "Huy",
    brideFirstName: "Ngân",
    groomFullName: "Đức Huy",
    brideFullName: "Thúy Ngân",
    /** Dòng họ nhà trai / nhà gái — có thể xóa hoặc sửa */
    groomParentsLine: "Nhà trai: Ông … & Bà …",
    brideParentsLine: "Nhà gái: Ông … & Bà …",
  },

  /** Câu mở đầu / quote */
  invitationIntro:
    "Chúng con xin trân trọng kính mời Quý ông bà, anh chị em và bạn bè đến dự buổi lễ thành hôn của chúng con.",

  /** Ngày giờ tổng (hiển thị dương lịch + gợi ý âm lịch) */
  date: {
    weekdayAndDate: "Chủ nhật, 09 tháng 11 năm 2026",
    lunarHint: "(Âm lịch: … / … / Bính Ngọ)",
    /** ISO 8601 — dùng cho đếm ngược; đổi khi có ngày chính thức */
    countdownIso: "2026-05-02T10:00:00+07:00",
  },

  /** Nội dung hiển thị trong màn 2026 (khối map + thời gian/địa điểm) */
  heroEvent: {
    groom: {
      venueLines: [
        "Hôn lễ được cử hành tại Nhà văn hóa khu 4",
        "Số 339 Hoàng Quốc Việt, P. Vũ Ninh, Bắc Ninh",
      ],
      timeLine: "VÀO LÚC 10 GIỜ 00, THỨ BẢY",
    },
    bride: {
      venueLines: [
        "Hôn lễ được cử hành tại Tư gia nhà gái",
        "Cụm làng nghề công nghiệp phường Khúc Xuyên, Bắc Ninh",
      ],
      timeLine: "VÀO LÚC 09 GIỜ 30, THỨ BẢY",
    },
  },

  /** Các sự kiện trong ngày — thêm/bớt object trong mảng nếu cần */
  events: [
    {
      id: "vu-quy",
      label: "Lễ vu quy",
      time: "09:30",
      dateShort: "09.11.2026",
      venueName: "Tư gia nhà gái",
      address: "Số nhà …, Đường …, Phường …, Tỉnh/Thành phố …",
      mapUrl: "https://maps.google.com/?q=10.7769,106.7009",
      note: "Kính mời đến đúng giờ để chung vui cùng gia đình.",
    },
    {
      id: "tiec",
      label: "Tiệc cưới",
      time: "11:00",
      dateShort: "09.11.2026",
      venueName: "Trung tâm tiệc cưới …",
      address: "Số nhà …, Đường …, Phường …, Tỉnh/Thành phố …",
      mapUrl: "https://maps.google.com/?q=10.7769,106.7009",
      note: "Sảnh … — Kính mời quý khách tham dự chương trình.",
    },
  ],

  /** Timeline trong buổi tiệc (tùy chọn) */
  timeline: [
    { time: "09:00", title: "Đón khách", detail: "Check-in & chụp ảnh lưu niệm" },
    { time: "10:00", title: "Bữa cơm thân mật", detail: "Bữa cơm thân mật với gia đình" },
    { time: "13:30", title: "Lễ Vu Quy", detail: "Làm lễ tại nhà gái" },
    { time: "15:30", title: "Lễ Thành Hôn", detail: "Làm lễ tại nhà trai" },
  ],

  dressCode: {
    title: "Dress code",
    hint: "Pastel / Tông ấm / Áo dài — tránh đỏ burgundy trùng hoa cô dâu.",
  },

  /** Ảnh gallery — thay src bằng ảnh của bạn (Cloudinary hoặc /public/...) */
  gallery: {
    coverSrc: "https://drive.google.com/file/d/1d-Cvd77JDX7j2B0naKIyIHa-PgLefeUE/view?usp=drive_link",
    coverAlt: "Ảnh bìa thiệp — thay bằng ảnh cưới của bạn",
    items: [
      {
        src: "/album/1.JPG",
        alt: "Khoảnh khắc 1",
      },
      {
        src: "/album/2.JPG",
        alt: "Khoảnh khắc 2",
      },
      {
        src: "/album/3.JPG",
        alt: "Khoảnh khắc 3",
      },
      {
        src: "/album/4.JPG",
        alt: "Khoảnh khắc 4",
      },
      {
        src: "/album/5.JPG",
        alt: "Khoảnh khắc 5",
      },
      {
        src: "/album/6.JPG",
        alt: "Khoảnh khắc 6",
      },
      {
        src: "/album/7.JPG",
        alt: "Khoảnh khắc 7",
      },
      {
        src: "/album/8.JPG",
        alt: "Khoảnh khắc 8",
      },
      {
        src: "/album/9.JPG",
        alt: "Khoảnh khắc 9",
      },
      {
        src: "/album/10.JPG",
        alt: "Khoảnh khắc 10",
      },
      {
        src: "/album/11.JPG",
        alt: "Khoảnh khắc 11",
      },
      {
        src: "/album/12.JPG",
        alt: "Khoảnh khắc 12",
      },
      {
        src: "/album/13.JPG",
        alt: "Khoảnh khắc 13",
      },
      {
        src: "/album/14.JPG",
        alt: "Khoảnh khắc 14",
      },
      {
        src: "/album/15.JPG",
        alt: "Khoảnh khắc 15",
      },
      {
        src: "/album/16.JPG",
        alt: "Khoảnh khắc 16",
      },
      // {
      //   src: "/album/17.JPG",
      //   alt: "Khoảnh khắc 17",
      // },
      {
        src: "/album/18.JPG",
        alt: "Khoảnh khắc 18",
      },
      {
        src: "/album/19.JPG",
        alt: "Khoảnh khắc 19",
      },
      {
        src: "/album/20.JPG",
        alt: "Khoảnh khắc 20",
      },
      {
        src: "/album/21.JPG",
        alt: "Khoảnh khắc 21",
      },
      {
        src: "/album/22.JPG",
        alt: "Khoảnh khắc 22",
      },
      {
        src: "/album/23.JPG",
        alt: "Khoảnh khắc 23",
      },
      {
        src: "/album/24.JPG",
        alt: "Khoảnh khắc 24",
      },
      { 
        src: "/album/25.JPG",
        alt: "Khoảnh khắc 25",
      },
      {
        src: "/album/26.JPG",
        alt: "Khoảnh khắc 26",
      },
      {
        src: "/album/27.JPG",
        alt: "Khoảnh khắc 27",
      },
      {
        src: "/album/28.JPG",
        alt: "Khoảnh khắc 28",
      },
      {
        src: "/album/29.JPG",
        alt: "Khoảnh khắc 29",
      },
      {
        src: "/album/30.JPG",
        alt: "Khoảnh khắc 30",
      },
      {
        src: "/album/31.JPG",
        alt: "Khoảnh khắc 31",
      },
      {
        src: "/album/32.JPG",
        alt: "Khoảnh khắc 32",
      },
      {
        src: "/album/33.JPG",
        alt: "Khoảnh khắc 33",
      },
      {
        src: "/album/34.JPG",
        alt: "Khoảnh khắc 34",
      },
      {
        src: "/album/35.JPG",
        alt: "Khoảnh khắc 35",
      },
      {
        src: "/album/36.JPG",
        alt: "Khoảnh khắc 36",
      },
      {
        src: "/album/37.JPG",
        alt: "Khoảnh khắc 37",
      },
      {
        src: "/album/38.JPG",
        alt: "Khoảnh khắc 38",
      },
      {
        src: "/album/39.JPG",
        alt: "Khoảnh khắc 39",
      },
      {
        src: "/album/40.JPG",
        alt: "Khoảnh khắc 40",
      },
      // {
      //   src: "/album/41.JPG",
      //   alt: "Khoảnh khắc 41",
      // },
      {
        src: "/album/42.JPG",
        alt: "Khoảnh khắc 42",
      },
      {
        src: "/album/43.JPG",
        alt: "Khoảnh khắc 43",
      },
      {
        src: "/album/44.JPG",
        alt: "Khoảnh khắc 44",
      },
      {
        src: "/album/45.JPG",
        alt: "Khoảnh khắc 45",
      },
      {
        src: "/album/46.JPG",
        alt: "Khoảnh khắc 46",
      },
      {
        src: "/album/47.JPG",
        alt: "Khoảnh khắc 47",
      },
      {
        src: "/album/48.JPG",
        alt: "Khoảnh khắc 48",
      },
      {
        src: "/album/49.JPG",
        alt: "Khoảnh khắc 49",
      },
      {
        src: "/album/50.JPG",
        alt: "Khoảnh khắc 50",
      },
      {
        src: "/album/51.JPG",
        alt: "Khoảnh khắc 51",
      },
      {
        src: "/album/52.JPG",
        alt: "Khoảnh khắc 52",
      },
      {
        src: "/album/53.JPG",
        alt: "Khoảnh khắc 53",
      },
      {
        src: "/album/54.JPG",
        alt: "Khoảnh khắc 54",
      },
      {
        src: "/album/55.JPG",
        alt: "Khoảnh khắc 55",
      },
      {
        src: "/album/56.JPG",
        alt: "Khoảnh khắc 56",
      },
      {
        src: "/album/57.JPG",
        alt: "Khoảnh khắc 57",
      },
      {
        src: "/album/58.JPG",
        alt: "Khoảnh khắc 58",
      },
      {
        src: "/album/59.JPG",
        alt: "Khoảnh khắc 59",
      },
      {
        src: "/album/60.JPG",
        alt: "Khoảnh khắc 60",
      },
      {
        src: "/album/61.JPG",
        alt: "Khoảnh khắc 61",
      },
      {
        src: "/album/62.JPG",
        alt: "Khoảnh khắc 62",
      },
      {
        src: "/album/63.JPG",
        alt: "Khoảnh khắc 63",
      },
      {
        src: "/album/64.JPG",
        alt: "Khoảnh khắc 64",
      },
      {
        src: "/album/65.JPG",
        alt: "Khoảnh khắc 65",
      },
      {
        src: "/album/66.JPG",
        alt: "Khoảnh khắc 66",
      },
      {
        src: "/album/67.JPG",
        alt: "Khoảnh khắc 67",
      },
      {
        src: "/album/68.JPG",
        alt: "Khoảnh khắc 68",
      },
      {
        src: "/album/69.JPG",
        alt: "Khoảnh khắc 69",
      },
      {
        src: "/album/70.JPG",
        alt: "Khoảnh khắc 70",
      },
      {
        src: "/album/71.JPG",
        alt: "Khoảnh khắc 71",
      },
    ],
  },

  /** Liên hệ khẩn — thay SĐT / Zalo */
  contact: {
    groomPhone: "+84 …",
    bridePhone: "+84 …",
    zaloLink: "https://zalo.me/",
  },

  closingLine: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng con.",

  /**
   * Nhạc nền khi mở thiệp — đặt file mp3 vào `public/audio/` (vd. `wedding-bg.mp3`) và trỏ `src`.
   * Để `src: ""` nếu không dùng nhạc.
   */
  backgroundMusic: {
    src: "/audio/wedding-bg-50-nam.mp3" as string,
    // tracks: [
    //   "/audio/wedding-bg.mp3",
    //   "/audio/wedding-bg-50-nam.mp3",
    //   "/audio/wedding-bg-i-do.mp3",
    //   "/audio/wedding-bg-nothing.mp3",
    // ] as string[],
    /** 0–1 */
    volume: 0.35,
  },

  /**
   * Google Maps (nhúng iframe) — địa điểm nhà gái (dùng khi khách thuộc side "bride").
   * Trên Google Maps: địa điểm → Chia sẻ → Nhúng bản đồ → copy URL trong src="..."
   */
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0481659652173!2d106.04595321184894!3d21.190245480418398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350f09e5fe0c27%3A0x52f702178ae54488!2zTmjDoCBWaW5oIEJp4bq_dCBCYXk!5e0!3m2!1svi!2s!4v1776266441711!5m2!1svi!2s" as string,

  /**
   * Google Maps (nhúng iframe) — địa điểm cử hành hôn lễ (vd. Nhà văn hóa khu 4).
   * Trên Google Maps: địa điểm → Chia sẻ → Nhúng bản đồ → copy URL trong src="..."
   */
  receptionMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.942979708695!2d106.09018461184922!3d21.194423980415372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350c418fd79151%3A0xf759391b2c7844a7!2zTmjDoCB2xINuIGhvw6Ega2h1IHBo4buRIDQgVGjhu4sgQ-G6p3U!5e0!3m2!1svi!2s!4v1775882036991!5m2!1svi!2s" as string,
}

export type WeddingContent = typeof weddingContent
