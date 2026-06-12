import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { put, del } from "@vercel/blob";
import { getGallery, setGallery, appendAuditLog } from "@/lib/kv";
import { PhotoSchema } from "@/lib/schemas";
import { isAdmin } from "@/lib/admin";
import { z } from "zod";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  if (!isAdmin(user)) return null;
  return userId;
}

export async function GET() {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data = await getGallery();
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string | null)?.trim() ?? "";
  const caption = (formData.get("caption") as string | null)?.trim() ?? "";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Only JPEG, PNG, or WebP images are allowed" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File must be under 5 MB" }, { status: 400 });
  if (!alt.trim()) return NextResponse.json({ error: "Alt text is required" }, { status: 400 });

  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, { access: "public" });

  const existing = (await getGallery()) ?? [];
  const photo = {
    id: `photo-${Date.now()}`,
    src: blob.url,
    alt: alt.replace(/<[^>]*>/g, ""),
    caption: caption.replace(/<[^>]*>/g, ""),
    order: existing.length,
    uploadedAt: new Date().toISOString(),
  };

  await setGallery([...existing, photo]);
  await appendAuditLog({ action: "create", resource: "gallery", userId, detail: photo.alt, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true, photo });
}

export async function PUT(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = PhotoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = (await getGallery()) ?? [];
  await setGallery(existing.map((p) => (p.id === parsed.data.id ? parsed.data : p)));
  await appendAuditLog({ action: "update", resource: "gallery", userId, detail: parsed.data.alt, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!z.string().min(1).safeParse(id).success) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = (await getGallery()) ?? [];
  const target = existing.find((p) => p.id === id);
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete from Blob storage
  try { await del(target.src); } catch { /* ignore if already deleted */ }

  await setGallery(existing.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i })));
  await appendAuditLog({ action: "delete", resource: "gallery", userId, detail: target.alt, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
