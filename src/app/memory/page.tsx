import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import { getMemorials } from "@/lib/kv";
import { isAdmin } from "@/lib/admin";
import MemoryClient from "./MemoryClient";

export default async function MemoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const admin = isAdmin(user);
  const kvMemorials = await getMemorials();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="h-5 w-5 text-[#C9A227]" />
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">
              Members Only
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">In Memory</h1>
          <p className="text-white/80 text-lg">
            Honouring the members we have lost. May their souls rest in eternal peace.
          </p>
        </div>
      </section>

      {/* Tributes */}
      <section className="py-10 sm:py-16 bg-[#EFF4FF] flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MemoryClient kvMemorials={kvMemorials ?? undefined} isAdmin={admin} />
        </div>
      </section>
    </div>
  );
}
