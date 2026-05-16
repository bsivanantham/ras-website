import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DirectoryClient from "./DirectoryClient";

export default async function DirectoryPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Service Directory</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trusted Service Providers</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Find vetted service providers across cleaning, pest control, refrigeration, IT, legal,
              and more — all reviewed and recommended by RAS for Seychelles retailers.{" "}
              {!isLoggedIn && <span className="text-[#C9A227] font-semibold">Join to access the full directory.</span>}
            </p>
          </div>
        </div>
      </section>

      {/* Guest banner */}
      {!isLoggedIn && (
        <div className="bg-[#C9A227]/15 border-b border-[#C9A227]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-[#0D3572]">
              <Lock className="h-4 w-4 text-[#C9A227] shrink-0" />
              <span>Previewing <strong>3 of 10 providers</strong> — members access the full directory with search, filters & verified contacts.</span>
            </div>
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

      <DirectoryClient isLoggedIn={isLoggedIn} />
    </div>
  );
}
