"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { StoredPhoto } from "@/lib/kv";

type Photo = { src: string; alt: string; caption: string };

export const photos: Photo[] = [
  { src: "/images/meetin3.jpeg", alt: "RAS delegation outside Shreeji Group offices, Seychelles — June 2026", caption: "RAS Delegation at Shreeji Group Offices — June 2026" },
  { src: "/images/MEETING1.jpeg", alt: "RAS committee members seated at board meeting — June 2026", caption: "RAS Committee Board Meeting — June 2026" },
  { src: "/images/meeting2.jpeg", alt: "RAS members gathered at committee board meeting — June 2026", caption: "RAS Committee Meeting — Members, June 2026" },
  { src: "/images/meeting0.jpeg", alt: "RAS committee meeting with website presentation on screen — June 2026", caption: "RAS Meeting — Website Presentation, June 2026" },
  { src: "/images/committee-2026.jpg", alt: "Retailers Association of Seychelles Committee 2026", caption: "Retailers Association of Seychelles Committee 2026" },
  { src: "/images/download%20(3).png", alt: "Executive Committee Meeting — 20 May 2026", caption: "Executive Committee Meeting — 20 May 2026" },
  { src: "/images/image1.jpeg", alt: "Retailers Association of Seychelles Event", caption: "Retailers Association of Seychelles Event" },
  { src: "/images/annouscemedia1.jpeg", alt: "RAS Member Newsletter — June 2026", caption: "RAS Member Newsletter — June 2026" },
];

export default function GalleryClient({ kvPhotos }: Readonly<{ kvPhotos?: StoredPhoto[] }>) {
  const allPhotos: Photo[] = kvPhotos?.length ? kvPhotos : photos;
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => {
    if (i === null) return null;
    return i === 0 ? allPhotos.length - 1 : i - 1;
  }), [allPhotos.length]);
  const next = useCallback(() => setLightbox((i) => {
    if (i === null) return null;
    return i === allPhotos.length - 1 ? 0 : i + 1;
  }), [allPhotos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  return (
    <>
      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allPhotos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightbox(i)}
            className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#0D3572]/10 bg-white text-left w-full"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-[#0D3572]">{photo.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allPhotos[lightbox].src}
              alt={allPhotos[lightbox].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              unoptimized
            />
            <p className="text-center text-white/80 text-sm mt-3">
              {allPhotos[lightbox].caption} — {lightbox + 1} / {allPhotos.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
