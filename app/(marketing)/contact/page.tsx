"use client";
import { useState } from "react";
import { Section, SectionIntro } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Calendar, Mail } from "lucide-react";

export default function ContactPage() {
  const [toast, setToast] = useState<{ msg: string; kind: "success" | "error" } | null>(null);
  function showToast(msg: string, kind: "success" | "error") {
    setToast({ msg, kind });
    window.clearTimeout((showToast as any)._t);
    (showToast as any)._t = window.setTimeout(() => setToast(null), 3000);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (res.ok) {
        showToast("Thanks! I’ll reply shortly.", "success");
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        let msg = "Something went wrong.";
        try {
          const data = await res.json();
          if (data?.detail) msg = "Send failed";
        } catch {}
        showToast(msg, "error");
      }
    } catch (err) {
      showToast("Something went wrong.", "error");
    }
  }
  return (
    <Section>
      <SectionIntro label="Contact" title="Say hello" lead="Email form with spam protection." />
      <div className="grid md:grid-cols-2 gap-8">
        {/* target a hidden iframe to prevent navigation if JS fails */}
        <form onSubmit={submit} className="glass rounded-xl p-6 grid gap-4" method="post" action="/api/contact" target="contact_hidden_target">
          <label className="grid gap-2">
            <span className="text-sm">Name</span>
            <input name="name" required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Email</span>
            <input type="email" name="email" required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea name="message" rows={5} required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <input type="text" name="company" className="hidden" aria-hidden="true" tabIndex={-1} />
          <div>
            <Button type="submit">Send</Button>
          </div>
        </form>
        <iframe name="contact_hidden_target" style={{ display: "none" }} aria-hidden="true" />
        <div className="glass rounded-xl p-6 space-y-4">
          <p className="text-sm text-text-1">Prefer email? Reach me at</p>
          <a href="mailto:nivesh@ucla.edu" className="inline-flex items-center gap-2 text-primary">
            <Mail size={18} /> nivesh@ucla.edu
          </a>
          <div>
            <h2 className="text-base font-medium mb-2 inline-flex items-center gap-2 text-text-0">
              <Calendar size={18} /> Book a meeting
            </h2>
            <div className="rounded-lg overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="Calendly Scheduler"
                src="https://calendly.com/nivesh-ucla/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-md shadow-lg ${
            toast.kind === "success" ? "bg-green-500 text-black" : "bg-red-500 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.msg}
        </div>
      )}
    </Section>
  );
}
