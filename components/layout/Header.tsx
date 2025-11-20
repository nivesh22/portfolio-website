"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, FileDown, Github, Linkedin, BookOpen, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const links = [
  { href: "/#hero", label: "Home", id: "hero" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#publications", label: "Publications", id: "publications" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("hero");
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Scroll spy for homepage.
  useEffect(() => {
    const ids = links.map((l) => l.id).filter(Boolean) as string[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-colors ${solid ? "bg-bg-1/90 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      <div className="container-max flex items-center justify-between h-16">
        <div aria-label="Brand spacer" className="w-6" />
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={{ pathname: "/", hash: l.id }}
              className={`hover:text-primary ${active === l.id ? "text-primary" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/api/download/Nivesh_Resume_MSBA2026.pdf"
            className="hidden sm:inline-flex items-center gap-2 bg-accent/80 hover:bg-accent/90 text-white px-3 py-1.5 rounded-md"
            onClick={() => trackEvent("resume_download", { source: "header" })}
            data-external-context="header-resume"
          >
            <FileDown size={16} /> Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/nivesh-elangovanraaj/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 hover:text-primary"
            data-external-context="header-linkedin"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/nivesh22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 hover:text-primary"
            data-external-context="header-github"
          >
            <Github size={18} />
          </a>
          <a href="mailto:nivesh@ucla.edu" aria-label="Email" className="p-2 hover:text-primary" data-email-context="header">
            <Mail size={18} />
          </a>
          <a
            href="https://scholar.google.co.in/citations?hl=en&user=X_vjctwAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Publications"
            className="p-2 hover:text-primary"
            data-external-context="header-scholar"
          >
            <BookOpen size={18} />
          </a>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-accent/20 text-white px-3 py-1.5 rounded-md hover:bg-accent/30"
            onClick={() => trackEvent("book_chat_click", { source: "header" })}
          >
            <Calendar size={16} /> Book a Chat
          </Link>
        </div>
      </div>
    </header>
  );
}
