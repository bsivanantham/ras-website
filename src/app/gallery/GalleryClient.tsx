"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import type { StoredPhoto } from "@/lib/kv";
import AdminBottomSheet from "@/components/admin/AdminBottomSheet";
import GalleryManager from "@/components/admin/GalleryManager";

type Photo = { src: string; alt: string; caption: string; group?: string };

export const photos: Photo[] = [
  { src: "/images/meetin3.jpeg",   alt: "RAS delegation outside Shreeji Group offices — June 2026",              caption: "Outside Shreeji Group Offices",       group: "RAS Executive Committee Meeting — June 2026" },
  { src: "/images/MEETING1.jpeg",  alt: "RAS committee members at board table, full room — June 2026",           caption: "Board Room — Full Table",             group: "RAS Executive Committee Meeting — June 2026" },
  { src: "/images/meeting2.jpeg",  alt: "RAS committee members gathered at board meeting — June 2026",           caption: "Board Room — All Members",            group: "RAS Executive Committee Meeting — June 2026" },
  { src: "/images/meeting0.jpeg",  alt: "RAS committee meeting with website on presentation screen — June 2026", caption: "Board Room — Website Presentation",   group: "RAS Executive Committee Meeting — June 2026" },
  { src: "/images/committee-2026.jpg",  alt: "Retailers Association of Seychelles Committee 2026",         caption: "Retailers Association of Seychelles Committee 2026" },
  { src: "/images/download%20(3).png",  alt: "Executive Committee Meeting — 20 May 2026",                  caption: "Executive Committee Meeting — 20 May 2026" },
  { src: "/images/image1.jpeg",         alt: "Retailers Association of Seychelles Event",                   caption: "Retailers Association of Seychelles Event" },
  { src: "/images/annouscemedia1.jpeg", alt: "RAS Member Newsletter — June 2026",                          caption: "RAS Member Newsletter — June 2026" },
];

// ── Display-item types ────────────────────────────────────────────────────────

type GroupItem  = { type: "group";  groupKey: string; items: Array<{ photo: Photo; flatIndex: number }> };
type SingleItem = { type: "single"; photo: Photo; flatIndex: number };
type DisplayItem = GroupItem | SingleItem;

function buildDisplayItems(flat: Photo[]): DisplayItem[] {
  const result: DisplayItem[] = [];
  const groupMap = new Map<string, GroupItem>();

  flat.forEach((photo, flatIndex) => {
    if (photo.group && groupMap.has(photo.group)) {
      groupMap.get(photo.group)!.items.push({ photo, flatIndex });
    } else if (photo.group) {
      const g: GroupItem = { type: "group", groupKey: photo.group, items: [{ photo, flatIndex }] };
      groupMap.set(photo.group, g);
      result.push(g);
    } else {
      result.push({ type: "single", photo, flatIndex });
    }
  });

  return result;
}

// ── Group card (internal carousel) ───────────────────────────────────────────

function GroupPhotoCard({ item, onOpen }: Readonly<{ item: GroupItem; onOpen: (flatIndex: number) => void }>) {
  const [active, setActive] = useState(0);
  const total   = item.items.length;
  const current = item.items[active];

  const goPrev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
  const goNext = useCallback(() => setActive(a => (a + 1) % total), [total]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#0D3572]/10 bg-white">
      {/* Image — click opens lightbox */}
      <button
        className="relative aspect-[4/3] w-full block overflow-hidden group"
        onClick={() => onOpen(current.flatIndex)}
        aria-label={`View full — ${current.photo.caption}`}
      >
        <Image
          src={current.photo.src}
          alt={current.photo.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {/* Dot indicators */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5">
          {item.items.map(({ photo }, i) => (
            <span
              key={photo.src}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </button>

      {/* Navigation row */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100">
        <button
          onClick={goPrev}
          className="h-7 w-7 rounded-full flex items-center justify-center text-[#0D3572] hover:bg-[#EFF4FF] transition-colors shrink-0"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 text-center min-w-0">
          <p className="text-sm font-medium text-[#0D3572] truncate">{item.groupKey}</p>
          <p className="text-[11px] text-gray-400">{current.photo.caption} · {active + 1}/{total}</p>
        </div>

        <button
          onClick={goNext}
          className="h-7 w-7 rounded-full flex items-center justify-center text-[#0D3572] hover:bg-[#EFF4FF] transition-colors shrink-0"
          aria-label="Next photo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ── Single photo card ─────────────────────────────────────────────────────────

function SinglePhotoCard({ item, onOpen }: Readonly<{ item: SingleItem; onOpen: (flatIndex: number) => void }>) {
  return (
    <button
      onClick={() => onOpen(item.flatIndex)}
      className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#0D3572]/10 bg-white text-left w-full"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={item.photo.src}
          alt={item.photo.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-[#0D3572]">{item.photo.caption}</p>
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

function prevLightboxIndex(i: number | null, total: number): number | null {
  if (i === null) return null;
  return i === 0 ? total - 1 : i - 1;
}

function nextLightboxIndex(i: number | null, total: number): number | null {
  if (i === null) return null;
  return i === total - 1 ? 0 : i + 1;
}

export default function GalleryClient({ kvPhotos, isAdmin }: Readonly<{ kvPhotos?: StoredPhoto[]; isAdmin?: boolean }>) {
  const allPhotos: Photo[] = kvPhotos?.length ? kvPhotos : photos;
  const displayItems = buildDisplayItems(allPhotos);
  const total = allPhotos.length;

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox(i => prevLightboxIndex(i, total)), [total]);
  const next  = useCallback(() => setLightbox(i => nextLightboxIndex(i, total)), [total]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayItems.map(item =>
          item.type === "group"
            ? <GroupPhotoCard key={item.groupKey} item={item} onOpen={setLightbox} />
            : <SinglePhotoCard key={item.photo.src} item={item} onOpen={setLightbox} />
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop — real button so no role= hack needed */}
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-label="Close lightbox"
            tabIndex={-1}
          />

          {/* Controls sit above the backdrop via z-10 */}
          <button onClick={close} className="absolute top-4 right-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <button onClick={prev} className="absolute left-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image — plain div, no event handlers; clicks don't bubble to backdrop (it's a sibling) */}
          <div className="relative z-10 max-w-4xl w-full max-h-[80vh]">
            <Image
              src={allPhotos[lightbox].src}
              alt={allPhotos[lightbox].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              unoptimized
            />
            <p className="text-center text-white/80 text-sm mt-3">
              {allPhotos[lightbox].caption} — {lightbox + 1} / {total}
            </p>
          </div>

          <button onClick={next} className="absolute right-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {isAdmin && (
        <>
          <button
            onClick={() => setAdminOpen(true)}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#0D3572] text-white shadow-lg hover:bg-[#0a2a5e] transition-colors flex items-center justify-center"
            aria-label="Manage gallery"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <AdminBottomSheet open={adminOpen} onClose={() => setAdminOpen(false)} title="Manage Gallery">
            <GalleryManager initial={kvPhotos ?? []} />
          </AdminBottomSheet>
        </>
      )}
    </>
  );
}
