"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Upload, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { StoredMemorial } from "@/lib/kv";

const inputCls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
      {children}
    </div>
  );
}

const emptyForm = { name: "", shop: "", district: "", yearFrom: "", yearTo: "", tribute: "" };

export default function MemorialManager({ initial }: Readonly<{ initial: StoredMemorial[] }>) {
  const [memorials, setMemorials] = useState<StoredMemorial[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  function reset() {
    setShowForm(false); setForm(emptyForm); setFile(null); setPreview(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      showToast("error", "Only JPEG, PNG, or WebP images are allowed");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      showToast("error", "File must be under 5 MB");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      if (file) fd.append("file", file);
      fd.append("name", form.name);
      fd.append("shop", form.shop);
      fd.append("district", form.district);
      fd.append("yearFrom", form.yearFrom);
      fd.append("yearTo", form.yearTo);
      fd.append("tribute", form.tribute);
      const res = await fetch("/api/admin/memory", { method: "POST", body: fd });
      const data = await res.json() as { error?: string; memorial?: StoredMemorial };
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Save failed");
      if (data.memorial) setMemorials((prev) => [...prev, data.memorial!]);
      showToast("success", "Tribute added");
      reset();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/memory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setMemorials((prev) => prev.filter((m) => m.id !== id));
      showToast("success", "Tribute removed");
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
        <h2 className="text-lg font-bold text-[#0D3572]">In Memory ({memorials.length})</h2>
        <Button onClick={() => setShowForm(true)} className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add Tribute
        </Button>
      </div>

      {showForm && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#0D3572] text-sm font-bold flex items-center justify-between">
              Add Tribute
              <button onClick={reset}><X className="h-4 w-4 text-gray-400" /></button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Poster drop zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#0D3572]/20 rounded-xl p-6 text-center cursor-pointer hover:border-[#0D3572]/50 hover:bg-[#EFF4FF]/50 transition-colors"
            >
              {preview ? (
                <div className="relative w-full aspect-[3/4] max-h-64 mx-auto">
                  <Image src={preview} alt="Preview" fill className="object-contain rounded-lg" unoptimized />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm font-medium">Click to select a poster (optional)</p>
                  <p className="text-xs">JPEG, PNG, or WebP · max 5 MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />

            <Field label="Name (required)">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="S.A. Pillay" />
            </Field>
            <Field label="Shop">
              <input value={form.shop} onChange={(e) => setForm({ ...form, shop: e.target.value })} className={inputCls} placeholder="Santhi Avamthram" />
            </Field>
            <Field label="District">
              <input value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className={inputCls} placeholder="Baie Ste Anne, Praslin" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Year from">
                <input value={form.yearFrom} onChange={(e) => setForm({ ...form, yearFrom: e.target.value })} className={inputCls} placeholder="1958" inputMode="numeric" />
              </Field>
              <Field label="Year to">
                <input value={form.yearTo} onChange={(e) => setForm({ ...form, yearTo: e.target.value })} className={inputCls} placeholder="2026" inputMode="numeric" />
              </Field>
            </div>
            <Field label="Tribute (optional)">
              <textarea value={form.tribute} onChange={(e) => setForm({ ...form, tribute: e.target.value })} className={`${inputCls} min-h-24 resize-y`} placeholder="A few words in memory…" />
            </Field>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving || !form.name.trim()}
                className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Heart className="h-4 w-4" />{saving ? "Saving…" : "Add Tribute"}
              </Button>
              <Button variant="outline" onClick={reset} className="border-gray-200 text-gray-600">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {memorials.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Heart className="h-12 w-12" />
          <p className="text-sm font-medium">No tributes yet. Click "Add Tribute" to add the first one.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memorials.map((m) => (
          <Card key={m.id} className="bg-white border border-[#0D3572]/10 shadow-sm overflow-hidden">
            <div className="relative aspect-[3/4] bg-gray-50">
              {m.photoSrc ? (
                <Image src={m.photoSrc} alt={m.name} fill className="object-contain" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#0D3572]/50 text-2xl font-semibold">
                  {m.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("")}
                </div>
              )}
            </div>
            <CardContent className="pt-3 pb-3">
              <p className="text-xs font-semibold text-[#0D3572] line-clamp-1">{m.name}</p>
              {m.shop && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{m.shop}</p>}
              <div className="flex justify-end mt-2">
                {confirmDelete === m.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(m.id)} className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white">Confirm delete</button>
                    <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(m.id)} className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-red-500 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
