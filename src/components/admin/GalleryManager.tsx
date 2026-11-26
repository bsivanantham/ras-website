"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { StoredPhoto } from "@/lib/kv";

const inputCls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30";

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function GalleryManager({ initial }: Readonly<{ initial: StoredPhoto[] }>) {
  const [photos, setPhotos] = useState<StoredPhoto[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
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

  async function handleUpload() {
    if (!file || !alt.trim()) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", alt);
      fd.append("caption", caption);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      const data = await res.json() as { error?: string; photo?: StoredPhoto };
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Upload failed");
      if (data.photo) setPhotos((prev) => [...prev, data.photo!]);
      showToast("success", "Photo uploaded");
      setShowForm(false); setFile(null); setPreview(null); setAlt(""); setCaption("");
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      showToast("success", "Photo deleted");
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
        <h2 className="text-lg font-bold text-[#0D3572]">Gallery ({photos.length} photos)</h2>
        <Button onClick={() => setShowForm(true)} className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
          <Plus className="h-4 w-4" /> Upload Photo
        </Button>
      </div>

      {showForm && (
        <Card className="bg-white border-2 border-[#0D3572]/20 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#0D3572] text-sm font-bold flex items-center justify-between">
              Upload New Photo
              <button onClick={() => { setShowForm(false); setFile(null); setPreview(null); setAlt(""); setCaption(""); }}><X className="h-4 w-4 text-gray-400" /></button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Drop zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#0D3572]/20 rounded-xl p-6 text-center cursor-pointer hover:border-[#0D3572]/50 hover:bg-[#EFF4FF]/50 transition-colors"
            >
              {preview ? (
                <div className="relative w-full aspect-video max-h-48 mx-auto">
                  <Image src={preview} alt="Preview" fill className="object-contain rounded-lg" unoptimized />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm font-medium">Click to select a photo</p>
                  <p className="text-xs">JPEG, PNG, or WebP · max 5 MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />

            <Field label="Alt text (describes the photo for accessibility)">
              <input value={alt} onChange={(e) => setAlt(e.target.value)} className={inputCls} placeholder="RAS Committee Meeting 2026" />
            </Field>
            <Field label="Caption (shown below photo)">
              <input value={caption} onChange={(e) => setCaption(e.target.value)} className={inputCls} placeholder="Executive Committee Meeting — 20 May 2026" />
            </Field>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleUpload} disabled={uploading || !file || !alt.trim()}
                className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm">
                <Upload className="h-4 w-4" />{uploading ? "Uploading…" : "Upload Photo"}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setFile(null); setPreview(null); setAlt(""); setCaption(""); }} className="border-gray-200 text-gray-600">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {photos.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <ImageIcon className="h-12 w-12" />
          <p className="text-sm font-medium">No photos yet. Click "Upload Photo" to add the first one.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="bg-white border border-[#0D3572]/10 shadow-sm overflow-hidden">
            <div className="relative aspect-video bg-gray-50">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" unoptimized />
            </div>
            <CardContent className="pt-3 pb-3">
              <p className="text-xs font-semibold text-[#0D3572] line-clamp-1">{photo.alt}</p>
              {photo.caption && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{photo.caption}</p>}
              <div className="flex justify-end mt-2">
                {confirmDelete === photo.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(photo.id)} className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white">Confirm delete</button>
                    <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(photo.id)} className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-red-500 hover:bg-red-50">
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
