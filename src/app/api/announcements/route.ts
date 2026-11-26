import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAnnouncements } from "@/lib/kv";

export async function GET() {
  const { userId } = await auth();
  const data = await getAnnouncements();
  if (!data) return NextResponse.json({ data: null });
  const filtered = userId ? data : data.filter((a) => a.access === "public");
  return NextResponse.json({ data: filtered });
}
