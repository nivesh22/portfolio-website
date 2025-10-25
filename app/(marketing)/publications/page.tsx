import { Section, SectionIntro } from "@/components/layout/Section";
import pubs from "@/data/publications.json";

export default function PublicationsPage() {
  return (
    <Section>
      <SectionIntro label="Publications" title="Peer reviewed publications" />
      <div className="grid gap-4">
        {pubs.map((p: any, i: number) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 block"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">{p.title}</h3>
              <span className="text-xs text-text-1">{p.year}</span>
            </div>
            {p.authors && (
              <p className="text-sm text-text-1 mt-1">{(p.authors as string[]).join(", ")}</p>
            )}
            <div className="text-xs mt-2">{p.venue || "Venue"}</div>
          </a>
        ))}
      </div>
    </Section>
  );
}
