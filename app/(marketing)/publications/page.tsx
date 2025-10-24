import { Section, SectionIntro } from "@/components/layout/Section";
import pubs from "@/data/publications.json";

export default function PublicationsPage() {
  return (
    <Section>
      <SectionIntro label="Publications" title="Peer‑reviewed research" />
      <div className="grid gap-4">
        {pubs.map((p: any, i: number) => (
          <div key={i} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">{p.title}</h3>
              <span className="text-xs text-text-1">{p.year}</span>
            </div>
            <p className="text-sm text-text-1 mt-1">{p.authors?.join(", ")}</p>
            <div className="text-xs mt-2">{p.venue || "Venue"} · Citations: {p.citations ?? 0}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
