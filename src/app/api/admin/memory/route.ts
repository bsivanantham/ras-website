import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { put, del } from "@vercel/blob";
import { getMemorials, setMemorials, appendAuditLog, type StoredMemorial } from "@/lib/kv";
import { MemorialSchema } from "@/lib/schemas";
import { isAdmin } from "@/lib/admin";
import { z } from "zod";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const strip = (s: string) => s.replace(/<[^>]*>/g, "").trim();
function toYear(v: string): number | null {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n > 1800 && n < 2200 ? n : null;
}

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
  const data = await getMemorials();
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const name = strip((formData.get("name") as string | null) ?? "");
  const shop = strip((formData.get("shop") as string | null) ?? "");
  const district = strip((formData.get("district") as string | null) ?? "");
  const tribute = strip((formData.get("tribute") as string | null) ?? "");
  const yearFrom = toYear((formData.get("yearFrom") as string | null) ?? "");
  const yearTo = toYear((formData.get("yearTo") as string | null) ?? "");

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // Poster is optional. If provided, validate and upload.
  let photoSrc: string | null = null;
  if (file && file.size > 0) {
    if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Only JPEG, PNG, or WebP images are allowed" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "File must be under 5 MB" }, { status: 400 });
    const blob = await put(`memorials/${Date.now()}-${file.name}`, file, { access: "public" });
    photoSrc = blob.url;
  }

  const existing = (await getMemorials()) ?? [];
  const memorial: StoredMemorial = {
    id: `mem-${Date.now()}`,
    name,
    shop: shop || null,
    district: district || null,
    yearFrom,
    yearTo,
    photoSrc,
    tribute: tribute || null,
    order: existing.length,
    createdAt: new Date().toISOString(),
  };

  await setMemorials([...existing, memorial]);
  await appendAuditLog({ action: "create", resource: "memorials", userId, detail: memorial.name, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true, memorial });
}

export async function PUT(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = MemorialSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = (await getMemorials()) ?? [];
  await setMemorials(existing.map((m) => (m.id === parsed.data.id ? parsed.data : m)));
  await appendAuditLog({ action: "update", resource: "memorials", userId, detail: parsed.data.name, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!z.string().min(1).safeParse(id).success) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = (await getMemorials()) ?? [];
  const target = existing.find((m) => m.id === id);
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Remove the poster from Blob storage if there is one.
  if (target.photoSrc) {
    try { await del(target.photoSrc); } catch { /* ignore if already deleted */ }
  }

  await setMemorials(existing.filter((m) => m.id !== id).map((m, i) => ({ ...m, order: i })));
  await appendAuditLog({ action: "delete", resource: "memorials", userId, detail: target.name, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
