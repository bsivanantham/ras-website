import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getProviders, setProviders, appendAuditLog } from "@/lib/kv";
import { ProviderSchema } from "@/lib/schemas";
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
  const data = await getProviders();
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = ProviderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = { ...parsed.data, name: sanitize(parsed.data.name), description: sanitize(parsed.data.description) };
  const existing = (await getProviders()) ?? [];
  if (existing.find((p) => p.id === item.id)) return NextResponse.json({ error: "Duplicate id" }, { status: 409 });

  await setProviders([item, ...existing]);
  await appendAuditLog({ action: "create", resource: "directory", userId, detail: item.name, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = ProviderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = { ...parsed.data, name: sanitize(parsed.data.name), description: sanitize(parsed.data.description) };
  const existing = (await getProviders()) ?? [];
  await setProviders(existing.map((p) => (p.id === item.id ? item : p)));
  await appendAuditLog({ action: "update", resource: "directory", userId, detail: item.name, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAdmin();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!z.string().min(1).safeParse(id).success) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = (await getProviders()) ?? [];
  const target = existing.find((p) => p.id === id);
  await setProviders(existing.filter((p) => p.id !== id));
  await appendAuditLog({ action: "delete", resource: "directory", userId, detail: target?.name ?? id, timestamp: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
