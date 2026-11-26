"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Download, CalendarDays, FileText, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ICON_OPTIONS, BADGE_COLOURS } from "@/lib/iconMap";
import type { StoredAnnouncement } from "@/lib/kv";
import { announcements, CAROUSEL_SIZE, type Announcement, type Preview } from "@/data/announcements";

const INTERVAL = 5000;

function PreviewPanel({ preview, onPlay, onStop }: Readonly<{ preview: Preview; onPlay?: () => void; onStop?: () => void }>) {
  if (preview.type === "video") {
    return (
      <div className="relative w-full h-full min-h-[240px] bg-black flex items-center justify-center">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={preview.src}
          controls
          playsInline
          className="w-full max-h-[400px] object-contain"
          onPlay={onPlay}
          onPause={onStop}
          onEnded={onStop}
        />
      </div>
    );
  }

  if (preview.type === "image") {
    return (
      <div className="relative w-full h-full min-h-[240px]">
        <Image
          src={preview.src}
          alt="Document preview"
          fill
          className="object-contain p-3"
          unoptimized
        />
      </div>
    );
  }

  if (preview.type === "pdf") {
    return (
      <div className="relative w-full h-full min-h-[240px] flex flex-col">
        <iframe
          src={`${preview.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="w-full flex-1 hidden md:block"
          title="PDF preview"
        />
        {/* Mobile fallback */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-6 text-center gap-3">
          <FileText className="h-12 w-12 text-[#0D3572]/30" />
          <p className="text-sm text-gray-500">Tap below to open document</p>
          <a href={preview.src} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="border-[#0D3572]/30 text-[#0D3572] gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" /> Open PDF
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[240px] gap-3 p-6">
      <div className="bg-[#0D3572] rounded-2xl px-8 py-6 text-center shadow-lg">
        <p className="text-[#C9A227] text-xl font-bold tracking-widest">{preview.month}</p>
        <p className="text-white text-6xl font-extrabold leading-none mt-1">{preview.day}</p>
        <p className="text-white/60 text-sm mt-2">2026</p>
      </div>
      <p className="text-sm text-gray-500 font-medium">{preview.location}</p>
    </div>
  );
}

function fromKv(stored: StoredAnnouncement): Announcement {
  return {
    ...stored,
    Icon: ICON_OPTIONS[stored.iconKey as keyof typeof ICON_OPTIONS] ?? FileText,
    badgeColor: BADGE_COLOURS[stored.badgeColorKey] ?? "bg-blue-100 text-blue-700",
  };
}

export default function AnnouncementsCarousel({
  items,
  kvItems,
  label = "Latest for Members",
}: Readonly<{ items?: Announcement[]; kvItems?: StoredAnnouncement[]; label?: string }>) {
  const resolved: Announcement[] = (kvItems?.length
    ? kvItems.map(fromKv)
    : (items ?? announcements)
  ).slice(0, CAROUSEL_SIZE);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setIdx((i) => (i === resolved.length - 1 ? 0 : i + 1)),
    [resolved.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? resolved.length - 1 : i - 1)),
    [resolved.length]
  );
  const goTo = (i: number) => setIdx(i);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const ann = resolved[idx] ?? resolved[0];
  const { Icon } = ann;

  return (
    <section
      className="py-12 bg-white"
      aria-label="Announcements carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        const startX = touchStartX.current;
        touchStartX.current = null;
        setPaused(false);
        if (startX === null) return;
        const delta = e.changedTouches[0].clientX - startX;
        if (delta < -50) next();
        else if (delta > 50) prev();
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-1">
              {label}
            </p>
            <h2 className="text-2xl font-bold text-[#0D3572]">Announcements</h2>
          </div>
          {resolved.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="h-11 w-11 rounded-full border border-[#0D3572]/20 flex items-center justify-center hover:bg-[#0D3572] hover:text-white hover:border-[#0D3572] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-11 w-11 rounded-full border border-[#0D3572]/20 flex items-center justify-center hover:bg-[#0D3572] hover:text-white hover:border-[#0D3572] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Progress bar — CSS animated, resets on slide change, pauses on hover/touch */}
        <style>{`@keyframes ras-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
        <div className="h-0.5 bg-[#0D3572]/10 rounded-full mb-4 overflow-hidden">
          <div
            key={idx}
            className="h-full w-full bg-[#C9A227] rounded-full origin-left"
            style={{
              animationName: "ras-progress",
              animationDuration: `${INTERVAL}ms`,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#0D3572]/10 bg-[#EFF4FF] overflow-hidden min-h-[300px] sm:min-h-[360px] flex flex-col md:flex-row">
          {/* Left — content */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0D3572]" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ann.badgeColor}`}>
                  {ann.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#0D3572] mb-2 sm:mb-3 leading-snug">
                {ann.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{ann.description}</p>
              <p className="text-xs text-gray-400 font-medium">{ann.date}</p>
            </div>
            <div className="mt-4 sm:mt-6">
              {ann.href && (
                <a href={ann.href} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 h-10 sm:h-auto">
                    <Download className="h-4 w-4" />
                    {ann.actionLabel}
                  </Button>
                </a>
              )}
              {!ann.href && ann.done && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B8A4B]">
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                  Completed — {ann.date}
                </span>
              )}
              {!ann.href && !ann.done && (
                <span className="inline-flex items-center gap-2 text-sm text-[#1B8A4B] font-semibold">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {ann.preview.type === "event"
                    ? `${ann.preview.day} ${ann.preview.month.charAt(0)}${ann.preview.month.slice(1).toLowerCase()} 2026, ${ann.preview.location}`
                    : ann.date}
                </span>
              )}
            </div>
          </div>

          {/* Right — preview */}
          <div className="md:w-[300px] lg:w-[400px] bg-white border-t md:border-t-0 md:border-l border-[#0D3572]/10 overflow-hidden min-h-[200px]">
            <PreviewPanel preview={ann.preview} onPlay={() => setPaused(true)} onStop={() => setPaused(false)} />
          </div>
        </div>

        {/* Dots */}
        {resolved.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {resolved.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to announcement ${i + 1}`}
                className="py-3 px-1 flex items-center"
              >
                <span className={`h-2 rounded-full transition-all duration-300 block ${
                  i === idx ? "w-8 bg-[#0D3572]" : "w-2 bg-[#0D3572]/25"
                }`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
