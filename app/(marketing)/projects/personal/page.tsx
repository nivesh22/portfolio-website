import Link from "next/link";
import { Section, SectionIntro } from "@/components/layout/Section";
import { allProjects } from "contentlayer/generated";

export default function PersonalProjectsPage() {
  const personal = allProjects.filter((p) => p.kind === "personal");
  return (
    <Section>
      <SectionIntro label="Projects" title="Personal Projects" />
      <div className="grid md:grid-cols-2 gap-6">
        {personal.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
            <img src={p.cover || "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"} alt="Project cover" className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-text-1 mb-3">{p.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
              <div className="text-xs text-text-1">{(p.stack || ["Tech"]).join(", ")}</div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
