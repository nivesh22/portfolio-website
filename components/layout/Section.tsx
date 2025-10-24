import { ReactNode } from "react";

export function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="py-20">
      <div className="container-max">{children}</div>
    </section>
  );
}

export function SectionIntro({ label, title, lead }: { label?: string; title: string; lead?: string }) {
  return (
    <div className="mb-10">
      {label ? <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{label}</p> : null}
      <h2 className="text-2xl md:text-4xl font-semibold mb-3">{title}</h2>
      {lead ? <p className="text-text-1 max-w-2xl">{lead}</p> : null}
    </div>
  );
}

