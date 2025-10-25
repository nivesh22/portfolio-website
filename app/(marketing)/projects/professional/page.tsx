import Link from "next/link";
import { Section, SectionIntro } from "@/components/layout/Section";
import { allProjects } from "contentlayer/generated";

export default function ProfessionalProjectsPage() {
  const pros = allProjects.filter((p) => p.kind === "professional");
  return (
    <Section>
      <SectionIntro label="Projects" title="Professional Projects" />
      <div className="grid md:grid-cols-2 gap-6">
        {pros.map((p) => {
          const coverMap: Record<string, string> = {
            "liquidity-forecasting": "/images/projects/personal/liquidity-animated.svg",
            "cx-driver-model": "/images/projects/professional/cx-driver-animated.svg",
            "genai-evaluator": "/images/projects/professional/genai-evaluator-animated.svg",
            "market-parser": "/images/projects/professional/market-parser-animated.svg",
          };
          const imgSrc = coverMap[p.slug] || p.cover || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop";
          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
              <img src={imgSrc} alt="Project cover" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-text-1 mb-3">{p.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
                <div className="text-xs text-text-1">{p.domain || "Domain"} · {p.year || 2024}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

