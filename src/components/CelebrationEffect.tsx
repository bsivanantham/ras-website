"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

// Seychelles national flag colours
const COLORS = ["#003F87", "#FFD700", "#FF0000", "#FFFFFF", "#00A550"];

function burst(opts: confetti.Options) {
  void confetti({ colors: COLORS, ...opts });
}

export default function CelebrationEffect() {
  useEffect(() => {
    // ── Opening volleys ───────────────────────────────────────────────────
    burst({ particleCount: 120, spread: 75, origin: { y: 0.65 } });

    const t1 = setTimeout(() => burst({ particleCount: 70, angle: 60,  spread: 60, origin: { x: 0, y: 0.7 } }), 350);
    const t2 = setTimeout(() => burst({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }), 700);
    const t3 = setTimeout(() => burst({ particleCount: 60, spread: 100, startVelocity: 20, origin: { y: 0.5 } }), 1200);

    // ── Continuous gentle rain from the top ───────────────────────────────
    let rainTimer: ReturnType<typeof setTimeout>;
    let running = true;

    const rain = () => {
      if (!running) return;
      burst({
        particleCount: 2,
        angle: 90,
        spread: 40,
        origin: { x: Math.random(), y: 0 },
        startVelocity: 10,
        gravity: 0.55,
        drift: (Math.random() - 0.5) * 0.4,
        ticks: 400,
      });
      rainTimer = setTimeout(rain, 220);
    };

    // Start rain after the opening burst settles
    const rainStart = setTimeout(rain, 1800);

    return () => {
      running = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(rainStart);
      clearTimeout(rainTimer);
    };
  }, []);

  return null;
}
