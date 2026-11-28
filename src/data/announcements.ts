import { CalendarDays, FileText, Gavel, Truck, Tag, CheckCircle, Star, PlayCircle } from "lucide-react";

export type Preview =
  | { type: "image"; src: string }
  | { type: "pdf"; src: string }
  | { type: "video"; src: string }
  | { type: "event"; month: string; day: string; location: string };

// "media" → /media "Past Announcements"; the rest are /resources category ids.
export type ArchiveTarget = "media" | "ras" | "ftc" | "stc" | "laws";

const CTRL_PDF =
  "/docs/SI%208%202026%20-%20Control%20of%20Supplies%20and%20Services%20(Maximum%20Wholesale%20and%20Retail%20Mark-up)%20Order%202026%20(1).pdf";
const COMP_PDF = "/docs/Competition-Law-in-Seychelles-148-x-210-mm-1.pdf";
const MARGIN_IMG = "/docs/WhatsApp%20Image%202026-05-17%20at%2010.43.39.jpeg";

export type Announcement = {
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
  access: "public" | "member";
  // Where it goes once it drops out of the homepage top 5. Omitted = already listed on /media or /resources.
  archive?: ArchiveTarget;
};

// Homepage carousel shows this many; older ones move to their `archive` page.
export const CAROUSEL_SIZE = 5;

