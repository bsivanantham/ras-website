import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getEvents } from "@/lib/kv";
import type { StoredEvent } from "@/lib/kv";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  Bell,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotifyButton from "@/components/NotifyButton";
import EventsAdminPanel from "@/components/admin/EventsAdminPanel";


const FALLBACK_EVENTS: StoredEvent[] = [
  { id: "ev-1", title: "Executive Committee Meeting — May 2026", date: "May 20, 2026", location: "Victoria, Mahé", description: "Executive Committee meeting for May 2026 and handing over of documents. Meeting successfully held.", status: "done" },
  { id: "ev-2", title: "Handing Over of Documents", date: "May 20, 2026", location: "Victoria, Mahé", description: "Official handing over of documents. Committee members were present.", status: "done" },
  { id: "ev-3", title: "FTC Meeting — RRP Clarification", date: "Jun 1, 2026", location: "Victoria, Mahé", description: "Meeting with the Fair Trading Commission regarding RRP clarification, SIBA-related issues, and STC case updates.", status: "done" },
  { id: "ev-4", title: "SACOS Insurance Meeting", date: "Jun 3, 2026", location: "Victoria, Mahé", description: "Meeting with SACOS Insurance to discuss possible insurance benefits and support packages for RAS members.", status: "upcoming" },
];


export default async function MemberPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const firstName = user?.firstName ?? "Member";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member";
  const events = (await getEvents()) ?? FALLBACK_EVENTS;
  const userIsAdmin = isAdmin(user);

  return (
    <div className="flex flex-col">
      {/* Welcome banner */}
      <section className="bg-[#0D3572] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-1">
                Member Dashboard
              </p>
              <h1 className="text-3xl font-bold">Welcome back, {firstName}!</h1>
              <p className="text-white/70 text-sm mt-1">
                You are signed in as <span className="text-white">{fullName}</span>
              </p>
            </div>
            <Badge className="bg-[#1B8A4B] text-white text-sm px-3 py-1.5 self-start">
              Active Member
            </Badge>
          </div>
        </div>
      </section>

      {/* Dashboard grid */}
      <section className="py-10 bg-[#EFF4FF] flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content — newsletters + events */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Newsletters */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#C9A227]" />
                    Recent Newsletters
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                    <Bell className="h-8 w-8 text-gray-200" />
                    <p className="text-sm font-medium text-gray-400">No newsletters yet</p>
                    <p className="text-xs text-gray-400">
                      Newsletters will appear here when published by Retailers Association of Seychelles.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#C9A227]" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {events.filter((e) => e.status === "upcoming").map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col items-center justify-start shrink-0 w-12">
                        <div className="bg-[#0D3572] rounded-lg px-2 py-1 text-center w-full">
                          <p className="text-[#C9A227] text-xs font-bold leading-tight">
                            {event.date.split(" ")[0].toUpperCase().slice(0, 3)}
                          </p>
                          <p className="text-white text-base font-bold leading-tight">
                            {event.date.split(" ")[1].replace(",", "")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D3572] text-sm">{event.title}</p>
                        <p className="text-xs text-[#1B8A4B] font-medium mt-0.5">{event.location}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Past Events */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1B8A4B]" />
                    Past Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {events.filter((e) => e.status === "done").map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0 opacity-70"
                    >
                      <div className="flex flex-col items-center justify-start shrink-0 w-12">
                        <div className="bg-gray-200 rounded-lg px-2 py-1 text-center w-full">
                          <p className="text-gray-500 text-xs font-bold leading-tight">
                            {event.date.split(" ")[0].toUpperCase().slice(0, 3)}
                          </p>
                          <p className="text-gray-600 text-base font-bold leading-tight">
                            {event.date.split(" ")[1].replace(",", "")}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-500 text-sm">{event.title}</p>
                          <Badge className="bg-[#1B8A4B] text-white text-[10px] px-1.5 py-0.5 h-auto">Done</Badge>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{event.location}</p>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Membership card */}
              <Card className="bg-[#0D3572] text-white border-0 shadow-sm">
                <CardHeader className="border-b border-white/20">
                  <CardTitle className="text-white font-bold flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#C9A227]" />
                    Your Membership
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-[#1B8A4B]" />
                      <span className="text-white font-semibold text-sm">Active</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Tier</p>
                    <p className="text-white font-semibold text-sm mt-1">Annual — SCR 500</p>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <Link href="/contact">
                      <Button
                        size="sm"
                        className="w-full bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] border-0 font-semibold text-xs"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>


              {userIsAdmin && <NotifyButton />}

              {/* Help card */}
              <Card className="bg-[#1B8A4B]/10 border border-[#1B8A4B]/20 shadow-sm">
                <CardContent className="pt-5 pb-5">
                  <CardDescription className="text-gray-700 text-sm leading-relaxed mb-3">
                    Need help or have a compliance question? Our team is available Monday to
                    Friday, 8:30 AM – 4:30 PM.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-3 text-sm font-semibold text-[#1B8A4B]">
                    <a href="tel:+2482521500" className="hover:underline">+248 2 521 500</a>
                    <span className="text-gray-400">/</span>
                    <a href="tel:+2482737273" className="hover:underline">+248 2 737 273</a>
                    <span className="text-gray-400">/</span>
                    <a href="tel:+2482819678" className="hover:underline">+248 281 96 78</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <EventsAdminPanel isAdmin={userIsAdmin} initial={events} />
    </div>
  );
}
