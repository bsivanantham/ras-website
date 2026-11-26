"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";

export default function HeroCTA() {
  const { isSignedIn } = useAuth();
  const { t } = useLanguage();

  if (isSignedIn) {
    return (
      <div className="flex flex-wrap gap-4">
        <Link href="/member">
          <Button
            size="lg"
            className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-bold border-0 px-8 h-12 text-base"
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/join">
        <Button
          size="lg"
          className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-bold border-0 px-8 h-12 text-base"
        >
          {t.hero.joinNow}
        </Button>
      </Link>
      <Link href="/resources">
        <Button
          size="lg"
          className="bg-transparent border border-white/60 text-white hover:bg-white/15 hover:border-white font-semibold px-8 h-12 text-base"
        >
          {t.hero.exploreResources}
        </Button>
      </Link>
    </div>
  );
}
