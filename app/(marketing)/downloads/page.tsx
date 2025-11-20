import type { Metadata } from "next";
import { Section, SectionIntro } from "@/components/layout/Section";
import manifest from "@/data/downloads.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download resume, decks, and one-pagers from Nivesh Elangovanraaj's data science portfolio.",
};

export default function DownloadsPage() {
  return (
    <Section>
      <SectionIntro label="Download Center" title="Assets and one‑pagers" />
      <div className="grid gap-3">
        {manifest.items?.map((it: any) => (
          <Link
            key={it.file}
            href={it.file}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-lg p-4 hover:opacity-90"
            data-resume-source={String(it.file).includes("Resume") ? "downloads-page" : undefined}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
