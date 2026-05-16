import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Shield,
  Calendar,
  CheckCircle,
  Bell,
  Users,
  ArrowRight,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsletters = [
  {
    id: "nl-1",
    title: "RAS Newsletter — April 2026",
    date: "April 15, 2026",
    summary:
      "Public Health Authority inspection updates, new waste disposal guidelines, and member spotlight on CoolMart Victoria.",
  },
  {
    id: "nl-2",
    title: "RAS Newsletter — March 2026",
    date: "March 15, 2026",
    summary:
      "Trade licence renewal reminder, pest control compliance tips, and summary of the March member meeting.",
  },
  {
    id: "nl-3",
    title: "RAS Newsletter — February 2026",
    date: "February 15, 2026",
    summary:
      "New food labelling requirements from Seychelles Bureau of Standards, and a Q&A with the Labour Commissioner's Office.",
  },
];

const events = [
  {
    id: "ev-1",
    title: "RAS Annual General Meeting 2026",
    date: "June 12, 2026",
    location: "Victoria, Mahé",
    description: "Annual member meeting to review 2025/26 activities and elect the 2027 committee.",
  },
  {
    id: "ev-2",
    title: "Food Safety Compliance Workshop",
    date: "May 28, 2026",
    location: "RAS Office, Bois De Rose Avenue",
    description:
      "Hands-on workshop covering the latest Public Health Authority food handling standards.",
  },
];

const quickLinks = [
  { href: "/resources", icon: BookOpen, label: "Resource Library", desc: "Laws, guides & forms" },
  { href: "/compliance", icon: Shield, label: "Compliance Hub", desc: "Checklists & standards" },
  { href: "/directory", icon: Users, label: "Service Directory", desc: "Vetted providers" },
  { href: "/contact", icon: FileText, label: "Contact RAS", desc: "Get support" },
];

export default async function MemberPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const firstName = user?.firstName ?? "Member";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member";

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
            {/* Main content — 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Newsletters */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#C9A227]" />
                      Recent Newsletters
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#C9A227] hover:text-[#b8911f] hover:bg-[#C9A227]/10 text-xs gap-1"
                    >
                      View all
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {newsletters.map((nl) => (
                    <div
                      key={nl.id}
                      className="flex items-start justify-between gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-[#0D3572] text-sm">{nl.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{nl.date}</p>
                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{nl.summary}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 border-[#0D3572]/20 text-[#0D3572] hover:bg-[#0D3572] hover:text-white gap-1.5 text-xs"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Resource Links */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#C9A227]" />
                    My Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {quickLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-[#0D3572]/10 hover:border-[#0D3572]/30 hover:bg-[#EFF4FF] transition-colors group">
                          <div className="h-9 w-9 rounded-lg bg-[#0D3572]/10 flex items-center justify-center shrink-0">
                            <link.icon className="h-4 w-4 text-[#0D3572]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#0D3572] group-hover:text-[#C9A227] transition-colors">
                              {link.label}
                            </p>
                            <p className="text-xs text-gray-500">{link.desc}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
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
                  {events.map((event) => (
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
                        <p className="text-xs text-[#1B8A4B] font-medium mt-0.5">
                          {event.location}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar — 1 column */}
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
                    <p className="text-white/60 text-xs uppercase tracking-wide">Member Since</p>
                    <p className="text-white font-semibold text-sm mt-1">January 2026</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Tier</p>
                    <p className="text-white font-semibold text-sm mt-1">Annual Membership</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Renewal Due</p>
                    <p className="text-white font-semibold text-sm mt-1">January 2027</p>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <Link href="/contact">
                      <Button
                        size="sm"
                        className="w-full bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] border-0 font-semibold text-xs"
                      >
                        Contact RAS
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-[#0D3572] font-bold flex items-center gap-2 text-base">
                    <Shield className="h-5 w-5 text-[#C9A227]" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {[
                    { label: "Health & Safety", status: "green" },
                    { label: "Food Handling", status: "green" },
                    { label: "Expiry Monitoring", status: "amber" },
                    { label: "Pest Control Cert.", status: "green" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold ${
                          item.status === "green"
                            ? "text-[#1B8A4B]"
                            : "text-[#C9A227]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.status === "green" ? "bg-[#1B8A4B]" : "bg-[#C9A227]"
                          }`}
                        />
                        {item.status === "green" ? "OK" : "Review"}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <Link href="/compliance">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-[#0D3572]/20 text-[#0D3572] hover:bg-[#0D3572] hover:text-white text-xs"
                      >
                        Full Compliance Hub
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Help card */}
              <Card className="bg-[#1B8A4B]/10 border border-[#1B8A4B]/20 shadow-sm">
                <CardContent className="pt-5 pb-5">
                  <CardDescription className="text-gray-700 text-sm leading-relaxed mb-3">
                    Need help or have a compliance question? Our team is available Monday to
                    Friday, 8:30 AM – 4:30 PM.
                  </CardDescription>
                  <a href="tel:+2484323343">
                    <Button
                      size="sm"
                      className="w-full bg-[#1B8A4B] text-white hover:bg-[#166d3a] border-0 font-semibold text-xs"
                    >
                      Call +248 4 323 343
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
