"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const BANNER_KEY = "ras_banner_independence_50th";

export default function CelebrationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(BANNER_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try { localStorage.setItem(BANNER_KEY, "1"); } catch {}
    setVisible(false);
  };

  return (
    <div className="relative w-full bg-[#0D3572] py-2.5 px-10 flex items-center justify-center gap-2.5">
      <span className="text-base leading-none select-none">🇸🇨</span>
      <p className="text-sm text-center leading-snug">
        <span className="text-[#C9A227] font-bold">Happy 50th Independence Day, Seychelles!</span>
        <span className="text-white/70 hidden sm:inline"> — Retailers Association of Seychelles celebrates with the nation</span>
        <span className="text-white/50 ml-2 text-xs">29 June 2026</span>
      </p>
      <span className="text-base leading-none select-none">🎊</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors touch-manipulation p-1"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
