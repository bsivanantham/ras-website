import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import MembersClient from "./MembersClient";
import { members } from "@/data/members";

export default async function MembersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
              Member Directory
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              RAS Members
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {members.length} registered retail members across Mahé, Praslin, and La Digue.
              Search by shop name, owner, or location.
            </p>
          </div>
        </div>
      </section>

      {/* Members list */}
      <section className="py-10 bg-[#EFF4FF] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-[#0D3572]" />
            <h2 className="text-lg font-bold text-[#0D3572]">All Members</h2>
          </div>
          <MembersClient />
        </div>
      </section>
    </div>
  );
}
