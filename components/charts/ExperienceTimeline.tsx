"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

type Segment = { domain: string; start: number; end: number };

const DATA: Segment[] = [
  { domain: "Healthcare", start: 2018, end: 2020 },
  { domain: "Finance", start: 2020, end: 2023 },
  { domain: "E‑commerce", start: 2023, end: 2025 },
];

export default function ExperienceTimeline({ data = DATA }: { data?: Segment[] }) {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    const width = ref.current.clientWidth || 600;
    const height = 160;
    const margin = { top: 10, right: 10, bottom: 24, left: 80 };
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const years = [d3.min(data, (d) => d.start) || 2018, d3.max(data, (d) => d.end) || 2025];
    const x = d3.scaleLinear().domain(years).range([margin.left, width - margin.right]);
    const domains = Array.from(new Set(data.map((d) => d.domain)));
    const y = d3.scaleBand().domain(domains).range([margin.top, height - margin.bottom]).padding(0.3);

    const color = d3.scaleOrdinal<string, string>()
      .domain(domains)
      .range(["#00E5FF", "#A855F7", "#22C55E", "#F59E0B"]);

    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#1f2937")
      .selectAll("line")
      .data(d3.range(Math.ceil(years[0]), Math.floor(years[1]) + 1))
      .join("line")
      .attr("x1", (d) => x(d))
      .attr("x2", (d) => x(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom);

    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.start))
      .attr("width", (d) => Math.max(2, x(d.end) - x(d.start)))
      .attr("y", (d) => (y(d.domain) ?? 0))
      .attr("height", y.bandwidth())
      .attr("rx", 6)
      .attr("fill", (d) => color(d.domain))
      .attr("opacity", 0.8)
      .append("title").text((d) => `${d.domain}: ${d.start}–${d.end}`);

    const ax = d3.axisBottom(x).ticks(6).tickFormat(d3.format("d"));
    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(ax as any).attr("color", "#9CA3AF");
    const ay = d3.axisLeft(y);
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(ay as any).attr("color", "#9CA3AF");
  }, [data]);
  return <svg ref={ref} role="img" aria-label="Experience timeline" className="w-full h-40" />;
}

