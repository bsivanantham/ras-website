"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { celebration, celebrationActive } from "@/lib/celebration";

const POPUP_KEY = `ras_popup_${celebration.key}`;

// Diwali palette: gold, saffron, deep red, warm white
const SPARK_COLORS = ["#C9A227", "#FFD700", "#FF9933", "#B91C1C", "#FFF4D6"];

// One short, gentle burst when the popup opens. Skipped for users who ask
// for reduced motion. Canvas sits above the popup but ignores clicks.
function sparkle() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 32,
      ticks: 140,
      origin: { y: 0.6 },
      colors: SPARK_COLORS,
      zIndex: 250,
      disableForReducedMotion: true,
    });
  } catch {}
}

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    try { localStorage.setItem(POPUP_KEY, "1"); } catch {}
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!celebrationActive()) return;
    try {
      if (!localStorage.getItem(POPUP_KEY)) {
        const t = setTimeout(() => {
          setVisible(true);
          sparkle();
        }, 500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ras-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ras-rise { from { opacity: 0; transform: translateY(24px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .ras-popup-bg   { animation: ras-fade 0.25s ease forwards }
        .ras-popup-card { animation: ras-rise 0.32s ease forwards }
      `}</style>

      <div
        className="ras-popup-bg fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={celebration.bannerHeadline}
      >
        {/* Backdrop */}
        <button
          className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"
          onClick={close}
          aria-label="Close"
          tabIndex={-1}
        />

        <div
          className="ras-popup-card relative z-10 w-full sm:w-auto sm:mx-4"
          style={{ maxWidth: "min(720px, 100vw)" }}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute -top-5 right-3 z-20 h-12 w-12 rounded-full bg-white shadow-2xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform touch-manipulation"
            aria-label="Close"
            autoFocus
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Poster */}
          <div className="rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#FFF8EC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={celebration.poster}
              alt={celebration.posterAlt}
              width={1536}
              height={1024}
              className="w-full h-auto block max-h-[82dvh] sm:max-h-[78dvh] object-contain"
            />
          </div>

          {/* Bottom handle — mobile only */}
          <div className="sm:hidden bg-white/10 rounded-b-3xl py-3 text-center">
            <p className="text-white/60 text-xs tracking-wide">Tap anywhere to close</p>
          </div>
        </div>
      </div>
    </>
  );
}
