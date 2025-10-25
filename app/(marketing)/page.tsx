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
import { Brain, BarChart3, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { MiniNetwork, MiniHexSpin, MiniTrend } from "@/components/ui/MiniViz";
import gh from "@/data/github.json";
import pubs from "@/data/publications.json";
import { allProjects } from "contentlayer/generated";

const HEADLINES = [
  "Data to Decisions to Impact.",
  "Practical AI for products that move the needle.",
  "From signal to strategy: I build analytics that ship.",
];

// Lightweight recommendations carousel component
function RecommendationsCarousel() {
  type Rec = {
    name: string;
    title: string;
    meta: string;
    text: string;
    img?: string;
    url: string;
  };
  const RECS: Rec[] = [
    {
      name: "Simran Jain",
      title: "Principal Data Scientist | Amateur Theatre Artist",
      meta: "April 12, 2021 · Managed me directly",
      text:
        "Nivesh worked with me at the very beginning of his career and even at that early stage he showed incredible maturity in the work he did. He could see the bigger picture, beyond what he was tasked with and as a result he brought valuable ideas to the table. He's a quick study and onboarded onto any new project with ease. I have seen him raise the bar for himself repeatedly. He was a treasured teammate and I had a great time working with him!",
      img: "",
      url: "https://www.linkedin.com/in/nivesh-elangovanraaj/details/recommendations/",
    },
  ];
  const ITEMS = [...RECS, ...RECS];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % ITEMS.length), 8000);
    return () => clearInterval(id);
  }, [ITEMS.length]);

  const Avatar = ({ name, src }: { name: string; src?: string }) => {
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]!)
      .join("")
      .toUpperCase();
    return src ? (
      <img src={src} alt={name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
    ) : (
      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm">
        {initials}
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative min-h-[240px]">
        {ITEMS.map((r, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
          >
            <div className="glass rounded-2xl px-16 py-6 border border-cyan-900/20 shadow-sm relative">
              <div className="flex items-start gap-4">
                <Avatar name={r.name} src={r.img} />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-text-1">{r.title}</div>
                  <div className="text-xs text-text-1 mt-0.5">{r.meta}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-text-1 leading-relaxed">{r.text}</p>
              <div className="mt-4">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View on LinkedIn
                </a>
              </div>
              <button
                aria-label="Previous recommendation"
                className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-2"
                onClick={() => setIdx((idx - 1 + ITEMS.length) % ITEMS.length)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next recommendation"
                className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-2"
                onClick={() => setIdx((idx + 1) % ITEMS.length)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <div className="flex flex-wrap gap-8 items-center text-primary">
              <Link href="#projects" className="link-cta">View Projects</Link>
              <Link href="/api/download/Nivesh_Resume_MSBA2026.pdf" className="link-cta">Download Resume</Link>
              <a href="https://calendly.com/nivesh-ucla/new-meeting" target="_blank" rel="noopener noreferrer" className="link-cta">Book a Coffee Chat</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {["$27M+ value created", "6 peer-reviewed papers", "7 yrs in analytics"].map((k) => (
                <div
                  key={k}
                  className="glass rounded-lg p-3 text-center border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
                >
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
        <SectionIntro
          label="What I do"
          title="Applied data, built to ship"
          lead="Combining statistical rigor with engineering execution to turn data into measurable outcomes."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Predictive & Causal Modeling",
              copy: "Building interpretable ML pipelines for forecasting, uplift, and counterfactual analysis.",
              icon: Brain,
              spark: [5, 6, 8, 7, 9, 10, 12],
              viz: "trend",
            },
            {
              title: "Analytics Strategy & Leadership",
              copy: "Translating data insights into business roadmaps, KPIs, and measurable impact alignment.",
              icon: BarChart3,
              spark: [2, 3, 5, 7, 8, 8, 9],
              viz: "network",
            },
            {
              title: "Responsible AI Enablement",
              copy: "Evaluating GenAI outputs, defining guardrails, and designing measurement frameworks.",
              icon: Sparkles,
              spark: [1, 2, 4, 5, 6, 7, 9],
              viz: "hex",
            },
          ].map((c) => (
            <Card
              key={c.title}
              className="group h-44 max-w-sm border border-cyan-900/20 rounded-2xl transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <c.icon className="text-primary" size={18} />
                  <h3 className="font-medium">{c.title}</h3>
                </div>
                <div className="w-20 opacity-80">
                  {c.viz === "network" ? (
                    <MiniNetwork />
                  ) : c.viz === "hex" ? (
                    <MiniHexSpin />
                  ) : c.viz === "trend" ? (
                    <MiniTrend />
                  ) : (
                    <Sparkline data={c.spark} />
                  )}
                </div>
              </div>
              <p className="text-text-1 text-sm leading-snug line-clamp-3">{c.copy}</p>
              <div className="mt-3 h-0.5 bg-primary/40 w-0 group-hover:w-16 transition-all" />
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience timeline */}
      <Section id="experience">
        <SectionIntro label="Experience" title="Where I’ve built impact" />
        <div className="grid gap-10">
          {[
            { year: "2023–2025", company: "Société Générale", role: "Lead Data Scientist", copy: "Deployed liquidity forecasting (ARDL/ARIMA) with CI/CD and drift monitoring; improved NBI by ~$27M over 2 years; automated RFP responses with ML + LLM workflows.", img: "/images/logos/socgen.png" },
            { year: "2021–2022", company: "Flipkart", role: "Senior Business Analyst", copy: "Built gradient boosting and sensitivity analysis to link CX with operations metrics; improved NPS and generated ~$5M in value.", img: "/images/logos/flipkart.png" },
            { year: "2018–2021", company: "Mu Sigma", role: "Decision Scientist", copy: "HEOR-focused analytics on real-world medical data; published peer-reviewed work; supported COVID-19 vaccine trials analytics.", img: "/images/logos/musigma.png" },
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
                  <div className="glass rounded-xl p-5 flex gap-4 items-start border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
                    <img src={job.img} alt="logo" className="w-12 h-12 rounded-md object-cover border border-white/10" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary mb-1">Impact</p>
                      <ul className="list-disc pl-5 text-sm text-text-1 space-y-1">
                        {job.copy.split(';').slice(0,3).map((b: string, idx: number) => (
                          <li key={idx}>{b.trim()}</li>
                        ))}
                      </ul>
                    </div>
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
                  <div className="glass rounded-xl p-5 flex gap-4 items-start border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
                    <img src={job.img} alt="logo" className="w-12 h-12 rounded-md object-cover border border-white/10" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary mb-1">Impact</p>
                      <ul className="list-disc pl-5 text-sm text-text-1 space-y-1">
                        {job.copy.split(';').slice(0,3).map((b: string, idx: number) => (
                          <li key={idx}>{b.trim()}</li>
                        ))}
                      </ul>
                    </div>
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
          {allProjects.filter(p => p.kind === "professional").slice(0, 4).map((p) => {
            const coverMap: Record<string, string> = {
              "liquidity-forecasting": "/images/projects/personal/liquidity-animated.svg",
              // add cache-busters to ensure browser fetches fresh assets
              "cx-driver-model": "/images/projects/professional/cx-driver-animated.svg",
              "genai-evaluator": "/images/projects/professional/genai-evaluator-animated.svg",
              "market-parser": "/images/projects/professional/market-parser-animated.svg",
            };
            let imgSrc = coverMap[p.slug] || p.cover || "/images/wip.svg";
            const isCx = p.slug === "cx-driver-model" && (p as any).demo;
            const CardInner = (
              <>
                <img src={imgSrc} alt="Project cover" className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-text-1 mb-3">{p.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
                  <div className="flex flex-wrap gap-1 text-xs text-text-1">
                    {(p.stack as string[] | undefined)?.slice(0, 6).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </>
            );
            return isCx ? (
              <a key={p.slug} href={(p as any).demo} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
                {CardInner}
              </a>
            ) : (
              <div key={p.slug} className="glass rounded-xl p-0 overflow-hidden">
                {CardInner}
              </div>
            );
          })}
        </div>
        <h3 className="text-lg font-medium mb-3">GitHub Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {gh.slice(0, 4).map((r: any, idx: number) => {
            const CardInner = (
              <>
                <img src={r.image || "/images/wip.svg"} alt="Repo cover" className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold mb-1">{r.name}</h3>
                  <p className="text-sm text-text-1 mb-2">{r.description}</p>
                  <div className="flex flex-wrap gap-1 text-xs text-text-1">{(r.topics || []).map((t: string) => <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{t}</span>)}</div>
                </div>
              </>
            );
            return r.url ? (
              <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="glass rounded-xl p-0 block hover:opacity-90 overflow-hidden">
                {CardInner}
              </a>
            ) : (
              <div key={idx} className="glass rounded-xl p-0 overflow-hidden">
                {CardInner}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications">
        <SectionIntro label="Publications" title="Peer reviewed publications" />
        <div className="grid md:grid-cols-3 gap-6">
          {pubs.slice(0, 7).map((p: any, i: number) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 block"
            >
              <h3 className="font-medium mb-1 line-clamp-2 min-h-[3rem]">{p.title}</h3>
              <div className="text-xs text-text-1">{p.venue || "Venue"} · {p.year}</div>
            </a>
          ))}
        </div>
      </Section>

      {/* LinkedIn Recommendations */}
      <Section id="recommendations">
        <SectionIntro label="Recommendations" title="What colleagues say" />
        <RecommendationsCarousel />
      </Section>

      {/* Contact */}
      <Section id="contact">
        <SectionIntro label="Contact" title="Let’s connect" lead="Send a note and I’ll reply soon." />
        <div className="grid md:grid-cols-2 gap-6">
          <form action="/api/contact" method="post" className="glass rounded-xl p-6 grid gap-4">
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
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Calendly</h3>
              <a
                href="https://calendly.com/nivesh-ucla/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-primary text-black hover:opacity-90"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="Calendly Scheduler"
                src="https://calendly.com/nivesh-ucla/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </Section>
      {/* Quote at bottom */}
      <Section>
        <div className="text-center text-text-1 text-sm">
          <p className="italic">“In God we trust; all others must bring data.”</p>
          <p className="mt-1">— W. Edwards Deming</p>
        </div>
      </Section>
    </div>
  );
}
