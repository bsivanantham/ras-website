import Link from "next/link";
import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentGateProps {
  page: "resources" | "compliance" | "directory";
}

const gateContent = {
  resources: {
    title: "Full Resource Library — Members Only",
    description:
      "You're seeing a preview. Retailers Association of Seychelles members get unrestricted access to all 5 categories including forms, guides, training materials, and compliance documents.",
    bullets: [
      "20+ downloadable forms, templates & checklists",
      "Food safety, employment & licensing guides",
      "Association training workshop slide decks",
      "Member-exclusive compliance tool kit",
    ],
  },
  compliance: {
    title: "Full Compliance Hub — Members Only",
    description:
      "You're seeing one pillar. Members unlock all four compliance areas with full checklists, government links, and downloadable audit tools.",
    bullets: [
      "Food Handling Standards — full checklist",
      "Expiry Date Monitoring procedures",
      "Damaged Goods policy & templates",
      "Government contact directory",
    ],
  },
  directory: {
    title: "Full Provider Directory — Members Only",
    description:
      "You're seeing a preview. Retailers Association of Seychelles members access the complete verified directory of trusted service providers across Seychelles.",
    bullets: [
      "10+ vetted provider categories",
      "Verified contact numbers & locations",
      "Pest control, cleaning, IT, legal & more",
      "Association-endorsed providers only",
    ],
  },
};

export default function ContentGate({ page }: ContentGateProps) {
  const content = gateContent[page];

  return (
    <div className="relative">
      {/* Blurred ghost rows to hint at what's behind */}
      <div className="pointer-events-none select-none blur-sm opacity-40 mb-[-80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-28" />
          ))}
        </div>
      </div>

      {/* Gate overlay */}
      <div className="relative z-10 bg-white rounded-2xl border border-[#0D3572]/20 shadow-xl overflow-hidden mx-auto max-w-2xl">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#0D3572] via-[#C9A227] to-[#1B8A4B]" />

        <div className="p-8 text-center">
          {/* Lock icon */}
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0D3572]/10 mb-4">
            <Lock className="h-7 w-7 text-[#0D3572]" />
          </div>

          <span className="inline-block bg-[#C9A227]/20 text-[#0D3572] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Members Only
          </span>

          <h3 className="text-xl font-bold text-[#0D3572] mb-3">{content.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            {content.description}
          </p>

          {/* What's behind */}
          <ul className="text-left space-y-2 mb-8 max-w-sm mx-auto">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-[#1B8A4B] shrink-0 mt-0.5" />
                {bullet}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/join">
              <Button className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 font-bold gap-2 w-full sm:w-auto">
                Join Retailers Association of Seychelles — Get Full Access
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="border-[#0D3572]/30 text-[#0D3572] hover:bg-[#0D3572] hover:text-white w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Already a member?{" "}
            <Link href="/sign-in" className="text-[#C9A227] hover:underline">
              Sign in to unlock
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
