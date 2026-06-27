import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import { getNewsletters, setNewsletters } from "@/lib/kv";
import type { StoredNewsletter } from "@/lib/kv";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  return isAdmin(user) ? user : null;
}

export async function GET() {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const newsletters = (await getNewsletters()) ?? [];
  return NextResponse.json(newsletters);
}

export async function POST(req: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json() as Partial<StoredNewsletter>;
  if (!body.title?.trim() || !body.date?.trim() || !body.summary?.trim()) {
    return NextResponse.json({ error: "title, date, and summary are required" }, { status: 400 });
  }
  const newsletters = (await getNewsletters()) ?? [];
  const entry: StoredNewsletter = {
    id: body.id ?? `nl-${Date.now()}`,
    title: body.title.trim(),
    date: body.date.trim(),
    summary: body.summary.trim(),
    pdfUrl: body.pdfUrl ?? null,
    sentAt: null,
    createdAt: new Date().toISOString(),
  };
  await setNewsletters([entry, ...newsletters]);
  return NextResponse.json(entry, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json() as Partial<StoredNewsletter>;
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const newsletters = (await getNewsletters()) ?? [];
  const updated = newsletters.map((n) =>
    n.id === body.id ? { ...n, ...body } : n
  );
  await setNewsletters(updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await req.json() as { id: string };
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const newsletters = (await getNewsletters()) ?? [];
  await setNewsletters(newsletters.filter((n) => n.id !== id));
  return NextResponse.json({ ok: true });
}
