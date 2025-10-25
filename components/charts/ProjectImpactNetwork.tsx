"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import data from "@/data/impact-network.json";

type NodeDatum = {
  id: string;
  type: "project" | "skill" | "domain";
  domain?: string;
  impact?: number; // roughly in millions or score points
  url?: string;
  tools?: string[];
  x?: number;
  y?: number;
};

type LinkDatum = { source: string; target: string; weight?: number };

export default function ProjectImpactNetwork() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<NodeDatum | null>(null);

  const { nodes, links } = useMemo(() => {
    const n = (data as any).nodes as NodeDatum[];
    const l = (data as any).links as LinkDatum[];
    return { nodes: n.map((d) => ({ ...d })), links: l.map((d) => ({ ...d })) };
  }, []);

  useEffect(() => {
    const width = 900;
    const height = 320;
    const pad = 20;

    const svg = d3
      .select(svgRef.current!)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("display", "block");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const colorFor = (d: NodeDatum) => {
      if (d.type === "domain") {
        return { Finance: "#22d3ee", Healthcare: "#34d399", Retail: "#f59e0b", Academia: "#a78bfa", Banking: "#22c55e" }[
          d.id as any
        ] || "#a78bfa";
      }
      if (d.type === "project") {
        const domain = d.domain || "Other";
        return { Finance: "#22d3ee", Healthcare: "#34d399", Retail: "#f59e0b", Academia: "#a78bfa", Banking: "#10b981", Other: "#64748b" }[
          domain as any
        ] || "#64748b";
      }
      return "#93c5fd";
    };

    const radiusFor = (d: NodeDatum) => {
      if (d.type === "project") return 16 + Math.min(60, (d.impact || 4) * 2.4);
      if (d.type === "domain") return 16;
      return 12;
    };

    const linkForce = d3
      .forceLink<LinkDatum, NodeDatum>(links as any)
      .id((d: any) => d.id)
      .distance((d) => 110 + (d.weight ? 30 / d.weight : 0))
      .strength(0.8);

    const sim = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide<NodeDatum>().radius((d) => radiusFor(d) + 12))
      .force("link", linkForce)
      .alpha(0.9)
      .alphaDecay(0.05);

    const linkEl = g
      .selectAll("line.link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.2);

    const node = g
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .on("mouseenter", (_, d) => setHover(d))
      .on("mouseleave", () => setHover(null))
      .on("click", (_, d: any) => {
        if (d.url) window.open(d.url, "_blank");
      })
      .call(
        d3
          .drag<SVGGElement, NodeDatum>()
          .on("start", (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null as any;
            d.fy = null as any;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => radiusFor(d))
      .attr("fill", (d) => colorFor(d))
      .attr("fill-opacity", (d) => (d.type === "project" ? 0.9 : 0.7))
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1);

    node
      .append("text")
      .text((d) => d.id)
      .attr("x", (d) => radiusFor(d) + 8)
      .attr("y", 5)
      .attr("font-size", (d) => {
        const f = Math.max(11, Math.min(18, radiusFor(d) / 2.4));
        return f;
      })
      .attr("fill", "#cbd5e1")
      .attr("pointer-events", "none");

    sim.on("tick", () => {
      linkEl
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => {
        const r = (d.type === "project" ? 10 + Math.min(28, (d.impact || 4) * 1.2) : d.type === "domain" ? 12 : 8) + 6;
        d.x = Math.max(r + pad, Math.min(width - (r + pad), d.x));
        d.y = Math.max(r + pad, Math.min(height - (r + pad), d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    return () => sim.stop();
  }, [nodes, links]);

  return (
    <div className="relative w-full">
      <svg ref={svgRef} className="w-full h-[320px] rounded-xl" />
      {hover && (
        <div className="absolute left-2 top-2 glass rounded-md px-3 py-2 text-xs pointer-events-none">
          <div className="font-medium">{hover.id}</div>
          {hover.type === "project" && (
            <div className="text-text-1">
              <div>Impact: {hover.impact ? `${hover.impact}${hover.domain === "Finance" ? "M" : ""}` : "-"}</div>
              {hover.tools && <div>Tools: {hover.tools.join(", ")}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
