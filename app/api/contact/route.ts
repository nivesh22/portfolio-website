import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const form = await req.formData();
  // Honeypot
  if ((form.get("company") as string)?.length) {
    return NextResponse.json({ ok: true });
  }

  const name = ((form.get("name") as string) || "").trim();
  const email = ((form.get("email") as string) || "").trim();
  const message = ((form.get("message") as string) || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Support multiple env var names for the Resend API key
  const rawKey =
    process.env.RESEND_API_KEY ??
    process.env.vercelcontactform ??
    process.env.VERCELCONTACTFORM ??
    process.env.VERCEL_CONTACTFORM ??
    process.env.RESEND ??
    process.env.RESENDKEY ??
    process.env["vercelcontactform"] ??
    process.env["VERCELCONTACTFORM"] ??
    process.env["VERCEL_CONTACTFORM"];
  const apiKey = typeof rawKey === "string" ? rawKey.trim() : undefined;
  const to = process.env.RESEND_TO || "nivesh@ucla.edu";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const subject = `New contact form submission from ${name}`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMsg = escapeHtml(message).replace(/\n/g, "<br/>");
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio Website";

  const wrapper = (inner: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0b1020;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#0f172a;border:1px solid #1f2937;border-radius:12px;color:#e5e7eb;font-family:Inter,Segoe UI,Arial,sans-serif;">
          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid #1f2937;">
              <h1 style="margin:0;font-size:18px;line-height:1.4;color:#e5e7eb;">${siteName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;border-top:1px solid #1f2937;color:#9ca3af;font-size:12px;">
              Sent via contact form • Do not share sensitive info
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;

  const ownerHtml = wrapper(`
    <h2 style="margin:0 0 12px;font-size:16px;color:#e5e7eb;">New message received</h2>
    <p style="margin:0 0 8px;color:#cbd5e1;"><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
    <div style="margin:12px 0;padding:12px;border:1px solid #1f2937;border-radius:8px;background:#111827;color:#e5e7eb;">
      ${safeMsg}
    </div>
    <div style="margin-top:12px;">
      <a href="mailto:${safeEmail}" style="display:inline-block;background:#00e5ff;color:#0b1020;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;">Reply</a>
      <a href="https://calendly.com/nivesh-ucla/new-meeting" style="display:inline-block;margin-left:8px;background:#a855f7;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;">Schedule</a>
    </div>
  `);

  const confirmSubject = `We received your message — ${siteName}`;
  const confirmHtml = wrapper(`
    <h2 style="margin:0 0 12px;font-size:16px;color:#e5e7eb;">Thanks, ${safeName}!</h2>
    <p style="margin:0 0 12px;color:#cbd5e1;">I’ve received your message and will get back to you shortly. Here’s a copy for your records:</p>
    <div style="margin:12px 0;padding:12px;border:1px solid #1f2937;border-radius:8px;background:#111827;color:#e5e7eb;">
      ${safeMsg}
    </div>
    <p style="margin:12px 0;color:#cbd5e1;">If it’s urgent, feel free to email me directly at <a href="mailto:nivesh@ucla.edu" style="color:#00e5ff;">nivesh@ucla.edu</a> or book a time:</p>
    <div>
      <a href="https://calendly.com/nivesh-ucla/new-meeting" style="display:inline-block;background:#00e5ff;color:#0b1020;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;">Book a meeting</a>
    </div>
  `);

  async function sendEmail(payload: any) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Resend HTTP ${res.status}: ${txt}`);
    }
    return res.json().catch(() => ({}));
  }

  try {
    // Send to site owner
    await sendEmail({
      from,
      to,
      subject,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: ownerHtml,
    });

    // Send confirmation to sender
    await sendEmail({
      from,
      to: email,
      subject: confirmSubject,
      text: `Thanks ${name}! I’ve received your message and will get back to you shortly.\n\nYour message:\n${message}`,
      html: confirmHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
