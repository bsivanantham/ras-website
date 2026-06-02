import type { Metadata } from "next";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { ExternalLink } from "lucide-react";
import GalleryClient from "@/app/gallery/GalleryClient";
import SeychellesFlag from "@/components/SeychellesFlag";

export const metadata: Metadata = {
  title: "Media & Press Coverage",
  description:
    "Press features and news coverage of the Retailers Association of Seychelles — Seychelles Nation articles, State House meetings, and member event photos.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ras.sc" },
    { "@type": "ListItem", position: 2, name: "Media & Press Coverage", item: "https://ras.sc/media" },
  ],
};

const newsArticles = [
  {
    source: "Seychelles Nation",
    year: "2026",
    title: "RAS — 15 Years of Supporting Retail Businesses in Seychelles",
    description:
      "The Retailers Association of Seychelles was featured in the Seychelles Nation on 2 June 2026, highlighting 15 years of supporting retail businesses across Mahé, Praslin, and La Digue.",
    image: "/images/annouscemedia1.jpeg",
    href: "/docs/Retailers%2015%20years.pdf",
  },
  {
    source: "Seychelles Nation",
    year: "2023",
    title: "Retailers Association adopts La Retraite Home for the Elderly",
    description:
      "The Retailers Association has adopted the La Retraite Home for the Elderly. A memorandum of understanding (MoU) was signed between the Family department and RAS.",
    image: "https://www.nation.sc/uploads/articles/2023-02/16918_ZZyeyR3ix.jpg",
    href: "https://www.nation.sc/articles/16918/retailers-association-adopts-la-retraite-home-for-the-elderly",
  },
  {
    source: "State House",
    year: "2021",
    title: "President Ramkalawan meets members of the Retailers Association",
    description:
      "President Wavel Ramkalawan received the members of the Retailers Association for a meeting at State House.",
    image: "https://statehouse.gov.sc/uploads/news/2021/5151_QxJPE0AIx.jpg",
    href: "https://www.statehouse.gov.sc/news/5151/president-ramkalawan-meets-members-of-the-retailers-association",
  },
  {
    source: "Seychelles Nation",
    year: "2020",
    title: "Cancer Concern on Praslin receives donation",
    description:
      "The Retailers Association of Seychelles (RAS) has donated R50,000 to the Cancer Concern Association (CCA) on Praslin.",
    image: "https://www.nation.sc/uploads/articles/2020-08/5812_1jRLDLifx.jpg",
    href: "https://www.nation.sc/articles/5812/cancer-concern-on-praslin-receives-donation",
  },
  {
    source: "State House",
    year: "2019",
    title: "President Faure receives members of the Retailers Association",
    description:
      "President Danny Faure welcomed the members of the Retailers Association for a meeting at State House to discuss trade and retail matters.",
    image: "https://statehouse.gov.sc/uploads/news/2019/4626_wSJRdWg5x.jpg",
    href: "https://www.statehouse.gov.sc/news/4626/president-faure-receives-members-of-the-retailers-association",
  },
];

export default async function MediaPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  const newsArticlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Retailers Association of Seychelles Press Coverage",
    itemListElement: newsArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.description,
        image: article.image.startsWith("http") ? article.image : `https://ras.sc${article.image}`,
        url: article.href.startsWith("http") ? article.href : `https://ras.sc${article.href}`,
        datePublished: `${article.year}-01-01`,
        publisher: {
          "@type": "Organization",
          name: article.source,
        },
        about: {
          "@id": "https://ras.sc/#organization",
        },
      },
    })),
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticlesJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center">
        <Image src="/images/hero-media.jpg" alt="Camera and media journalism" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-[#0D3572]/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={420} height={280} />
        </div>
        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Media</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Retailers Association of Seychelles in the Media
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              News coverage, press features, and{" "}
              {isLoggedIn ? "event photos from the Retailers Association of Seychelles." : "public coverage from the Retailers Association of Seychelles."}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
      </section>

      {/* News Articles */}
      <section className="py-12 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-2">
            Press Coverage
          </p>
          <h2 className="text-2xl font-bold text-[#0D3572] mb-6">Retailers Association of Seychelles in the News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {newsArticles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-[#0D3572]/10 overflow-hidden hover:shadow-md transition-shadow bg-white"
              >
                {/* Image */}
                <div className="relative h-44 sm:h-52 bg-gray-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#0D3572] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {article.source}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/40 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                    {article.year}
                  </span>
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-[#0D3572] font-bold text-sm leading-snug group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-1 text-[#C9A227] text-xs font-semibold mt-1">
                    Read article <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — members only */}
      {isLoggedIn && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-2">
              Members
            </p>
            <h2 className="text-2xl font-bold text-[#0D3572] mb-6">Photo Gallery</h2>
            <GalleryClient />
          </div>
        </section>
      )}
    </div>
  );
}
