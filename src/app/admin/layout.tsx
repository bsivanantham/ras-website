import Link from "next/link";
import { Megaphone, Calendar, BookOpen, Image, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/announcements", label: "Announcements", Icon: Megaphone },
  { href: "/admin/events", label: "Events", Icon: Calendar },
  { href: "/admin/directory", label: "Directory", Icon: BookOpen },
  { href: "/admin/gallery", label: "Gallery", Icon: Image },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen bg-[#EFF4FF]">
      {/* Admin top bar */}
      <div className="bg-[#0D3572] text-white px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#C9A227] font-bold text-sm uppercase tracking-widest">RAS Admin</span>
        </div>
        <Link href="/" className="text-white/60 hover:text-white text-xs transition-colors">
          ← Back to website
        </Link>
      </div>

      {/* Nav tabs */}
      <div className="bg-white border-b border-[#0D3572]/10 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 py-1">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-[#0D3572] hover:bg-[#EFF4FF] rounded-lg transition-colors whitespace-nowrap"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
