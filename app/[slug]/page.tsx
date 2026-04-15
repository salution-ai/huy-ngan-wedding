import { WeddingBackgroundMusic } from "@/components/wedding/wedding-background-music";
import {
  WeddingInvitation,
  type WeddingGuest,
} from "@/components/wedding/wedding-invitation";

export const dynamic = "force-dynamic";

async function fetchGuestBySlug(slug: string): Promise<Partial<WeddingGuest> | null> {
  const url = new URL("https://n8n.salution.net/webhook/wedding-guest");
  url.searchParams.set("slug", slug);

  // Try GET first (common for webhooks).
  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as any;
      return (data?.guest ?? data) as Partial<WeddingGuest>;
    }
  } catch {}

  // Fallback to POST in case webhook expects body.
  try {
    const res = await fetch("https://n8n.salution.net/webhook/wedding-guest", {
      method: "POST",
      cache: "no-store",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    return (data?.guest ?? data) as Partial<WeddingGuest>;
  } catch {
    return null;
  }
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await fetchGuestBySlug(slug);

  return (
    <>
      <WeddingBackgroundMusic />
      <WeddingInvitation guest={guest} />
    </>
  );
}

