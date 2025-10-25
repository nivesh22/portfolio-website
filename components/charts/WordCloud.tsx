"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import words from "@/data/wordcloud.json";

type Entry = { text: string; value: number; group?: string };

export default function WordCloud() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<Entry | null>(null);

  const data = useMemo(() => (words as any as Entry[]).slice(0).sort((a, b) => b.value - a.value), []);

  useEffect(() => {
    const width = 900;
    const height = 260;
    const pad = 12;

    const svg = d3
      .select(svgRef.current!)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("display", "block");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const maxVal = d3.max(data, (d: Entry) => d.value) || 1;
    // Slightly smaller font sizes to avoid clipping
    const size = d3.scaleSqrt().domain([0, maxVal]).range([10, 34]);
    const color = (d3
      .scaleOrdinal()
      .domain(["Lang", "App", "Viz", "ML", "AI", "Eng", "Dom"]) // theme colors
      .range(["#22d3ee", "#a78bfa", "#f59e0b", "#34d399", "#0ea5e9", "#22c55e", "#93c5fd"])) as any;

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
      .attr("fill-opacity", 0.18)
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1);

    node
      .append("text")
      .text((d: any) => d.text)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", (d: any) => d.fs)
      .attr("font-weight", 600)
      .attr("fill", "#e5e7eb")
      .attr("pointer-events", "none");

    sim.on("tick", () => {
      node.attr("transform", (d: any) => {
        // Clamp within bounds to avoid clipping
        d.x = Math.max(d.r + pad, Math.min(width - (d.r + pad), d.x));
        d.y = Math.max(d.r + pad, Math.min(height - (d.r + pad), d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    return () => sim.stop();
  }, [data]);

  return (
    <div className="relative w-full">
      <svg ref={svgRef} className="w-full h-[260px] rounded-xl" />
      {hover && (
        <div className="absolute left-2 top-2 glass rounded-md px-3 py-1.5 text-xs pointer-events-none">
          <div className="font-medium">{hover.text}</div>
          <div className="text-text-1">Weight: {hover.value}</div>
          <div className="text-text-1">Category: {(() => {
            const g = (hover.group || '').toLowerCase();
            if (["lang","app","viz","ml","ai","eng"].includes(g)) return "Technical";
            if (["dom","domain"].includes(g)) return "Domain";
            if (g === "impact") return "Impact";
            if (g === "lead" || g === "leadership") return "Leadership";
            return "Technical";
          })()}</div>
        </div>
      )}
    </div>
  );
}
