"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import words from "@/data/wordcloud.json";

type Entry = { text: string; value: number; group?: string; tooltip?: string; links?: string[] };
type ThemePalette = { text: string; primary: string; accent: string; success: string };

function readPalette(): ThemePalette {
  if (typeof window === "undefined") {
    return { text: "#e5e7eb", primary: "#00e5ff", accent: "#a855f7", success: "#22c55e" };
  }
  const styles = getComputedStyle(document.documentElement);
  const read = (key: string, fallback: string) => styles.getPropertyValue(key)?.trim() || fallback;
  return {
    text: read("--text-0", "#e5e7eb"),
    primary: read("--primary", "#00e5ff"),
    accent: read("--accent", "#a855f7"),
    success: read("--success", "#22c55e"),
  };
}

export default function WordCloud({ height = 260 }: { height?: number }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<Entry | null>(null);
  const [palette, setPalette] = useState<ThemePalette>(() => readPalette());

  const data = useMemo(() => (words as any as Entry[]).slice(0).sort((a, b) => b.value - a.value), []);

  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();
    window.addEventListener("theme-changed", update);
    return () => window.removeEventListener("theme-changed", update);
  }, []);

  useEffect(() => {
    const width = 900;
    const h = height;
    const pad = 12;

    const svg = d3
      .select(svgRef.current!)
      .attr("viewBox", `0 0 ${width} ${h}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("display", "block");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const maxVal = d3.max(data, (d: Entry) => d.value) || 1;
    // Slightly smaller font sizes to avoid clipping
    const size = d3.scaleSqrt().domain([0, maxVal]).range([10, 34]);
    const color = (d3.scaleOrdinal().domain(["primary", "accent-blue", "accent-green"]).range([
      palette.text,
      palette.primary,
      palette.accent || palette.success,
    ])) as any;

    // Create nodes with radius approximated by text length and font size.
    const nodes = data.map((d) => {
      const fs = size(d.value);
      const r = Math.max(10, (d.text.length * fs) / 3.2);
      return { ...d, fs, r } as any;
    });

    const sim = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-8))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        (d3.forceCollide().radius((d: any) => d.r + 8)) as any
      )
      .alpha(0.9)
      .alphaDecay(0.06);

    const node = g
      .selectAll("g.word")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "word cursor-pointer")
      .on("mouseenter", (event: any, d: any) => setHover(d))
      .on("mouseleave", () => setHover(null));

    node
      .append("circle")
      .attr("r", (d: any) => d.r)
      .attr("fill", (d: any) => color(d.group || "Dom"))
      .attr("fill-opacity", 0.14)
      .attr("stroke", palette.text)
      .attr("stroke-width", 1);

    node
      .append("text")
      .text((d: any) => d.text)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", (d: any) => d.fs)
      .attr("font-weight", 600)
      .attr("fill", palette.text)
      .attr("pointer-events", "none");

    // Native tooltip fallback (browser title)
    node.append("title").text((d: any) => d.tooltip || d.text);

    sim.on("tick", () => {
      node.attr("transform", (d: any) => {
        // Clamp within bounds to avoid clipping
        d.x = Math.max(d.r + pad, Math.min(width - (d.r + pad), d.x));
        d.y = Math.max(d.r + pad, Math.min(height - (d.r + pad), d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    return () => sim.stop();
  }, [data, height, palette]);

  return (
    <div className="relative w-full">
      <svg ref={svgRef} className="w-full rounded-xl" style={{ height }} />
      {hover && (
        <div className="absolute left-2 top-2 glass rounded-md px-3 py-1.5 text-xs pointer-events-none max-w-[80%]">
          <div className="font-medium mb-0.5">{hover.text}</div>
          {hover.tooltip ? (
            <div className="text-text-1 leading-snug">{hover.tooltip}</div>
          ) : (
            <div className="text-text-1">Weight: {hover.value}</div>
          )}
        </div>
      )}
    </div>
  );
}
