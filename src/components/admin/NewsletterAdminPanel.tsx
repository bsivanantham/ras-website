"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import AdminBottomSheet from "@/components/admin/AdminBottomSheet";
import NewsletterEditor from "@/components/admin/NewsletterEditor";
import type { StoredNewsletter } from "@/lib/kv";

export default function NewsletterAdminPanel({
  isAdmin,
  initial,
}: Readonly<{ isAdmin: boolean; initial: StoredNewsletter[] }>) {
  const [open, setOpen] = useState(false);
  if (!isAdmin) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full bg-[#C9A227] text-[#0D3572] shadow-lg hover:bg-[#b8911f] transition-colors flex items-center justify-center"
        aria-label="Manage newsletters"
      >
        <Mail className="h-5 w-5" />
      </button>
      <AdminBottomSheet open={open} onClose={() => setOpen(false)} title="Newsletters">
        <NewsletterEditor initial={initial} />
      </AdminBottomSheet>
    </>
  );
}
