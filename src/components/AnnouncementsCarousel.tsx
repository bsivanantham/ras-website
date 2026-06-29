"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Download, CalendarDays, FileText, Gavel, ExternalLink, Truck, Tag, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ICON_OPTIONS, BADGE_COLOURS } from "@/lib/iconMap";
import type { StoredAnnouncement } from "@/lib/kv";

const INTERVAL = 5000;

type Preview =
  | { type: "image"; src: string }
  | { type: "pdf"; src: string }
  | { type: "event"; month: string; day: string; location: string };

const CTRL_PDF =
  "/docs/SI%208%202026%20-%20Control%20of%20Supplies%20and%20Services%20(Maximum%20Wholesale%20and%20Retail%20Mark-up)%20Order%202026%20(1).pdf";
const COMP_PDF = "/docs/Competition-Law-in-Seychelles-148-x-210-mm-1.pdf";
const MARGIN_IMG = "/docs/WhatsApp%20Image%202026-05-17%20at%2010.43.39.jpeg";

type Announcement = {
  id: string;
  badge: string;
  badgeColor: string;
  Icon: React.ElementType;
  title: string;
  description: string;
  date: string;
  href: string | null;
  actionLabel: string | null;
  preview: Preview;
  done?: boolean;
};

export const publicAnnouncements: Announcement[] = [
  {
    id: "ann-independence-50th-2026",
    badge: "50th Independence Day",
    badgeColor: "bg-yellow-100 text-yellow-800",
    Icon: Star,
    title: "Happy 50th Independence Day, Seychelles! — 29 June 2026",
    description:
      "The Retailers Association of Seychelles joins every Seychellois in celebrating 50 years of independence. Today we honour our sovereignty, our unity, and the remarkable journey of our nation. Here's to the next 50 years — stronger, prouder, and more prosperous than ever. Happy 50th Independence Day, Seychelles! 🇸🇨",
    date: "29 June 2026",
    href: "/images/ras50.jpeg",
    actionLabel: "View Celebration",
    preview: { type: "image", src: "/images/ras50.jpeg" },
  },
  {
    id: "ann-pm-india-visit-2026",
    badge: "Historic Visit",
    badgeColor: "bg-orange-100 text-orange-700",
    Icon: Star,
    title: "RAS Warmly Welcomes PM Narendra Modi to Seychelles",
    description:
      "The Retailers Association of Seychelles proudly joins the nation in welcoming His Excellency Shri Narendra Damodardas Modi, Prime Minister of India, to the Republic of Seychelles on the occasion of our 50th Independence Day — 29 June 2026. This historic visit celebrates the deep and enduring friendship between India and Seychelles, built on unity, trust, and a shared vision for a brighter future.",
    date: "29 June 2026",
    href: "/images/pm-india-visit-2026.jpeg",
    actionLabel: "View Welcome Message",
    preview: { type: "image", src: "/images/pm-india-visit-2026.jpeg" },
  },
  {
    id: "ann-constitution-day-2026",
    badge: "National Day",
    badgeColor: "bg-blue-100 text-blue-700",
    Icon: CalendarDays,
    title: "Happy Constitution Day, Seychelles! — 18 June 2026",
    description:
      "The Retailers Association of Seychelles joins the nation in celebrating Constitution Day. Today we honour the foundation of our democracy, rights, and national progress. Let us continue to build a peaceful, prosperous, and united Seychelles — for generations to come.",
    date: "18 June 2026",
    href: "/images/seycehllesday.jpeg",
    actionLabel: "View Message",
    preview: { type: "image", src: "/images/seycehllesday.jpeg" },
  },
  {
    id: "ann-energy",
    badge: "Notice",
    badgeColor: "bg-green-100 text-green-700",
    Icon: FileText,
    title: "Save Energy, Save Our Nation",
    description:
      "RAS kindly requests all members to adopt practical energy-saving measures: switch off unnecessary lights, increase AC temperature slightly, service faulty refrigerators, use LED bulbs, and monitor monthly electricity usage. Together, even small efforts can make a difference for our Nation.",
    date: "May 2026",
    href: "/images/annouce1.jpeg",
    actionLabel: "View Notice",
    preview: { type: "image", src: "/images/annouce1.jpeg" },
  },
];

