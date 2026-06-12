"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoredProvider } from "@/lib/kv";

const DEFAULT_CATEGORIES = [
  "STC Sales",
  "Employment & Labour",
  "Health & Safety",
  "Finance & Tax",
  "Legal & Licensing",
  "Traffic",
  "Police & Emergency",
];

const EMPTY: StoredProvider = {
  id: "", name: "", category: DEFAULT_CATEGORIES[0], description: "",
  website: null, websiteHref: null, email: null, phone: null, phone2: null, email2: null,
};

const inputCls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function DirectoryEditor({ initial }: Readonly<{ initial: StoredProvider[] }>) {
  const [items, setItems] = useState<StoredProvider[]>(initial);
  const [form, setForm] = useState<StoredProvider | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const categories = Array.from(new Set([...DEFAULT_CATEGORIES, ...items.map((i) => i.category)]));

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  function setField<K extends keyof StoredProvider>(key: K, val: StoredProvider[K]) {
    setForm((f) => f ? { ...f, [key]: val } : f);
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch("/api/admin/directory", {
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
      showToast("success", editing ? "Provider updated" : "Provider added");
      setForm(null); setEditing(null);
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/directory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast("success", "Provider deleted");
    } catch {
      showToast("error", "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  const filtered = search
    ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === "success" ? "bg-[#1B8A4B] text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-[#0D3572]">Directory ({items.length} providers)</h2>
        <div className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30 w-48" />
          <Button onClick={() => { setForm({ ...EMPTY, id: `dir-${Date.now()}` }); setEditing(null); }}
            className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
            <Plus className="h-4 w-4" /> Add Provider
          </Button>
        </div>
      </div>

      {form && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#0D3572] text-sm font-bold flex items-center justify-between">
              {editing ? "Edit Provider" : "New Provider"}
              <button onClick={() => { setForm(null); setEditing(null); }}><X className="h-4 w-4 text-gray-400" /></button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name">
                <input value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputCls} placeholder="Seychelles Licensing Authority" />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={(e) => setField("category", e.target.value)} className={inputCls}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Description">
              <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={2} className={`${inputCls} resize-none`} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Website (display)">
                <input value={form.website ?? ""} onChange={(e) => setField("website", e.target.value || null)} className={inputCls} placeholder="www.example.gov.sc" />
              </Field>
              <Field label="Website URL">
                <input value={form.websiteHref ?? ""} onChange={(e) => setField("websiteHref", e.target.value || null)} className={inputCls} placeholder="https://www.example.gov.sc" />
              </Field>
              <Field label="Primary email">
                <input value={form.email ?? ""} onChange={(e) => setField("email", e.target.value || null)} className={inputCls} placeholder="contact@example.gov.sc" />
              </Field>
              <Field label="Secondary email">
                <input value={form.email2 ?? ""} onChange={(e) => setField("email2", e.target.value || null)} className={inputCls} placeholder="alt@example.gov.sc" />
              </Field>
              <Field label="Primary phone">
                <input value={form.phone ?? ""} onChange={(e) => setField("phone", e.target.value || null)} className={inputCls} placeholder="+248 4xxxxxx" />
              </Field>
              <Field label="Secondary phone">
                <input value={form.phone2 ?? ""} onChange={(e) => setField("phone2", e.target.value || null)} className={inputCls} placeholder="+248 4xxxxxx" />
              </Field>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving || !form.name.trim()}
                className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Check className="h-4 w-4" />{saving ? "Saving…" : editing ? "Update" : "Add Provider"}
              </Button>
              <Button variant="outline" onClick={() => { setForm(null); setEditing(null); }} className="border-gray-200 text-gray-600">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No providers found.</p>}
        {filtered.map((item) => (
          <Card key={item.id} className="bg-white border border-[#0D3572]/10 shadow-sm">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="font-semibold text-[#0D3572] text-sm">{item.name}</p>
                    <Badge variant="outline" className="text-[10px] text-gray-500">{item.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  {(item.email || item.phone) && (
                    <p className="text-xs text-[#1B8A4B] mt-0.5">{[item.email, item.phone].filter(Boolean).join(" · ")}</p>
                  )}
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