// Newest first. Public visitors see `access: "public"` only; signed-in members see all.
export const announcements: Announcement[] = [
  {
    id: "ann-egm-thanks-nov2026",
    access: "public",
    archive: "media",
    badge: "Thank You",
    badgeColor: "bg-green-100 text-green-700",
    Icon: CheckCircle,
    title: "Thank You for Attending the EGM — 28 November 2026",
    description:
      "We, the Executive Committee members, would like to thank each and every member for taking the time and effort to attend the EGM today. With your support and voice, we shall strive to achieve unity with one voice.",
    date: "28 November 2026",
    href: "/images/egm-thanks-nov2026.jpg",
    actionLabel: "View Photos",
    preview: { type: "image", src: "/images/egm-thanks-nov2026.jpg" },
  },
  {
    id: "ann-egm-nov2026",
    access: "public",
    archive: "ras",
    badge: "Save the Date",
    badgeColor: "bg-red-100 text-red-700",
    Icon: CalendarDays,
    title: "Extraordinary General Meeting (EGM) — 28 November 2026",
    description:
      "All RAS Members are cordially invited to attend and actively participate in this important meeting at the STC Conference Room, Victoria. Agenda: 1. Welcome Address · 2. Proposed Separation of Liquor and Cigarette Sales from Grocery Shops · 3. Proposed 5% Pension Fund Contribution (based on the salaries of expatriates) · 4. Impact of Price Controls on Product Demand, Supply and Availability · 5. Review of the STC Retail Profit Margin on MRP Products · 6. Wholesale Business Practices (including Cash on Delivery and Single-Piece Sales to the General Public) · 7. Impact of Roadside Vendors on Licensed Retailers and Fair Competition · 8. Any Other Business (AOB) · 9. Resolutions and Agreed Course of Action · 10. Closing Remarks and Adjournment.",
    date: "Saturday, 28 November 2026 · 2:30 PM",
    href: "/images/egm-nov2026.jpg",
    actionLabel: "View Agenda",
    preview: { type: "image", src: "/images/egm-nov2026.jpg" },
  },
  {
    id: "ann-diwali-2026",
    access: "public",
    archive: "media",
    badge: "Festival Greetings",
    badgeColor: "bg-orange-100 text-orange-700",
    Icon: Star,
    title: "Happy Diwali from RAS! — 8 November 2026",
    description:
      "On the joyful occasion of Diwali, the Retailers Association of Seychelles extends its warmest wishes to all retailers, our valued customers, business partners and the entire community of Seychelles. May this Festival of Lights bring happiness, good health, prosperity and continued success to you, your business and your loved ones.",
    date: "8 November 2026",
    href: "/images/diwali-2026.jpg",
    actionLabel: "View Poster",
    preview: { type: "image", src: "/images/diwali-2026.jpg" },
  },
  {
    id: "ann-airtel-efasil-aug2026",
    access: "public",
    archive: "ras",
    badge: "Member Notice",
    badgeColor: "bg-red-100 text-red-700",
    Icon: FileText,
    title: "Airtel e-Fasil Online — Facility Update for Members",
    description:
      "Retailers who wish to use the Airtel e-Fasil online facility can now be set up through RAS. Please contact Suzanne on 2780952 — she will handle the back-end process and share your link, username and password. Together, we are stronger.",
    date: "31 August 2026",
    href: "/images/airtel-efasil-update-aug2026.jpeg",
    actionLabel: "View Notice",
    preview: { type: "image", src: "/images/airtel-efasil-update-aug2026.jpeg" },
  },
  {
    id: "ann-fht-moh-jul2026",
    access: "public",
    archive: "ras",
    badge: "Important Notice",
    badgeColor: "bg-red-100 text-red-700",
    Icon: FileText,
    title: "Food Handling Test Certificate Required — Ministry of Health",
    description:
      "All food-related shop workers must hold a Food Handling Test Certificate, valid for 2 years — this is mandatory for all food-related shops. Workers in takeaways, kitchens, restaurants and cafés must take the Food Handling Test once every 6 months. RAS kindly urges all employers and workers to comply with these Ministry of Health requirements to ensure food safety and support a healthy community. RAS met MOH on 16 July 2026 — working together for a safer and healthier Seychelles.",
    date: "16 July 2026",
    href: "/images/annouce.jpeg",
    actionLabel: "View Notice",
    preview: { type: "image", src: "/images/annouce.jpeg" },
  },
  {
    id: "ann-amsa-offer-jul2026",
    access: "public",
    archive: "ras",
    badge: "Member Benefit",
    badgeColor: "bg-purple-100 text-purple-700",
    Icon: Tag,
    title: "50% Off GP Consultations — AMSA Medical Centre Partnership",
    description:
      "Exclusive offer for RAS Certified Members & GOP holders, in partnership with AMSA Medical Centre — effective 15 July 2026. Get 50% off GP consultations (GP consultations only), GOP renewal at SCR 299, and Food Handling Test (FHT) at SCR 420. Simply present your valid RAS membership number and GOP. AMSA Medical Centre, Hassanali House, Victoria, Mahé · Tel 437 8686 · Weekdays 8:00–20:00, Weekends 8:00–16:00. Together, partnering for a healthier Seychelles.",
    date: "15 July 2026",
    href: "/images/annouce23.jpeg",
    actionLabel: "View Offer",
    preview: { type: "image", src: "/images/annouce23.jpeg" },
  },
  {
    id: "ann-video-jul2026",
    access: "public",
    // no archive: already listed on /media (Videos)
    badge: "15 Years of RAS",
    badgeColor: "bg-green-100 text-green-700",
    Icon: PlayCircle,
    title: "15 Years of RAS — Energy Saving Campaign",
    description:
      "See how the Retailers Association of Seychelles marks 15 years of supporting retail businesses — with a focus on our ongoing energy saving campaign, guiding members to reduce consumption, cut costs, and protect the nation's resources.",
    date: "July 2026",
    href: null,
    actionLabel: null,
    preview: { type: "video", src: "/images/celebration-jul2026.mp4" },
  },
  {
    id: "ann-independence-50th-2026",
    access: "public",
    archive: "media",
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
    access: "public",
    archive: "media",
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
    access: "public",
    archive: "media",
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
    access: "member",
    archive: "ras",
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
    access: "member",
    archive: "stc",
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
    access: "member",
    archive: "ras",
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
    access: "member",
    // no archive: already listed on /media (Press Coverage)
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
    access: "member",
    archive: "ftc",
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
    access: "member",
    archive: "ras",
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
    access: "member",
    // no archive: already listed on /resources (Laws & Regulations)
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
    access: "member",
    // no archive: already listed on /resources (Laws & Regulations)
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
    access: "member",
    archive: "laws",
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
    access: "member",
    // no archive: already listed on /resources (Laws & Regulations)
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
  {
    id: "ann-energy",
    access: "public",
    archive: "ras",
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
  {
    id: "ann-stc-press",
    access: "member",
    // no archive: already listed on /resources (STC Notices)
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
    access: "member",
    // no archive: already listed on /resources (STC Notices)
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
    access: "member",
    // no archive: already listed on /resources (STC Notices)
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

export const publicAnnouncements = announcements.filter((a) => a.access === "public");

// Announcements tagged for `target` that are no longer in this viewer's carousel.
export function archivedAnnouncements(target: ArchiveTarget, isLoggedIn: boolean): Announcement[] {
  const shown = (isLoggedIn ? announcements : publicAnnouncements).slice(0, CAROUSEL_SIZE);
  return announcements.filter((a) => a.archive === target && !shown.includes(a));
}
