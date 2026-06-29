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
    // Centre launch
    burst({ particleCount: 120, spread: 75, origin: { y: 0.65 } });

    // Left cannon
    const t1 = setTimeout(
      () => burst({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } }),
      350,
    );
    // Right cannon
    const t2 = setTimeout(
      () => burst({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }),
      700,
    );
    // Final centre pop
    const t3 = setTimeout(
      () => burst({ particleCount: 60, spread: 100, startVelocity: 20, origin: { y: 0.5 } }),
      1200,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return null;
}
