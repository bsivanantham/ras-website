import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getEvents, setEvents, appendAuditLog } from "@/lib/kv";
import { EventSchema } from "@/lib/schemas";
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
  const data = await getEvents();
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = { ...parsed.data, title: sanitize(parsed.data.title), description: sanitize(parsed.data.description), location: sanitize(parsed.data.location) };
  const existing = (await getEvents()) ?? [];
  if (existing.find((e) => e.id === item.id)) return NextResponse.json({ error: "Duplicate id" }, { status: 409 });

  await setEvents([item, ...existing]);
  await appendAuditLog({ action: "create", resource: "events", userId, detail: item.title, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = { ...parsed.data, title: sanitize(parsed.data.title), description: sanitize(parsed.data.description), location: sanitize(parsed.data.location) };
  const existing = (await getEvents()) ?? [];
  await setEvents(existing.map((e) => (e.id === item.id ? item : e)));
  await appendAuditLog({ action: "update", resource: "events", userId, detail: item.title, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!z.string().min(1).safeParse(id).success) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = (await getEvents()) ?? [];
  const target = existing.find((e) => e.id === id);
  await setEvents(existing.filter((e) => e.id !== id));
  await appendAuditLog({ action: "delete", resource: "events", userId, detail: target?.title ?? id, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