const announcements: Announcement[] = [
  // ── Newest first ─────────────────────────────────────────────────────────
  {
    id: "ann-independence-50th-2026",
    badge: "50th Independence Day",
    badgeColor: "bg-yellow-100 text-yellow-800",
    Icon: Star,
    title: "Happy 50th Independence Day, Seychelles! — 29 June 2026",
    description:
      "The Retailers Association of Seychelles joins every Seychellois in celebrating 50 years of independence. Today we honour our sovereignty, our unity, and the remarkable journey of our nation. Here's to the next 50 years — stronger, prouder, and more prosperous than ever. Happy 50th Independence Day, Seychelles! 🇸🇨",
    date: "29 June 2026",
    href: "/images/ras50.jpeg",
    actionLabel: "View Celebration",
    preview: { type: "image", src: "/images/ras50.jpeg" },
  },
  {
    id: "ann-pm-india-visit-2026",
    badge: "Historic Visit",
    badgeColor: "bg-orange-100 text-orange-700",
    Icon: Star,
    title: "RAS Warmly Welcomes PM Narendra Modi to Seychelles",
    description:
      "The Retailers Association of Seychelles proudly joins the nation in welcoming His Excellency Shri Narendra Damodardas Modi, Prime Minister of India, to the Republic of Seychelles on the occasion of our 50th Independence Day — 29 June 2026. This historic visit celebrates the deep and enduring friendship between India and Seychelles, built on unity, trust, and a shared vision for a brighter future.",
    date: "29 June 2026",
    href: "/images/pm-india-visit-2026.jpeg",
    actionLabel: "View Welcome Message",
    preview: { type: "image", src: "/images/pm-india-visit-2026.jpeg" },
  },
  {
    id: "ann-constitution-day-2026",
    badge: "National Day",
    badgeColor: "bg-blue-100 text-blue-700",
    Icon: CalendarDays,
    title: "Happy Constitution Day, Seychelles! — 18 June 2026",
    description:
      "The Retailers Association of Seychelles joins the nation in celebrating Constitution Day. Today we honour the foundation of our democracy, rights, and national progress. Let us continue to build a peaceful, prosperous, and united Seychelles — for generations to come.",
    date: "18 June 2026",
    href: "/images/seycehllesday.jpeg",
    actionLabel: "View Message",
    preview: { type: "image", src: "/images/seycehllesday.jpeg" },
  },
  {
    id: "ann-insurance-outcome",
    badge: "Member Benefit",
    badgeColor: "bg-green-100 text-green-700",
    Icon: CheckCircle,
    title: "RAS Secures Insurance Benefits for Certified Members",
    description:
      "RAS met with SACOS Insurance and Fidelity Insurance Brokers on 3 June 2026 to secure exclusive benefits for Certified Members. Key outcomes include discounted insurance packages starting from 10% off, life insurance and accident coverage for shop employees and business owners, improved claims support, and a member questionnaire being developed to prepare tailored proposals. Further details will be circulated shortly.",
    date: "3 June 2026",
    href: "/images/rasdiscount.jpeg",
    actionLabel: "View Details",
    preview: { type: "image", src: "/images/rasdiscount.jpeg" },
  },
  {
    id: "ann-stc-delivery-policy",
    badge: "STC Policy Update",
    badgeColor: "bg-sky-100 text-sky-700",
    Icon: Truck,
    title: "STC Revised Delivery Policy — Effective 15 June 2026",
    description:
      "STC has revised its delivery policy for Category 1 products. Free delivery applies to Category 1 orders of SCR 5,000+ and Category 2 orders of SCR 3,000+. Orders below these thresholds will incur a SCR 300 delivery fee. Consolidated Category 1 and non-Category 1 purchases can be delivered together if free delivery conditions are met.",
    date: "Effective Monday, 15 June 2026",
    href: "/images/stcannouce.jpeg",
    actionLabel: "View Notice",
    preview: { type: "image", src: "/images/stcannouce.jpeg" },
  },
  {
    id: "ann-pilgrims-security",
    badge: "Upcoming Meeting",
    badgeColor: "bg-teal-100 text-teal-700",
    Icon: CalendarDays,
    title: "Meeting with Pilgrims Security Ltd — Security Solutions for Retailers",
    description:
      "RAS will meet with Pilgrims Security Ltd to discuss security solutions and services available to Seychelles retailers. The meeting includes a visit to their 24-hour Monitoring Station at their Headquarters in Providence.",
    date: "Monday, 15 June 2026 — 11:00 a.m.",
    href: "/images/meeting.jpeg",
    actionLabel: "View Flyer",
    preview: { type: "image", src: "/images/meeting.jpeg" },
  },
  {
    id: "ann-nation-article",
    badge: "In the News",
    badgeColor: "bg-yellow-100 text-yellow-800",
    Icon: FileText,
    title: "RAS Featured in Seychelles Nation Newspaper",
    description:
      "Retailers Association of Seychelles was featured in the Seychelles Nation on 2 June 2026 — highlighting 15 years of supporting retail businesses across Mahé, Praslin, and La Digue.",
    date: "2 June 2026",
    href: "/docs/Retailers%2015%20years.pdf",
    actionLabel: "Read the Article (PDF)",
    preview: { type: "pdf", src: "/docs/Retailers%2015%20years.pdf" },
  },
  {
    id: "ann-ftc-outcome",
    badge: "Notice to Retailers",
    badgeColor: "bg-red-100 text-red-700",
    Icon: Gavel,
    title: "FTC Meeting Outcome — Right to Set Your Own Price",
    description:
      "Following discussions between RAS and the Fair Trading Commission: retailers have the right to determine their own selling prices. RRP materials are not required in-store — RRP can only appear on the product itself. Remove all RRP posters and stickers by 24 August 2026.",
    date: "Deadline: 24 August 2026",
    href: null,
    actionLabel: null,
    preview: { type: "image", src: "/images/annouce2.jpeg" },
  },
  {
    id: "ann-ras-update",
    badge: "General Update",
    badgeColor: "bg-blue-100 text-blue-700",
    Icon: FileText,
    title: "RAS — Working Together for a Stronger Retail Community",
    description:
      "RAS continues its mission to support all members — creating awareness on energy saving, collecting membership fee renewals, and taking note of member feedback and concerns.",
    date: "June 2026",
    href: null,
    actionLabel: null,
    preview: { type: "image", src: "/images/annouscemedia1.jpeg" },
  },
  {
    id: "ann-gsp",
    badge: "Price List",
    badgeColor: "bg-emerald-100 text-emerald-700",
    Icon: Tag,
    title: "GSP Price List — Effective 1 June 2026",
    description:
      "GSP private firm price list effective from 1st June 2026. Download the full list for reference pricing on goods supplied by GSP.",
    date: "Effective 1 June 2026",
    href: "/docs/GSP%20Price%20List%20w.e.f_%201st%20Jun%202026.pdf",
    actionLabel: "Download Price List (PDF)",
    preview: { type: "pdf", src: "/docs/GSP%20Price%20List%20w.e.f_%201st%20Jun%202026.pdf" },
  },
  {
    id: "ann-2",
    badge: "New Regulation",
    badgeColor: "bg-red-100 text-red-700",
    Icon: Gavel,
    title: "Control of Supplies & Services Order 2026",
    description:
      "A new government order controlling the maximum wholesale and retail mark-up for goods in Seychelles is now in effect. Download the full order for product category details.",
    date: "May 2026",
    href: CTRL_PDF,
    actionLabel: "Download Order (PDF)",
    preview: { type: "pdf", src: CTRL_PDF },
  },
  {
    id: "ann-3",
    badge: "Retail Margin Update",
    badgeColor: "bg-orange-100 text-orange-700",
    Icon: Gavel,
    title: "Maximum Retail Margins — 2026",
    description:
      "Under the Control of Supplies & Services Order 2026, the following margins apply: Category 1 products — 15% maximum margin. Category 2 products — 18% maximum margin. Temporary measure valid until 6 March 2027.",
    date: "Valid until 6 March 2027",
    href: CTRL_PDF,
    actionLabel: "Download Full Order (PDF)",
    preview: { type: "image", src: MARGIN_IMG },
  },
  {
    id: "ann-4",
    badge: "New Resource",
    badgeColor: "bg-blue-100 text-blue-700",
    Icon: FileText,
    title: "Competition Law in Seychelles",
    description:
      "Essential guide to competition law applicable to Seychelles retailers — anti-competitive practices, fair pricing obligations, and what to do if you receive a complaint.",
    date: "May 2026",
    href: COMP_PDF,
    actionLabel: "Download Guide (PDF)",
    preview: { type: "pdf", src: COMP_PDF },
  },
  ...publicAnnouncements,
  {
    id: "ann-stc-press",
    badge: "STC Press Release",
    badgeColor: "bg-purple-100 text-purple-700",
    Icon: FileText,
    title: "STC Expands Category 1 Essential Products List",
    description:
      "STC is expanding its Category 1 product list to include pasta, juice, tea, corn flakes, liquid milk, chicken franks, long life yogurt, biscuits, baby diapers, and dishwashing paste — all at stable, affordable prices nationwide.",
    date: "20 February 2026",
    href: "/images/stcpressrelease.jpeg",
    actionLabel: "View Press Release",
    preview: { type: "image", src: "/images/stcpressrelease.jpeg" },
  },
  {
    id: "ann-stc-mrp",
    badge: "STC Price List",
    badgeColor: "bg-amber-100 text-amber-700",
    Icon: Tag,
    title: "STC Revised Category 1 MRP — Essential Products",
    description:
      "Updated Maximum Retail Prices for Category 1 essentials. Includes lentils, margarine, milk powder, salt (SCR 3.00), sugar (SCR 17.50), sunflower oil (SCR 25.60), rice, flour, pasta, juice, tea, and perishables.",
    date: "2026",
    href: "/images/stccataegoryrevised1.jpeg",
    actionLabel: "View MRP List (Food)",
    preview: { type: "image", src: "/images/stccataegoryrevised1.jpeg" },
  },
  {
    id: "ann-stc-delivery",
    badge: "STC Delivery Update",
    badgeColor: "bg-sky-100 text-sky-700",
    Icon: Truck,
    title: "STC New Delivery Schedule — Mahé Routes",
    description:
      "STC has introduced a new delivery schedule for Mahé. Tuesday & Thursday: North Mahé. Wednesday & Friday: South & Central Mahé. Orders must be placed two days prior via WhatsApp before 1:00 PM.",
    date: "2026",
    href: "/images/stc1.jpeg",
    actionLabel: "View Tue/Thu Routes",
    preview: { type: "image", src: "/images/stc1.jpeg" },
  },
];

function PreviewPanel({ preview }: Readonly<{ preview: Preview }>) {
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
  const resolved: Announcement[] = kvItems?.length
    ? kvItems.map(fromKv)
    : (items ?? announcements);

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
            <PreviewPanel preview={ann.preview} />
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
