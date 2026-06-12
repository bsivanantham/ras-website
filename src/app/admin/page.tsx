import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";
import { getAuditLog } from "@/lib/kv";
import { Megaphone, Calendar, BookOpen, Image, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { href: "/admin/announcements", label: "Announcements", Icon: Megaphone, desc: "Add, edit, or remove homepage announcements and notices." },
  { href: "/admin/events", label: "Events", Icon: Calendar, desc: "Manage upcoming and past events shown in the member dashboard." },
  { href: "/admin/directory", label: "Directory", Icon: BookOpen, desc: "Add or update government and service provider contacts." },
  { href: "/admin/gallery", label: "Gallery", Icon: Image, desc: "Upload photos to the members-only gallery." },
];

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!isAdmin(user)) redirect("/member");

  const auditLog = await getAuditLog();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0D3572]">Admin Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.firstName ?? "Admin"}. What would you like to update?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map(({ href, label, Icon, desc }) => (
          <Link key={href} href={href}>
            <Card className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md hover:border-[#0D3572]/30 transition-all h-full cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#0D3572] font-bold text-sm flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center">
                    <Icon className="h-4 w-4 text-[#0D3572]" />
                  </div>
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Audit log */}
      <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-[#0D3572] font-bold text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#C9A227]" />
            Recent Changes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {auditLog.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">No changes yet — edits will appear here.</p>
          ) : (
            <ul className="space-y-2">
              {auditLog.map((entry, i) => (
                <li key={i} className="flex items-start gap-3 text-xs">
                  <div className="h-6 w-6 rounded-full bg-[#EFF4FF] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3 w-3 text-[#0D3572]" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D3572] capitalize">{entry.action}</span>
                    <span className="text-gray-500"> · {entry.resource} · {entry.detail}</span>
                    <p className="text-gray-400 mt-0.5">{new Date(entry.timestamp).toLocaleString("en-SC", { timeZone: "Indian/Mahe" })}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
