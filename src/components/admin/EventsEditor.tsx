"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoredEvent } from "@/lib/kv";

const EMPTY: StoredEvent = { id: "", title: "", date: "", location: "", description: "", status: "upcoming" };

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";

export default function EventsEditor({ initial }: Readonly<{ initial: StoredEvent[] }>) {
  const [items, setItems] = useState<StoredEvent[]>(initial);
  const [form, setForm] = useState<StoredEvent | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  function setField<K extends keyof StoredEvent>(key: K, val: StoredEvent[K]) {
    setForm((f) => f ? { ...f, [key]: val } : f);
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Save failed");
      if (editing) {
        setItems((prev) => prev.map((i) => (i.id === form.id ? form : i)));
      } else {
        setItems((prev) => [form, ...prev]);
      }
      showToast("success", editing ? "Event updated" : "Event added");
      setForm(null); setEditing(null);
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast("success", "Event deleted");
    } catch {
      showToast("error", "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === "success" ? "bg-[#1B8A4B] text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0D3572]">Events</h2>
        <Button onClick={() => { setForm({ ...EMPTY, id: `ev-${Date.now()}` }); setEditing(null); }}
          className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {form && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#0D3572] text-sm font-bold flex items-center justify-between">
              {editing ? "Edit Event" : "New Event"}
              <button onClick={() => { setForm(null); setEditing(null); }}><X className="h-4 w-4 text-gray-400" /></button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <Field label="Title">
              <input value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} placeholder="Event title" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date">
                <input value={form.date} onChange={(e) => setField("date", e.target.value)} className={inputCls} placeholder="e.g. Jun 15, 2026" />
              </Field>
              <Field label="Location">
                <input value={form.location} onChange={(e) => setField("location", e.target.value)} className={inputCls} placeholder="Victoria, Mahé" />
              </Field>
            </div>
            <Field label="Description">
              <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </Field>
            <Field label="Status">
              <div className="flex gap-2 mt-1">
                {(["upcoming", "done"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setField("status", s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 capitalize transition-colors ${form.status === s ? "border-[#0D3572] bg-[#EFF4FF] text-[#0D3572]" : "border-gray-200 text-gray-500"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving || !form.title.trim() || !form.date.trim()}
                className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Check className="h-4 w-4" />{saving ? "Saving…" : editing ? "Update" : "Add Event"}
              </Button>
              <Button variant="outline" onClick={() => { setForm(null); setEditing(null); }} className="border-gray-200 text-gray-600">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No events yet.</p>}
        {items.map((item) => (
          <Card key={item.id} className="bg-white border border-[#0D3572]/10 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge className={item.status === "upcoming" ? "bg-[#0D3572] text-white text-[10px]" : "bg-gray-200 text-gray-600 text-[10px]"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="font-semibold text-[#0D3572] text-sm">{item.title}</p>
                  <p className="text-xs text-[#1B8A4B] font-medium mt-0.5">{item.date} · {item.location}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => { setForm({ ...item }); setEditing(item.id); }} className="p-1.5 rounded hover:bg-[#EFF4FF]"><Pencil className="h-3.5 w-3.5 text-[#0D3572]" /></button>
                  {confirmDelete === item.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(item.id)} className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white">Confirm</button>
                      <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
