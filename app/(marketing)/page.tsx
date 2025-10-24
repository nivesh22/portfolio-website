"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Section, SectionIntro } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Carousel from "@/components/ui/Carousel";
import Sparkline from "@/components/charts/Sparkline";
import Radar from "@/components/charts/Radar";
import ImpactHeatmap from "@/components/charts/ImpactHeatmap";
import SkillBars from "@/components/charts/SkillBars";
import gh from "@/data/github.json";
import pubs from "@/data/publications.json";
import { allProjects } from "contentlayer/generated";

const HEADLINES = [
  "Data to Decisions to Impact.",
  "Practical AI for products that move the needle.",
  "From signal to strategy: I build analytics that ship.",
];

export default function HomePage() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((p) => (p + 1) % HEADLINES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Hero */}
      <Section id="hero">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl md:text-5xl font-semibold"
                >
                  {HEADLINES[t]}
                </motion.h1>
              </AnimatePresence>
              <p className="text-text-1 mt-4 max-w-xl">
                7 years across finance, healthcare, and e-commerce. I build measurable analytics systems that translate data into outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#projects" className="inline-block"><Button size="lg">View Projects</Button></Link>
              <Link href="/api/download/Nivesh_Resume_MSBA2026.pdf" className="inline-block"><Button size="lg">Download Resume</Button></Link>
              <Link href="#contact" className="inline-block"><Button variant="ghost" size="lg">Book a Coffee Chat</Button></Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {["$27M+ value created", "6 peer-reviewed papers", "7 yrs in analytics"].map((k) => (
                <div key={k} className="glass rounded-lg p-3 text-center">
                  <p className="text-sm">{k}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Carousel aspect="aspect-[24/16]" images={[
              "/images/hero/Royce hall.jpg",
              "/images/hero/coat suit - small.png",
              "/images/hero/Anderson.jpg",
            ]} />
          </div>
        </div>
      </Section>

      {/* About / What I do */}
      <Section id="about">
        <SectionIntro label="What I do" title="Applied data, built to ship" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Data Science", copy: "Forecasting, uplift, causal inference, evaluation.", spark: [5, 6, 8, 7, 9, 10, 12] },
            { title: "Analytics Strategy", copy: "Roadmaps, KPIs, stakeholder alignment.", spark: [2, 3, 5, 7, 8, 8, 9] },
            { title: "AI Enablement", copy: "GenAI evaluation, guardrails, measurement.", spark: [1, 2, 4, 5, 6, 7, 9] },
          ].map((c) => (
            <Card key={c.title}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{c.title}</h3>
                <div className="w-24"><Sparkline data={c.spark} /></div>
              </div>
              <p className="text-text-1 text-sm">{c.copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience timeline (visual style similar to provided image) */}
      <Section id="experience">
        <SectionIntro label="Experience" title="Where I’ve built impact" />
        <div className="grid gap-10">
          {[
            { year: "2023–2025", company: "Société Générale", role: "Lead Data Scientist", copy: "Deployed liquidity forecasting (ARDL/ARIMA) with CI/CD and drift monitoring; improved NBI by ~$27M over 2 years; automated RFP responses with ML + LLM workflows.", img: "/images/logos/socgen.png" },
            { year: "2021–2022", company: "Flipkart", role: "Senior Business Analyst", copy: "Built gradient boosting and sensitivity analysis to link CX with operations metrics; improved NPS and generated ~$5M in value.", img: "/images/logos/flipkart.png" },
            { year: "2018–2021", company: "Mu Sigma", role: "Decision Scientist", copy: "HEOR‑focused analytics on real‑world medical data; published peer‑reviewed work; supported COVID‑19 vaccine trials analytics.", img: "/images/logos/musigma.png" },
          ].map((job, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-6">
              {/* Left card */}
              {i % 2 === 0 ? (
                <div className="justify-self-end max-w-xl">
                  <div className="text-right mb-2">
                    <h3 className="text-accent font-semibold">{job.year}</h3>
                    <p className="text-xl font-medium">{job.company}</p>
                    <p className="text-sm text-text-1">{job.role}</p>
                  </div>
                  <div className="glass rounded-xl p-5 flex gap-4 items-start">
                    <img src={job.img} alt="logo" className="w-12 h-12 rounded-md object-cover border border-white/10" />
                    <p className="text-sm leading-relaxed">{job.copy}</p>
                  </div>
                </div>
              ) : (
                <div />
              )}
              {/* Center line */}
              <div className="hidden md:block h-full w-[2px] bg-white/10 mx-auto rounded" aria-hidden="true" />
              {/* Right card */}
              {i % 2 === 1 ? (
                <div className="max-w-xl">
                  <div className="mb-2">
                    <h3 className="text-accent font-semibold">{job.year}</h3>
                    <p className="text-xl font-medium">{job.company}</p>
                    <p className="text-sm text-text-1">{job.role}</p>
                  </div>
                  <div className="glass rounded-xl p-5 flex gap-4 items-start">
                    <img src={job.img} alt="logo" className="w-12 h-12 rounded-md object-cover border border-white/10" />
                    <p className="text-sm leading-relaxed">{job.copy}</p>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills">
        <SectionIntro label="Skills" title="Breadth with spikes where it counts" />
        <div className="glass rounded-2xl p-6">
          <Radar data={[{ name: "ML/Stats", value: 4.5 }, { name: "Data Eng", value: 4 }, { name: "Analytics", value: 5 }, { name: "Viz/Story", value: 4.5 }, { name: "Business/PM", value: 4.2 }]} />
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-medium mb-3">Tooling proficiency</h3>
            <SkillBars />
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-medium mb-3">Impact Heatmap</h3>
            <ImpactHeatmap />
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionIntro label="Projects" title="Selected work" />
        <h3 className="text-lg font-medium mb-3">Professional Projects</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {allProjects.filter(p=>p.kind==="professional").slice(0,4).map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
              <img src={p.cover || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"} alt="Project cover" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-text-1 mb-3">{p.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
              </div>
            </Link>
          ))}
        </div>
        <h3 className="text-lg font-medium mb-3">GitHub Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {gh.slice(0,4).map((r:any, idx:number) => (
            <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
              <img src={r.image} alt="Repo cover" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold mb-1">{r.name}</h3>
                <p className="text-sm text-text-1 mb-2">{r.description}</p>
                <div className="flex flex-wrap gap-1 text-xs text-text-1">{(r.topics||[]).map((t:string)=> <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{t}</span>)}</div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications">
        <SectionIntro label="Publications" title="Recent research" />
        <div className="grid md:grid-cols-3 gap-6">
          {pubs.slice(0, 7).map((p: any, i: number) => (
            <div key={i} className="glass rounded-xl p-5">
              <h3 className="font-medium mb-1 line-clamp-2 min-h-[3rem]">{p.title}</h3>
              <div className="text-xs text-text-1">{p.venue || "Venue"} · {p.year}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resume */}
      <Section id="resume">
        <SectionIntro label="Resume" title="Get the PDF" />
        <Link href="/api/download/Nivesh_Resume_MSBA2026.pdf"><Button size="lg">Download Resume</Button></Link>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <SectionIntro label="Contact" title="Let’s connect" lead="Send a note and I’ll reply soon." />
        <form action="/api/contact" method="post" className="glass rounded-xl p-6 grid gap-4 max-w-xl">
          <label className="grid gap-2">
            <span className="text-sm">Name</span>
            <input name="name" required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Email</span>
            <input type="email" name="email" required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea name="message" rows={5} required className="bg-bg-2 rounded-md px-3 py-2 border border-white/10" />
          </label>
          <input type="text" name="company" className="hidden" aria-hidden="true" tabIndex={-1} />
          <div>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Section>
    </div>
  );
}
