"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Upload, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { StoredNewsletter } from "@/lib/kv";

function InputCls() {
  return "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";
}

type FormState = { id: string; title: string; date: string; summary: string; pdfUrl: string };

const EMPTY: FormState = { id: "", title: "", date: "", summary: "", pdfUrl: "" };

export default function NewsletterEditor({ initial }: Readonly<{ initial: StoredNewsletter[] }>) {
  const [items, setItems] = useState<StoredNewsletter[]>(initial);
  const [form, setForm] = useState<FormState | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmSend, setConfirmSend] = useState<string | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const pdfUploadRef = useRef<HTMLInputElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  function openNew() {
    setForm({ ...EMPTY, id: `nl-${Date.now()}` });
    setFieldErrors({});
  }

  function closeForm() {
    setForm(null);
    setFieldErrors({});
  }

  function validate(f: FormState): Record<string, string> {
    const e: Record<string, string> = {};
    if (!f.title.trim()) e.title = "Required";
    if (!f.date.trim()) e.date = "Required";
    if (!f.summary.trim()) e.summary = "Required";
    return e;
  }

  async function handlePdfUpload(file: File) {
    setUploadingPdf(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setForm((f) => f ? { ...f, pdfUrl: data.url! } : f);
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingPdf(false);
    }
  }

  async function handleSave() {
    if (!form) return;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      showToast("error", "Fill in all required fields");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pdfUrl: form.pdfUrl || null }),
      });
      const data = await res.json() as StoredNewsletter;
      if (!res.ok) throw new Error("Save failed");
      setItems((prev) => [data, ...prev]);
      showToast("success", "Newsletter saved");
      closeForm();
    } catch {
      showToast("error", "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/newsletters", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((n) => n.id !== id));
      showToast("success", "Deleted");
    } catch {
      showToast("error", "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  async function handleSend(id: string) {
    setSending(id);
    setConfirmSend(null);
    try {
      const res = await fetch("/api/admin/newsletters/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json() as { ok?: boolean; sent?: number; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Send failed");
      const sentAt = new Date().toISOString();
      setItems((prev) => prev.map((n) => n.id === id ? { ...n, sentAt } : n));
      showToast("success", `Sent to ${data.sent} members`);
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Send failed");
    } finally {
      setSending(null);
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
        <h2 className="text-lg font-bold text-[#0D3572]">Newsletters</h2>
        <Button onClick={openNew} className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
          <Plus className="h-4 w-4" /> New Newsletter
        </Button>
      </div>

      {form && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#0D3572]">New Newsletter</p>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => { setForm((f) => f ? { ...f, title: e.target.value } : f); setFieldErrors((p) => { const n = { ...p }; delete n.title; return n; }); }}
                className={InputCls()}
                placeholder="e.g. June 2026 Member Update"
              />
              {fieldErrors.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                value={form.date}
                onChange={(e) => { setForm((f) => f ? { ...f, date: e.target.value } : f); setFieldErrors((p) => { const n = { ...p }; delete n.date; return n; }); }}
                className={InputCls()}
                placeholder="e.g. June 27, 2026"
              />
              {fieldErrors.date && <p className="text-xs text-red-500 mt-1">{fieldErrors.date}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.summary}
                onChange={(e) => { setForm((f) => f ? { ...f, summary: e.target.value } : f); setFieldErrors((p) => { const n = { ...p }; delete n.summary; return n; }); }}
                rows={4}
                className={`${InputCls()} resize-none`}
                placeholder="Write the newsletter message that will be emailed to all members…"
              />
              {fieldErrors.summary && <p className="text-xs text-red-500 mt-1">{fieldErrors.summary}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">PDF attachment (optional)</label>
              <div className="flex gap-2 items-center">
                <input
                  value={form.pdfUrl}
                  onChange={(e) => setForm((f) => f ? { ...f, pdfUrl: e.target.value } : f)}
                  className={`${InputCls()} flex-1`}
                  placeholder="https://… or upload →"
                />
                <input
                  ref={pdfUploadRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) { void handlePdfUpload(f); } e.target.value = ""; }}
                />
                <button
                  type="button"
                  onClick={() => pdfUploadRef.current?.click()}
                  disabled={uploadingPdf}
                  className="shrink-0 h-[38px] px-3 rounded-lg border-2 border-dashed border-[#0D3572]/40 text-[#0D3572] text-xs font-semibold flex items-center gap-1.5 hover:border-[#0D3572] hover:bg-[#EFF4FF] disabled:opacity-50 transition-colors touch-manipulation"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {uploadingPdf ? "Uploading…" : "Upload"}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving} className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Check className="h-4 w-4" />
                {saving ? "Saving…" : "Save Newsletter"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-gray-200 text-gray-600">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No newsletters yet.</p>
        )}
        {items.map((nl) => (
          <Card key={nl.id} className="bg-white border border-[#0D3572]/10 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-[#0D3572]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0D3572] text-sm leading-snug">{nl.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{nl.date}</p>
                  {nl.sentAt && (
                    <p className="text-xs text-[#1B8A4B] font-medium mt-0.5">
                      Sent {new Date(nl.sentAt).toLocaleDateString("en-SC", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {confirmSend === nl.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => void handleSend(nl.id)} className="px-2 py-1 rounded text-xs font-semibold bg-[#0D3572] text-white hover:bg-[#0a2a5e]">Send now</button>
                      <button onClick={() => setConfirmSend(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmSend(nl.id)}
                      disabled={sending === nl.id}
                      className="p-1.5 rounded hover:bg-[#EFF4FF] disabled:opacity-50"
                      title={nl.sentAt ? "Resend to all members" : "Send to all members"}
                    >
                      <Send className={`h-3.5 w-3.5 ${sending === nl.id ? "text-gray-300" : "text-[#0D3572]"}`} />
                    </button>
                  )}
                  {confirmDelete === nl.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => void handleDelete(nl.id)} className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white">Confirm</button>
                      <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(nl.id)} className="p-1.5 rounded hover:bg-red-50" title="Delete">
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </button>
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
