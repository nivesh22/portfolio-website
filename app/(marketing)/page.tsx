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
import InteractiveRadar from "@/components/charts/InteractiveRadar";
import ProjectImpactNetwork from "@/components/charts/ProjectImpactNetwork";
import WordCloud from "@/components/charts/WordCloud";
import ExpandableChart from "@/components/ui/ExpandableChart";
import ScholarImpactCard from "@/components/charts/ScholarImpactCard";
import { Brain, BarChart3, Sparkles, ExternalLink, ChevronLeft, ChevronRight, Rocket, Download, Coffee } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { MiniNetwork, MiniHexSpin, MiniTrend } from "@/components/ui/MiniViz";
import quotes from "@/data/quotes.json";
import gh from "@/data/github.json";
import pubs from "@/data/publications.json";
import { allProjects } from "contentlayer/generated";

const HEADLINES = [
  "Building ML solutions end-to-end: from model to integration.",
  "Translating data to decisions: measurable, scalable, impactful.",
  "Designing analytics systems that move from insight to action.",
  "From signal to strategy: building data products that ship.",
  "Applying practical AI: from prototypes to production value.",
  "Where data science meets business impact, not just outcomes."
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
      img: "/images/recommendations/Simran%20Jain.jpeg",
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
  const [ppError, setPpError] = useState(false);
  const [q, setQ] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((p) => (p + 1) % HEADLINES.length), 6000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setQ((p) => (p + 1) % (quotes as any[]).length), 9000);
    return () => clearInterval(id);
  }, []);

  const EXPERIENCES = [
    {
      year: "2023–2025",
      company: "Société Générale",
      role: "Lead Data Scientist",
      copy:
        "Engineered liquidity forecasting pipelines (ARIMA/ARDL) with CI/CD and automated drift detection—established a continuously learning financial model ecosystem.; Delivered ~$27M Net Banking Income uplift over 2 years through improved liquidity allocation and early-warning signals.; Built ML + LLM RFP-response automation reducing turnaround time and freeing analysts for higher-value tasks.",
      img: "/images/logos/socgen.png",
    },
    {
      year: "2021–2022",
      company: "Flipkart",
      role: "Senior Business Analyst",
      copy:
        "Designed gradient-boosting and sensitivity frameworks linking customer experience to operations metrics—made CX quantitatively measurable.; Drove NPS improvement (+8 p.p.) and ~$5M business value through actionable insights into delivery and incentive levers.; Partnered with product and ops teams to institutionalize data-to-action loops in quarterly business reviews.",
      img: "/images/logos/flipkart.png",
    },
    {
      year: "2018–2021",
      company: "Mu Sigma (Ethicon / J&J client)",
      role: "Decision Scientist",
      copy:
        "Led HEOR and real-world evidence analytics on surgical-site infection and wound-care outcomes across 1M+ patient records.; Co-authored 6 peer-reviewed publications (45+ citations) driving evidence-based changes in global surgical guidelines.; Supported COVID-19 vaccine-trial analytics, building reproducible dashboards for safety and efficacy monitoring.",
      img: "/images/logos/musigma.png",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <Section id="hero" className="pt-12 pb-12 md:pt-14 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <div className="mb-6">
              {/* Name label above headline */}
              <div className="text-cyan-400 font-semibold text-3xl md:text-4xl mb-10 md:mb-12">Nivesh Elangovanraaj</div>
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
                7 years applying data science across finance, healthcare, and e-commerce — designing end-to-end analytics systems that turn data into measurable business outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 items-center text-primary">
              <Link href={{ pathname: "/", hash: "projects" }} className="link-cta inline-flex items-center gap-2"><Rocket size={16} /> <span>View Projects</span></Link>
              <a href="/api/download/Nivesh_Resume_MSBA2026.pdf" className="link-cta inline-flex items-center gap-2"><Download size={16} /> <span>Download Resume</span></a>
              <a href="https://calendly.com/nivesh-ucla/coffee-chat-with-nivesh" target="_blank" rel="noopener noreferrer" className="link-cta inline-flex items-center gap-2"><Coffee size={16} /> <span>Book a Coffee Chat</span></a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "$27M+ value created", href: { pathname: "/", hash: "experience" } },
                { label: "6 peer-reviewed papers", href: { pathname: "/", hash: "publications" } },
                { label: "7 yrs in analytics", href: { pathname: "/", hash: "experience" } },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="glass rounded-lg p-3 text-center border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <p className="text-sm">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
          <Carousel className="max-w-[360px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] mx-auto" aspect="aspect-[14/16]" images={[
              "/images/hero/Royce hall.jpg",
              // "/images/hero/black suit.png",
              "/images/hero/coat suit - small.jpg",
              "/images/hero/Anderson.jpg",
            ]} />
          </div>
        </div>
      </Section>

      {/* About / What I do */}
      <Section id="about">
        <SectionIntro
          label="What I do"
          title="From data to deployment."
          lead="Bridging statistical rigor and engineering execution to turn data into measurable outcomes."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Predictive & Causal Modeling",
              copy: "I build end-to-end ML solutions — from problem framing and modeling to validation and product integration.",
              icon: Brain,
              spark: [5, 6, 8, 7, 9, 10, 12],
              viz: "trend",
            },
            {
              title: "Analytics Strategy & Leadership",
              copy: "I help businesses move from dashboards to decisions — creating KPI frameworks, AOP insights, and cross-functional alignment that deliver real value.",
              icon: BarChart3,
              spark: [2, 3, 5, 7, 8, 8, 9],
              viz: "network",
            },
            {
              title: "Responsible AI Enablement",
              copy: "I build evaluation frameworks for GenAI & LLM solutions — testing accuracy, bias & guardrails to ensure AI drives trustworthy impact.",
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
          {EXPERIENCES.map((job, i) => (
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
          <h3 className="font-medium">The Stack Behind My Work</h3>
          <p className="text-xs text-text-1 mb-3">Built from my work across finance, healthcare, and retail — the larger the word, the more often I’ve applied it in real projects.</p>
          <ExpandableChart title="Word Cloud" inlineHeight={260} expandedHeight={720}>
            <WordCloud />
          </ExpandableChart>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-medium">Strengths at a Glance</h3>
            <p className="text-xs text-text-1 mb-3">Visual snapshot of my proficiency across analytics, engineering, and strategy. Toggle to view evolution by role or time.</p>
            <ExpandableChart title="Interactive Radar" inlineHeight={320} expandedHeight={720}>
              <InteractiveRadar />
            </ExpandableChart>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-medium">Where Skills Meet Impact</h3>
            <p className="text-xs text-text-1 mb-3">Each bubble represents a project — size shows impact, color shows domain. Hover for outcomes, click for project details.</p>
            <ExpandableChart title="Project Impact Network" inlineHeight={320} expandedHeight={720}>
              <ProjectImpactNetwork />
            </ExpandableChart>
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
              <a
                key={p.slug}
                href={(p as any).demo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-0 block border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden"
              >
                {CardInner}
              </a>
            ) : (
              <button
                key={p.slug}
                type="button"
                onClick={() => setPpError(true)}
                className="text-left w-full glass rounded-xl p-0 border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden cursor-pointer"
              >
                {CardInner}
              </button>
            );
          })}
        </div>
        <Modal open={ppError} title="File unavailable" onClose={() => setPpError(false)}>
          <div className="p-2 sm:p-3 text-sm">
            Unable to fetch the Powerpoint document at this time.
          </div>
        </Modal>
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
              <a
                key={idx}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl p-0 block border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden"
              >
                {CardInner}
              </a>
            ) : (
              <div
                key={idx}
                className="glass rounded-xl p-0 border border-cyan-900/20 transition-transform duration-200 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden"
              >
                {CardInner}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications">
        <SectionIntro label="Publications" title="Peer reviewed publications" />
        <div className="glass rounded-2xl p-6 mb-6 relative">
          <a
            href="https://scholar.google.co.in/citations?hl=en&amp;user=X_vjctwAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 p-2 rounded-md bg-primary text-black hover:opacity-90"
            aria-label="Open Google Scholar profile"
            title="Open Google Scholar profile"
          >
            <ExternalLink size={16} />
          </a>
          <ScholarImpactCard title="Research Impact Over Time" lead="Citations, h-index and i10-index with yearly trend." />
        </div>
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
                href="https://calendly.com/nivesh-ucla/coffee-chat-with-nivesh"
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
                src="https://calendly.com/nivesh-ucla/coffee-chat-with-nivesh?hide_event_type_details=1&hide_gdpr_banner=1"
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
          <p className="italic">"{(quotes as any[])[q]?.text}"</p>
          <p className="mt-1">- {(quotes as any[])[q]?.author}</p>
        </div>
      </Section>
    </div>
  );
}
