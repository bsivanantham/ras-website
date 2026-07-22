"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Pencil, Heart } from "lucide-react";
import type { StoredMemorial } from "@/lib/kv";
import AdminBottomSheet from "@/components/admin/AdminBottomSheet";
import MemorialManager from "@/components/admin/MemorialManager";

// Shown when no admin-added tributes exist yet.
export const seedMemorials: StoredMemorial[] = [
  {
    id: "mem-seed-sapillay",
    name: "S.A. Pillay",
    shop: "Santhi Avamthram",
    district: "Baie Ste Anne, Praslin",
    yearFrom: null,
    yearTo: 2026,
    photoSrc: "/images/annouc3.jpeg",
    tribute:
      "With profound sadness, the Retailers Association of Seychelles mourns the passing of our respected member S.A. Pillay. We extend our heartfelt condolences and deepest sympathy to his family, friends and staff during this difficult time. May his soul rest in eternal peace.",
    order: 0,
    createdAt: "2026-07-20T00:00:00.000Z",
  },
  {
    id: "mem-seed-shivaroshini",
    name: "Miss. Shivaroshini Nayanmar",
    shop: null,
    district: "Mont Buxton, Mahé",
    yearFrom: null,
    yearTo: 2026,
    photoSrc: "/images/memo1.jpeg",
    tribute:
      "It is with a heavy heart that the Retailers Association of Seychelles informs the sad demise of Miss. Shivaroshini Nayanmar of Mont Buxton, Mahé. We extend our deepest sympathies to her family, relatives and friends during this difficult time. May her soul rest in eternal peace.",
    order: 1,
    createdAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: "mem-seed-sivasekaran",
    name: "Mr. Sivasekaran",
    shop: "Hari Meena Store",
    district: "Providence",
    yearFrom: null,
    yearTo: 2026,
    photoSrc: "/images/mem3.jpeg",
    tribute:
      "The Retailers Association of Seychelles extends its deepest condolences on the passing of Mr. Sivasekaran. We extend our heartfelt sympathies to his family, and to the management and staff of Hari Meena Store, Providence, during this difficult time. May his soul rest in eternal peace.",
    order: 2,
    createdAt: "2026-06-24T00:00:00.000Z",
  },
  {
    id: "mem-seed-rethinasamy",
    name: "Mr. Rethinasamy Arunachalam",
    shop: "New Shop (La Retraite) & Rathna Store (Quincy Village)",
    district: null,
    yearFrom: 1941,
    yearTo: 2026,
    photoSrc: "/images/memo2.jpeg",
    tribute:
      "The Retailers Association of Seychelles extends our deepest condolences to the family on the sad passing of Mr. Rethinasamy Arunachalam. Our thoughts and prayers are with the family during this time of immense sorrow. May his soul rest in eternal peace.",
    order: 3,
    createdAt: "2026-06-15T00:00:00.000Z",
  },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function metaLine(m: StoredMemorial): string {
  const years = m.yearFrom || m.yearTo ? `${m.yearFrom ?? ""}–${m.yearTo ?? ""}` : null;
  return [m.shop, m.district, years].filter(Boolean).join(" · ");
}

function PosterOrMonogram({ m }: Readonly<{ m: StoredMemorial }>) {
  if (m.photoSrc) {
    return (
      <Image
        src={m.photoSrc}
        alt={`In memory of ${m.name}`}
        fill
        className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
        unoptimized
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#0D3572]/60">
      <span className="text-4xl font-semibold tracking-wide">{initials(m.name)}</span>
      <Heart className="h-5 w-5" />
    </div>
  );
}

function TributeCard({ m, onOpen }: Readonly<{ m: StoredMemorial; onOpen: () => void }>) {
  const meta = metaLine(m);
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#0D3572]/10 bg-white flex flex-col">
      <button
        onClick={onOpen}
        className="group relative aspect-[3/4] w-full block bg-gray-100 overflow-hidden"
        aria-label={`View tribute — ${m.name}`}
      >
        <PosterOrMonogram m={m} />
      </button>
      <div className="px-4 py-3 flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#0D3572]">{m.name}</p>
        {meta && <p className="text-xs text-gray-500">{meta}</p>}
        {m.tribute && <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mt-1">{m.tribute}</p>}
      </div>
    </div>
  );
}

export default function MemoryClient({ kvMemorials, isAdmin }: Readonly<{ kvMemorials?: StoredMemorial[]; isAdmin?: boolean }>) {
  const memorials: StoredMemorial[] = kvMemorials?.length ? kvMemorials : seedMemorials;
  const total = memorials.length;

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % total)), [total]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  const active = lightbox !== null ? memorials[lightbox] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {memorials.map((m, i) => (
          <TributeCard key={m.id} m={m} onOpen={() => setLightbox(i)} />
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-label="Close"
            tabIndex={-1}
          />
          <button onClick={close} className="absolute top-4 right-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          {total > 1 && (
            <button onClick={prev} className="absolute left-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="relative z-10 max-w-2xl w-full max-h-[85vh] flex flex-col items-center">
            {active.photoSrc ? (
              <Image
                src={active.photoSrc}
                alt={`In memory of ${active.name}`}
                width={1000}
                height={1400}
                className="w-auto h-auto max-h-[70vh] object-contain rounded-lg"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-white/80 h-48 w-48 rounded-lg bg-white/5">
                <span className="text-5xl font-semibold">{initials(active.name)}</span>
                <Heart className="h-6 w-6" />
              </div>
            )}
            <div className="text-center mt-4 text-white">
              <p className="text-lg font-semibold">{active.name}</p>
              {metaLine(active) && <p className="text-white/70 text-sm mt-0.5">{metaLine(active)}</p>}
              {active.tribute && <p className="text-white/70 text-sm mt-3 max-w-xl leading-relaxed">{active.tribute}</p>}
            </div>
          </div>

          {total > 1 && (
            <button onClick={next} className="absolute right-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {isAdmin && (
        <>
          <button
            onClick={() => setAdminOpen(true)}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#0D3572] text-white shadow-lg hover:bg-[#0a2a5e] transition-colors flex items-center justify-center"
            aria-label="Manage In Memory"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <AdminBottomSheet open={adminOpen} onClose={() => setAdminOpen(false)} title="Manage In Memory">
            <MemorialManager initial={kvMemorials ?? []} />
          </AdminBottomSheet>
        </>
      )}
    </>
  );
}
