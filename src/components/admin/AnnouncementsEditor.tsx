"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ICON_OPTIONS, BADGE_COLOURS, type IconKey } from "@/lib/iconMap";
import type { StoredAnnouncement } from "@/lib/kv";

const PREVIEW_TYPES = ["image", "pdf", "event"] as const;
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

const EMPTY: Omit<StoredAnnouncement, "createdAt" | "order"> = {
  id: "",
  access: "member",
  badge: "",
  badgeColorKey: "Blue",
  iconKey: "FileText" as IconKey,
  title: "",
  description: "",
  date: "",
  href: null,
  actionLabel: null,
  done: false,
  preview: { type: "image", src: "" },
};

type FormState = Omit<StoredAnnouncement, "createdAt" | "order">;

function getSaveLabel(saving: boolean, editing: string | null): string {
  if (saving) return "Saving…";
  if (editing) return "Update";
  return "Add Announcement";
}

function buildPayload(
  form: FormState,
  editing: string | null,
  items: StoredAnnouncement[]
): StoredAnnouncement {
  const existing = items.find((i) => i.id === form.id);
  return {
    ...form,
    order: editing ? (existing?.order ?? items.length) : items.length,
    createdAt: editing ? (existing?.createdAt ?? new Date().toISOString()) : new Date().toISOString(),
  };
}

type ApiErrorBody = { error?: string | { fieldErrors?: Record<string, string[]> } };
function parseApiError(data: ApiErrorBody): string {
  if (typeof data.error === "object" && data.error?.fieldErrors) {
    const msgs = Object.entries(data.error.fieldErrors)
      .map(([k, v]) => `${k}: ${v[0]}`)
      .join(", ");
    return msgs || "Validation failed";
  }
  return typeof data.error === "string" ? data.error : "Save failed";
}

