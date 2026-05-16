"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Show, UserButton } from "@clerk/nextjs";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SeychellesFlag from "@/components/SeychellesFlag";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/compliance", label: "Compliance" },
  { href: "/directory", label: "Directory" },
  { href: "/join", label: "Join" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D3572] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A227]">
              <ShoppingBag className="h-5 w-5 text-[#0D3572]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight tracking-wide text-white">
                Retailers Association
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <SeychellesFlag width={14} height={9} className="rounded-sm" />
                <p className="text-[10px] font-medium tracking-widest text-[#C9A227] uppercase">
                  of Seychelles
                </p>
              </div>
            </div>
            <div className="block sm:hidden">
              <p className="text-sm font-bold text-white">RAS</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: auth */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-in">
              <Link
                href="/member"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/member"
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                My Dashboard
              </Link>
              <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
            </Show>
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link href="/join">
                <Button
                  size="sm"
                  className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-semibold border-0"
                >
                  Join Now
                </Button>
              </Link>
            </Show>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D3572] px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <Show when="signed-in">
              <Link
                href="/member"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                My Dashboard
              </Link>
              <div className="px-3">
                <UserButton />
              </div>
            </Show>
            <Show when="signed-out">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link href="/join" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-semibold border-0"
                >
                  Join Now
                </Button>
              </Link>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
}
