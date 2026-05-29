import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Megaphone } from "lucide-react";

const ads = [
  {
    id: "ad-1",
    title: "Shop for Rent",
    description: "Commercial space available for rent. Contact the advertiser for more details.",
    src: "/images/WhatsApp%20Image%202026-05-29%20at%2004.47.31.jpeg",
    postedDate: "29 May 2026",
  },
];

export default async function AdvertisementsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0D3572] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-1">Members Only</p>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Megaphone className="h-7 w-7 text-[#C9A227]" />
            Advertisements
          </h1>
          <p className="text-white/70 text-sm mt-2">Member notices, rental listings, and trade announcements.</p>
        </div>
      </section>

      <section className="py-10 bg-[#EFF4FF] flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white rounded-2xl border border-[#0D3572]/10 overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={ad.src} alt={ad.title} fill className="object-contain p-2" unoptimized />
                </div>
                <div className="p-4">
                  <p className="font-bold text-[#0D3572] text-sm">{ad.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{ad.description}</p>
                  <p className="text-xs text-gray-400 mt-2">Posted: {ad.postedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
