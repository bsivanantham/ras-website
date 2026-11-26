import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { isAdmin } from "@/lib/admin";
import { getNewsletters, setNewsletters } from "@/lib/kv";

function newsletterHtml(title: string, date: string, summary: string, pdfUrl: string | null): string {
  const pdfButton = pdfUrl
    ? `<a href="${pdfUrl}" style="display:inline-block;background:#C9A227;color:#0D3572;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:14px;margin-top:8px;">View / Download PDF</a>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#EFF4FF;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0D3572;padding:28px 32px;text-align:center;">
      <p style="color:#C9A227;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px 0;">Retailers Association of Seychelles</p>
      <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.3;">${title}</h1>
    </div>
    <div style="padding:32px;">
      <p style="color:#999;font-size:12px;margin:0 0 20px 0;">${date}</p>
      <p style="color:#333;font-size:15px;line-height:1.75;margin:0 0 28px 0;">${summary}</p>
      ${pdfButton}
    </div>
    <div style="background:#EFF4FF;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="color:#999;font-size:11px;margin:0;line-height:1.6;">
        You're receiving this because you are a registered member of the Retailers Association of Seychelles.<br/>
        admin@ras.sc &nbsp;|&nbsp; +248 2 521 500 &nbsp;|&nbsp; ras.sc
      </p>
    </div>
  </div>
</body>
</html>`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json() as { id: string };
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const newsletters = (await getNewsletters()) ?? [];
  const nl = newsletters.find((n) => n.id === id);
  if (!nl) return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  // Collect all Clerk user emails
  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ limit: 500 });
  const emails = users
    .map((u) => u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress)
    .filter((e): e is string => Boolean(e));

  if (emails.length === 0) {
    return NextResponse.json({ error: "No member emails found" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "RAS Newsletter <newsletter@ras.sc>";
  const subject = `RAS Newsletter — ${nl.title}`;
  const html = newsletterHtml(nl.title, nl.date, nl.summary, nl.pdfUrl);

  // Resend batch: max 100 per call
  const batches = chunk(emails, 100);
  let sent = 0;
  for (const batch of batches) {
    const messages = batch.map((to) => ({ from, to, subject, html }));
    await resend.batch.send(messages);
    sent += batch.length;
  }

  // Mark as sent
  const sentAt = new Date().toISOString();
  const updated = newsletters.map((n) => n.id === id ? { ...n, sentAt } : n);
  await setNewsletters(updated);

  return NextResponse.json({ ok: true, sent });
}
