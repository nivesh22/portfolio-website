"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import raw from "@/data/skills-radar.json";

type Item = { name: string; level: number; years: number };
type DataShape = { tools: Item[]; techniques: Item[]; domains: Item[] };

// Compute values purely from years of experience (no blended score)
function computeYears(items: Item[]) {
  return items.map((d) => ({ name: d.name, value: d.years }));
}

export default function InteractiveRadar() {
  const data = raw as unknown as DataShape;
  const [tab, setTab] = useState<"tools" | "techniques" | "domains">("tools");
  const chartRef = useRef<HTMLDivElement>(null);

  const seriesData = useMemo(() => {
    const items = data[tab];
    return computeYears(items);
  }, [data, tab]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, undefined, { renderer: "canvas" });
    const maxYears = Math.max(1, ...seriesData.map((d) => d.value as number));
    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter: () => {
          const rows = seriesData.map((d) => `${d.name}: ${d.value} yrs`);
          return `<div style='font-size:12px'>${rows.join("<br/>")}</div>`;
        }
      },
      radar: {
        indicator: seriesData.map((d) => ({ name: d.name, max: maxYears })),
        splitNumber: 5,
        axisName: { color: "#9CA3AF" },
        splitLine: { lineStyle: { color: ["#1f2937"] } },
        splitArea: { areaStyle: { color: ["transparent"] } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: seriesData.map((d) => d.value),
              areaStyle: { color: "rgba(168, 85, 247, 0.25)" },
              lineStyle: { color: "#00E5FF" },
              symbol: "none",
            },
          ],
        },
      ],
    };
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [seriesData]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="inline-flex rounded-md overflow-hidden border border-white/10">
          {["tools", "techniques", "domains"].map((k) => (
            <button
              key={k}
              onClick={() => setTab(k as any)}
              className={`px-3 py-1.5 text-xs ${tab === k ? "bg-primary text-black" : "bg-white/5 text-white"}`}
            >
              {String(k).charAt(0).toUpperCase() + String(k).slice(1)}
            </button>
          ))}
        </div>
        <span className="text-xs text-text-1 ml-2">Values reflect years of experience</span>
      </div>

      <div ref={chartRef} style={{ height: 320, width: "100%" }} aria-label="Interactive skills radar" />
    </div>
  );
}
