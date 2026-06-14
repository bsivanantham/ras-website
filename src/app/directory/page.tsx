import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getProviders } from "@/lib/kv";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import SeychellesFlag from "@/components/SeychellesFlag";
import DirectoryClient from "./DirectoryClient";

export const metadata: Metadata = {
  title: "Service Directory",
  description:
    "Find vetted service providers for Seychelles retailers — suppliers, logistics, legal, and financial services recommended by the Retailers Association of Seychelles.",
  alternates: { canonical: "https://ras.sc/directory" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ras.sc" },
    { "@type": "ListItem", position: 2, name: "Service Directory", item: "https://ras.sc/directory" },
  ],
};

export default async function DirectoryPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;
  const user = await currentUser();
  const admin = isAdmin(user);
  const kvProviders = await getProviders();

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center">
        <Image src="/images/hero-directory.jpg" alt="Seychelles tropical beach and boats" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-[#0D3572]/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={420} height={280} />
        </div>
        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Service Directory</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Service Directory</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Government departments, fire safety providers, and insurance companies — all vetted contacts for Seychelles retailers in one place.{" "}
              {!isLoggedIn && <span className="text-[#C9A227] font-semibold">Join to access the full directory.</span>}
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-white/10 rounded-full px-4 py-1.5 text-sm font-semibold">
              25 contacts
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
      </section>

      {/* Guest sign-in prompt */}
      {!isLoggedIn && (
        <div className="bg-[#C9A227]/15 border-b border-[#C9A227]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-[#0D3572]">
              Sign in to access the full directory with search and category filters.
            </p>
            <div className="flex gap-2 shrink-0">
              <Link href="/sign-in">
                <Button size="sm" variant="outline" className="border-[#0D3572]/40 text-[#0D3572]">Sign In</Button>
              </Link>
              <Link href="/join">
                <Button size="sm" className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0">Join Today</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <DirectoryClient isLoggedIn={isLoggedIn} kvProviders={kvProviders ?? undefined} isAdmin={admin} />
    </div>
  );
}
