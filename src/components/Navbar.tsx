"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Show, UserButton, useAuth, useUser } from "@clerk/nextjs";
import { LayoutDashboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SeychellesFlag from "@/components/SeychellesFlag";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const isSuperAdmin = (user?.publicMetadata as { role?: string } | undefined)?.role === "super_admin";

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/media", label: "Media" },
    { href: "/resources", label: t.nav.resources },
    { href: "/directory", label: t.nav.directory },
    ...(isSignedIn
      ? [{ href: "/members", label: "Members" }, { href: "/memory", label: "In Memory" }, { href: "/advertisements", label: "Ads" }]
      : [{ href: "/join", label: t.nav.join }]),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0D3572] text-white shadow-lg">
      {/* Main bar — logo + desktop nav + auth */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white shadow shrink-0 overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Retailers Association of Seychelles Logo"
                  width={56}
                  height={56}
                  className="rounded-full object-contain w-full h-full"
                  priority
                />
              </div>
              {/* Desktop brand */}
              <div className="hidden sm:block">
                <p className="text-base font-extrabold leading-tight tracking-wide text-white">
                  {t.nav.brand}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <SeychellesFlag width={14} height={9} className="rounded-sm" />
                  <p className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">
                    {t.nav.brandSub}
                  </p>
                </div>
              </div>
              {/* Mobile brand */}
              <div className="block sm:hidden">
                <p className="text-sm font-extrabold text-white leading-tight tracking-wide">
                  Retailers Association
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <SeychellesFlag width={13} height={9} className="rounded-sm" />
                  <p className="text-[10px] font-bold tracking-widest text-[#C9A227] uppercase">
                    of Seychelles
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth — desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Show when="signed-in">
                <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }}>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Dashboard"
                      labelIcon={<LayoutDashboard size={15} />}
                      href="/member"
                    />
                    {isSuperAdmin && (
                      <UserButton.Link
                        label="Admin Panel"
                        labelIcon={<ShieldCheck size={15} />}
                        href="/admin"
                      />
                    )}
                  </UserButton.MenuItems>
                </UserButton>
              </Show>
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link href="/join">
                  <Button
                    size="sm"
                    className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-semibold border-0"
                  >
                    {t.nav.joinNow}
                  </Button>
                </Link>
              </Show>
            </div>

            {/* Auth — mobile (always visible, no hamburger) */}
            <div className="md:hidden flex items-center gap-1.5">
              <Show when="signed-in">
                <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }}>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Dashboard"
                      labelIcon={<LayoutDashboard size={15} />}
                      href="/member"
                    />
                    {isSuperAdmin && (
                      <UserButton.Link
                        label="Admin Panel"
                        labelIcon={<ShieldCheck size={15} />}
                        href="/admin"
                      />
                    )}
                  </UserButton.MenuItems>
                </UserButton>
              </Show>
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  className="px-2.5 py-1.5 rounded-md text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link href="/join">
                  <Button
                    size="sm"
                    className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-semibold border-0 h-8 text-xs px-3"
                  >
                    {t.nav.joinNow}
                  </Button>
                </Link>
              </Show>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile nav strip — always visible, scrolls horizontally; Join omitted (button already in top bar) */}
      <div className="md:hidden border-b border-white/10 overflow-x-auto scrollbar-hide">
        <nav className="flex px-3 py-1.5 gap-1 w-max min-w-full">
          {navLinks
            .filter((link) => link.href !== "/join")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap",
                  pathname === link.href
                    ? "bg-white/20 text-white"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
