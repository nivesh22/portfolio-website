"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const SECTION_IDS = ["experience", "skills", "projects", "publications"];

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const heroScrollFired = useRef(false);
  const scrollThresholds = useRef(new Set<number>());

  useEffect(() => {
    const query = searchParams?.toString();
    const pageLocation = query ? `${pathname}?${query}` : pathname;
    trackEvent("page_view", {
      page_location: pageLocation,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handler = () => {
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const viewport = window.innerHeight;
      const scrollTop = window.scrollY + viewport;
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      const thresholds = [25, 50, 75, 100];
      thresholds.forEach((value) => {
        if (!scrollThresholds.current.has(value) && percent >= value) {
          scrollThresholds.current.add(value);
          trackEvent("scroll_depth", { percent: value });
        }
      });
      if (!heroScrollFired.current) {
        const hero = document.getElementById("hero");
        if (hero && window.scrollY > hero.clientHeight) {
          heroScrollFired.current = true;
          trackEvent("hero_scroll", { offset: hero.clientHeight });
        }
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            trackEvent("section_view", { section_id: entry.target.id });
          }
        });
      },
      { threshold: 0.4 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!fired && entry.isIntersecting) {
            fired = true;
            trackEvent("contact_form_open", { section_id: "contact" });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const node = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!node || node.dataset.skipExternalTracking === "true") return;
      const href = node.getAttribute("href");
      if (!href) return;
      if (node.dataset.projectId) {
        trackEvent("project_card_click", {
          project_id: node.dataset.projectId,
          context: node.dataset.projectContext,
        });
      }
      if (node.dataset.publicationTitle) {
        trackEvent("publication_click", {
          title: node.dataset.publicationTitle,
          url: node.dataset.publicationUrl,
        });
      }
      if (node.dataset.resumeSource) {
        trackEvent("resume_download", { source: node.dataset.resumeSource });
      }
      if (href.startsWith("mailto:")) {
        trackEvent("email_click", {
          email: href.replace(/^mailto:/i, ""),
          context: node.dataset.emailContext,
        });
        return;
      }
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) {
          trackEvent("external_link_click", {
            destination: url.hostname,
            path: url.pathname,
            context: node.dataset.externalContext,
          });
        }
      } catch {
        // ignore invalid URLs
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      trackEvent("error_event", {
        error_message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        page_url: window.location.href,
      });
    };
    const onUnhandled = (event: PromiseRejectionEvent) => {
      trackEvent("error_event", {
        error_message: String(event.reason),
        source: "unhandledrejection",
        page_url: window.location.href,
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, []);

  return null;
}
