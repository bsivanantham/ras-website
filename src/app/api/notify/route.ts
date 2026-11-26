import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";

function buildEmailHtml(subject: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0D3572;padding:28px 32px;">
            <p style="margin:0;color:#C9A227;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Retailers Association of Seychelles</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">${subject}</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">${message.replaceAll("\n", "<br>")}</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0D3572;border-radius:8px;">
                  <a href="https://ras.sc" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Visit ras.sc →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f4f7ff;padding:20px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">You received this because you are an admin of the Retailers Association of Seychelles.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmails = (process.env.NOTIFY_ADMINS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    return NextResponse.json({ error: "No admin emails configured" }, { status: 500 });
  }

  const { subject, message } = await req.json() as { subject: string; message: string };

  if (!subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  // Use RESEND_FROM env var if set (requires domain verified in Resend dashboard),
  // otherwise fall back to Resend's sandbox sender which works without verification
  const from = process.env.RESEND_FROM ?? "RAS <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from,
    to: adminEmails,
    subject,
    html: buildEmailHtml(subject, message),
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return NextResponse.json({ error: (error as { message?: string }).message ?? "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sent: adminEmails.length, id: data?.id });
}
