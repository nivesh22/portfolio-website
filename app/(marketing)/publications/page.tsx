import { Section, SectionIntro } from "@/components/layout/Section";
import pubs from "@/data/publications.json";
import ScholarImpactCard from "@/components/charts/ScholarImpactCard";
import { ExternalLink } from "lucide-react";

export default function PublicationsPage() {
  return (
    <Section>
      <SectionIntro label="Publications" title="Peer reviewed publications" />
      <div className="glass rounded-2xl p-6 mb-6 relative">
        <a
          href="https://scholar.google.co.in/citations?hl=en&amp;user=X_vjctwAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 p-2 rounded-md bg-primary text-black hover:opacity-90"
          aria-label="Open Google Scholar profile"
          title="Open Google Scholar profile"
          data-external-context="publications-scholar"
          data-publication-title="Google Scholar Profile"
          data-publication-url="https://scholar.google.co.in/citations?hl=en&user=X_vjctwAAAAJ"
        >
          <ExternalLink size={16} />
        </a>
        <ScholarImpactCard title="Google Scholar Impact" lead="Citations, h-index and i10-index with yearly trend." />
      </div>
      <div className="grid gap-4">
        {pubs.map((p: any, i: number) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 block"
            data-external-context="publications-card"
            data-publication-title={p.title}
            data-publication-url={p.url}
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
