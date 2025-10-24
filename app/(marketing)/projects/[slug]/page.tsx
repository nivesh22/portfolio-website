import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Section, SectionIntro } from "@/components/layout/Section";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <Section>
      <SectionIntro label={project.kind === "professional" ? "Professional" : "Personal"} title={project.title} lead={project.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."} />
      <img src={project.cover || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"} alt="Cover" className="rounded-xl w-full h-64 object-cover mb-6" />
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.body?.html || "<p>Case study content will go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>" }} />
    </Section>
  );
}
