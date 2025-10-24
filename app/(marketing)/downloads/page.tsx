import { Section, SectionIntro } from "@/components/layout/Section";
import manifest from "@/data/downloads.json";
import Link from "next/link";

export default function DownloadsPage() {
  return (
    <Section>
      <SectionIntro label="Download Center" title="Assets and one‑pagers" />
      <div className="grid gap-3">
        {manifest.items?.map((it: any) => (
          <Link key={it.file} href={it.file} className="glass rounded-lg p-4 hover:opacity-90">
            {it.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
