import { Section, SectionIntro } from "@/components/layout/Section";
import { allAbouts } from "contentlayer/generated";

export default function AboutPage() {
  const about = allAbouts[0];
  return (
    <Section>
      <SectionIntro label="About" title="From engineering to measurable impact" />
      <div className="grid md:grid-cols-2 gap-8">
        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: about?.body?.html || "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>" }} />
        <img className="rounded-2xl w-full h-80 object-cover" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop" alt="Portrait" />
      </div>
    </Section>
  );
}
