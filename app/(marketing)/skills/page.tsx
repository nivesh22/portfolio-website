import { Section, SectionIntro } from "@/components/layout/Section";
import Radar from "@/components/charts/Radar";
import ImpactHeatmap from "@/components/charts/ImpactHeatmap";
import SkillBars from "@/components/charts/SkillBars";
import ExpandableChart from "@/components/ui/ExpandableChart";

export default function SkillsPage() {
  return (
    <Section>
      <SectionIntro label="Skills" title="Interactive skills visualizations" lead="Radar, experience timeline, and impact heatmap." />
      <div className="grid gap-6">
        <div className="glass rounded-xl p-6">
        <ExpandableChart title="Skills Radar" inlineHeight={320} expandedHeight={720}>
          <Radar
            data={[
              { name: "ML/Stats", value: 4.5 },
              { name: "Data Eng", value: 4 },
              { name: "Analytics", value: 5 },
              { name: "Viz/Story", value: 4.5 },
              { name: "Business/PM", value: 4.2 },
            ]}
          />
        </ExpandableChart>
        </div>

        <div className="glass rounded-xl p-6">
        <ExpandableChart title="Skill Proficiency Bars" inlineHeight={280} expandedHeight={640}>
          <SkillBars />
        </ExpandableChart>
        </div>

        <div className="glass rounded-xl p-6">
        <ExpandableChart title="Impact Heatmap" inlineHeight={320} expandedHeight={720}>
          <ImpactHeatmap />
        </ExpandableChart>
        </div>
      </div>
    </Section>
  );
}
