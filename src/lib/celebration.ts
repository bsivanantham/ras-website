// Single source of truth for the current site-wide celebration
// (welcome popup + top banner). To run a new celebration, change this file
// and give it a NEW `key` so visitors who dismissed the last one see it again.

export const celebration = {
  key: "diwali-2026",
  poster: "/images/diwali-2026.jpg",
  posterAlt:
    "Happy Diwali from the Retailers Association of Seychelles — warmest wishes to all retailers, customers, business partners and the community of Seychelles.",
  bannerHeadline: "Happy Diwali from RAS!",
  bannerSub: "May the Festival of Lights bring happiness and prosperity to all",
  bannerDate: "8 November 2026",
  // Popup + banner switch themselves off after this moment (Seychelles time, UTC+4).
  endsAt: "2026-11-15T23:59:59+04:00",
} as const;

export function celebrationActive(now: number = Date.now()): boolean {
  return now <= new Date(celebration.endsAt).getTime();
}
