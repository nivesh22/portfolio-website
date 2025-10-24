import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  // Honeypot
  if ((form.get("company") as string)?.length) {
    return NextResponse.json({ ok: true });
  }
  const name = (form.get("name") as string) || "";
  const email = (form.get("email") as string) || "";
  const message = (form.get("message") as string) || "";
  if (!name || !email || !message) return NextResponse.json({ error: "invalid" }, { status: 400 });

  // Stub: integrate Resend or Formspree here.
  console.log("Contact form:", { name, email });
  return NextResponse.json({ ok: true });
}

