"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const POPUP_KEY = "ras_popup_video-jul2026";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(POPUP_KEY)) {
        const t = setTimeout(() => setVisible(true), 500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const close = () => {
    try { localStorage.setItem(POPUP_KEY, "1"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ras-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ras-rise { from { opacity: 0; transform: translateY(24px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .ras-popup-bg   { animation: ras-fade 0.25s ease forwards }
        .ras-popup-card { animation: ras-rise 0.32s ease forwards }
      `}</style>

      {/* Full-screen overlay */}
      <div className="ras-popup-bg fixed inset-0 z-[200] flex items-end sm:items-center justify-center">

        {/* Backdrop — tap to close */}
        <button
          className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"
          onClick={close}
          aria-label="Close"
          tabIndex={-1}
        />

        {/* Card */}
        <div
          className="ras-popup-card relative z-10 w-full sm:w-auto sm:mx-4"
          style={{ maxWidth: "min(480px, 100vw)" }}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute -top-5 right-3 z-20 h-12 w-12 rounded-full bg-white shadow-2xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform touch-manipulation"
            aria-label="Close"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Video */}
          <div className="rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/images/celebration-jul2026.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
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
