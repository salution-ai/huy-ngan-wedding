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
    coverSrc: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    coverAlt: "Ảnh bìa thiệp — thay bằng ảnh cưới của bạn",
    items: [
      {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        alt: "Khoảnh khắc 1",
      },
      {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b58c?w=800&q=80",
        alt: "Khoảnh khắc 2",
      },
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        alt: "Khoảnh khắc 3",
      },
      {
        src: "https://images.unsplash.com/photo-1529636799528-93f6e06b7e5b?w=800&q=80",
        alt: "Khoảnh khắc 4",
      },
      {
        src: "https://images.unsplash.com/photo-1522413452209-7cbf37653562?w=800&q=80",
        alt: "Khoảnh khắc 5",
      },
      {
        src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
        alt: "Khoảnh khắc 6",
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

  /** Gợi ý: iframe Google Maps — dán src embed khi có; để trống thì chỉ hiện nút mở Maps */
  mapEmbedUrl: "" as string,

  /**
   * Google Maps (nhúng iframe) — địa điểm cử hành hôn lễ (vd. Nhà văn hóa khu 4).
   * Trên Google Maps: địa điểm → Chia sẻ → Nhúng bản đồ → copy URL trong src="..."
   */
  receptionMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.942979708695!2d106.09018461184922!3d21.194423980415372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350c418fd79151%3A0xf759391b2c7844a7!2zTmjDoCB2xINuIGhvw6Ega2h1IHBo4buRIDQgVGjhu4sgQ-G6p3U!5e0!3m2!1svi!2s!4v1775882036991!5m2!1svi!2s" as string,
}

export type WeddingContent = typeof weddingContent
