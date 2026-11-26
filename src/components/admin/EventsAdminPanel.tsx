"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import AdminBottomSheet from "./AdminBottomSheet";
import EventsEditor from "./EventsEditor";
import type { StoredEvent } from "@/lib/kv";

export default function EventsAdminPanel({ isAdmin, initial }: Readonly<{ isAdmin: boolean; initial: StoredEvent[] }>) {
  const [open, setOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#0D3572] text-white shadow-lg hover:bg-[#0a2a5e] transition-colors flex items-center justify-center"
        aria-label="Manage events"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <AdminBottomSheet open={open} onClose={() => setOpen(false)} title="Manage Events">
        <EventsEditor initial={initial} />
      </AdminBottomSheet>
    </>
  );
}
