import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getAnnouncements, setAnnouncements, appendAuditLog } from "@/lib/kv";
import { AnnouncementSchema } from "@/lib/schemas";
import { isAdmin } from "@/lib/admin";
import { z } from "zod";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  if (!isAdmin(user)) return null;
  return userId;
}

function sanitize(s: string) {
  return s.replace(/<[^>]*>/g, "").trim();
}

export async function GET() {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data = await getAnnouncements();
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = AnnouncementSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = {
    ...parsed.data,
    title: sanitize(parsed.data.title),
    description: sanitize(parsed.data.description),
    badge: sanitize(parsed.data.badge),
    date: sanitize(parsed.data.date),
  };

  const existing = (await getAnnouncements()) ?? [];
  if (existing.find((a) => a.id === item.id)) {
    return NextResponse.json({ error: "Duplicate id" }, { status: 409 });
  }
  const updated = [item, ...existing];
  await setAnnouncements(updated);
  await appendAuditLog({ action: "create", resource: "announcements", userId, detail: item.title, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = AnnouncementSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = {
    ...parsed.data,
    title: sanitize(parsed.data.title),
    description: sanitize(parsed.data.description),
    badge: sanitize(parsed.data.badge),
    date: sanitize(parsed.data.date),
  };

  const existing = (await getAnnouncements()) ?? [];
  const updated = existing.map((a) => (a.id === item.id ? item : a));
  await setAnnouncements(updated);
  await appendAuditLog({ action: "update", resource: "announcements", userId, detail: item.title, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!z.string().min(1).safeParse(id).success) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = (await getAnnouncements()) ?? [];
  const target = existing.find((a) => a.id === id);
  const updated = existing.filter((a) => a.id !== id);
  await setAnnouncements(updated);
  await appendAuditLog({ action: "delete", resource: "announcements", userId, detail: target?.title ?? id, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