function Field({ label, children, error, required }: Readonly<{ label: string; children: React.ReactNode; error?: string; required?: boolean }>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function InputCls() {
  return "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";
}

export default function AnnouncementsEditor({ initial }: Readonly<{ initial: StoredAnnouncement[] }>) {
  const [items, setItems] = useState<StoredAnnouncement[]>(initial);
  const [form, setForm] = useState<FormState | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(f: FormState): Record<string, string> {
    const e: Record<string, string> = {};
    if (!f.badge.trim()) e.badge = "Required";
    if (!f.date.trim()) e.date = "Required";
    if (!f.title.trim()) e.title = "Required";
    if (!f.description.trim()) e.description = "Required";
    if ((f.preview.type === "image" || f.preview.type === "pdf") && !f.preview.src.trim())
      e.previewSrc = "Image / PDF path is required";
    if (f.preview.type === "event") {
      if (!f.preview.day.trim()) e.previewDay = "Required";
      if (!f.preview.location.trim()) e.previewLocation = "Required";
    }
    return e;
  }

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  function openNew() {
    setForm({ ...EMPTY, id: `ann-${Date.now()}` });
    setEditing(null);
    setFieldErrors({});
  }

  function openEdit(item: StoredAnnouncement) {
    setForm({ ...item });
    setEditing(item.id);
    setFieldErrors({});
  }

  function closeForm() {
    setForm(null);
    setEditing(null);
    setFieldErrors({});
  }

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => f ? { ...f, [key]: val } : f);
    setFieldErrors((prev) => { const next = { ...prev }; delete next[key as string]; return next; });
  }

  function setPreviewField(key: string, val: string) {
    setForm((f) => {
      if (!f) return f;
      return { ...f, preview: { ...f.preview, [key]: val } as StoredAnnouncement["preview"] };
    });
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[`preview${key.charAt(0).toUpperCase()}${key.slice(1)}`];
      delete next.previewSrc;
      return next;
    });
  }

  function changePreviewType(type: "image" | "pdf" | "event") {
    setForm((f) => {
      if (!f) return f;
      const preview =
        type === "event"
          ? { type: "event" as const, month: "JAN", day: "1", location: "" }
          : { type, src: "" };
      return { ...f, preview };
    });
  }

  async function handleSave() {
    if (!form) return;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      showToast("error", "Please fill in all required fields");
      return;
    }
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const payload = buildPayload(form, editing, items);
    try {
      const res = await fetch("/api/admin/announcements", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as ApiErrorBody;
      if (!res.ok) throw new Error(parseApiError(data));
      if (editing) {
        setItems((prev) => prev.map((i) => (i.id === payload.id ? payload : i)));
      } else {
        setItems((prev) => [payload, ...prev]);
      }
      showToast("success", editing ? "Announcement updated" : "Announcement added");
      closeForm();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast("success", "Announcement deleted");
    } catch {
      showToast("error", "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  async function move(id: string, dir: "up" | "down") {
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const next = dir === "up" ? idx - 1 : idx + 1;
    if (next < 0 || next >= items.length) return;
    const updated = [...items];
    [updated[idx], updated[next]] = [updated[next], updated[idx]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setItems(reordered);
    // Persist full reordered list
    try {
      for (const item of reordered) {
        await fetch("/api/admin/announcements", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
    } catch {
      showToast("error", "Reorder failed to save");
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === "success" ? "bg-[#1B8A4B] text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0D3572]">Announcements</h2>
        <Button onClick={openNew} className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add Announcement
        </Button>
      </div>

      {/* Form */}
      {form && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#0D3572] text-sm font-bold flex items-center justify-between">
              {editing ? "Edit Announcement" : "New Announcement"}
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Badge text" required error={fieldErrors.badge}>
                <input value={form.badge} onChange={(e) => setField("badge", e.target.value)} className={InputCls()} placeholder="e.g. STC Policy Update" />
              </Field>
              <Field label="Date / deadline" required error={fieldErrors.date}>
                <input value={form.date} onChange={(e) => setField("date", e.target.value)} className={InputCls()} placeholder="e.g. Effective 15 June 2026" />
              </Field>
            </div>

            <Field label="Title" required error={fieldErrors.title}>
              <input value={form.title} onChange={(e) => setField("title", e.target.value)} className={InputCls()} placeholder="Announcement title" />
            </Field>

            <Field label="Description" required error={fieldErrors.description}>
              <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={3} className={`${InputCls()} resize-none`} placeholder="Full announcement text…" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Link URL (optional)">
                <input value={form.href ?? ""} onChange={(e) => setField("href", e.target.value || null)} className={InputCls()} placeholder="/images/notice.jpeg or /docs/file.pdf" />
              </Field>
              <Field label="Link button label (optional)">
                <input value={form.actionLabel ?? ""} onChange={(e) => setField("actionLabel", e.target.value || null)} className={InputCls()} placeholder="e.g. View Notice" />
              </Field>
            </div>

            {/* Icon picker */}
            <Field label="Icon">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ICON_OPTIONS) as IconKey[]).map((key) => {
                  const Ico = ICON_OPTIONS[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setField("iconKey", key)}
                      title={key}
                      className={`h-9 w-9 rounded-lg border-2 flex items-center justify-center transition-colors ${form.iconKey === key ? "border-[#0D3572] bg-[#EFF4FF]" : "border-gray-200 hover:border-[#0D3572]/40"}`}
                    >
                      <Ico className="h-4 w-4 text-[#0D3572]" />
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Badge colour picker */}
            <Field label="Badge colour">
              <div className="flex flex-wrap gap-2">
                {Object.entries(BADGE_COLOURS).map(([key, cls]) => {
                  const colourCls: string = cls;
                  return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setField("badgeColorKey", key)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all ${colourCls} ${form.badgeColorKey === key ? "border-[#0D3572] ring-2 ring-[#0D3572]/30" : "border-transparent"}`}
                  >
                    {key}
                  </button>
                  );
                })}
              </div>
            </Field>

            {/* Preview type */}
            <Field label="Preview type">
              <div className="flex gap-2">
                {PREVIEW_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => changePreviewType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-colors capitalize ${form.preview.type === t ? "border-[#0D3572] bg-[#EFF4FF] text-[#0D3572]" : "border-gray-200 text-gray-500 hover:border-[#0D3572]/40"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            {/* Preview fields */}
            {(form.preview.type === "image" || form.preview.type === "pdf") && (
              <Field label={form.preview.type === "image" ? "Image path or URL" : "PDF path or URL"} required error={fieldErrors.previewSrc}>
                <input value={form.preview.src} onChange={(e) => setPreviewField("src", e.target.value)} className={InputCls()} placeholder="/images/notice.jpeg" />
              </Field>
            )}
            {form.preview.type === "event" && (
              <div className="grid grid-cols-3 gap-3">
                <Field label="Month">
                  <select value={form.preview.month} onChange={(e) => setPreviewField("month", e.target.value)} className={InputCls()}>
                    {MONTHS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Day" required error={fieldErrors.previewDay}>
                  <input value={form.preview.day} onChange={(e) => setPreviewField("day", e.target.value)} className={InputCls()} placeholder="15" />
                </Field>
                <Field label="Location" required error={fieldErrors.previewLocation}>
                  <input value={form.preview.location} onChange={(e) => setPreviewField("location", e.target.value)} className={InputCls()} placeholder="Victoria, Mahé" />
                </Field>
              </div>
            )}

            <div className="flex items-center gap-6">
              <Field label="Access">
                <div className="flex gap-2 mt-1">
                  {(["member", "public"] as const).map((a) => (
                    <button key={a} type="button" onClick={() => setField("access", a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 capitalize transition-colors ${form.access === a ? "border-[#0D3572] bg-[#EFF4FF] text-[#0D3572]" : "border-gray-200 text-gray-500"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Mark as done">
                <button type="button" onClick={() => setField("done", !form.done)}
                  className={`mt-1 h-9 w-16 rounded-full border-2 transition-colors text-xs font-semibold ${form.done ? "bg-[#1B8A4B] border-[#1B8A4B] text-white" : "border-gray-300 text-gray-400"}`}>
                  {form.done ? "Yes" : "No"}
                </button>
              </Field>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving}
                className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Check className="h-4 w-4" />
                {getSaveLabel(saving, editing)}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-gray-200 text-gray-600">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No announcements yet. Click "Add Announcement" to create the first one.</p>
        )}
        {items.map((item, idx) => {
          const Ico = ICON_OPTIONS[item.iconKey as keyof typeof ICON_OPTIONS] ?? ICON_OPTIONS.FileText;
          const badgeCls = BADGE_COLOURS[item.badgeColorKey] ?? "bg-blue-100 text-blue-700";
          return (
            <Card key={item.id} className="bg-white border border-[#0D3572]/10 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0">
                    <Ico className="h-4 w-4 text-[#0D3572]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeCls}`}>{item.badge}</span>
                      <Badge variant="outline" className="text-[10px] text-gray-400">{item.access}</Badge>
                      {item.done && <Badge className="bg-[#1B8A4B] text-white text-[10px]">Done</Badge>}
                    </div>
                    <p className="font-semibold text-[#0D3572] text-sm leading-snug">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => move(item.id, "up")} disabled={idx === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Move up"><ChevronUp className="h-3.5 w-3.5 text-gray-500" /></button>
                    <button onClick={() => move(item.id, "down")} disabled={idx === items.length - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Move down"><ChevronDown className="h-3.5 w-3.5 text-gray-500" /></button>
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-[#EFF4FF]" title="Edit"><Pencil className="h-3.5 w-3.5 text-[#0D3572]" /></button>
                    {confirmDelete === item.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(item.id)} className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white hover:bg-red-700">Confirm</button>
                        <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded hover:bg-red-50" title="Delete"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
