"use client";
import { Section, SectionIntro } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Calendar, Mail } from "lucide-react";

export default function ContactPage() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (res.ok) {
        alert("Thanks! I’ll reply shortly.");
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        let msg = "Something went wrong.";
        try {
          const data = await res.json();
          if (data?.detail) msg = `Send failed: ${data.detail}`;
        } catch {}
        alert(msg);
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }
  return (
    <Section>
      <SectionIntro label="Contact" title="Say hello" lead="Email form with spam protection." />
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={submit} className="glass rounded-xl p-6 grid gap-4">
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
    </Section>
  );
}

