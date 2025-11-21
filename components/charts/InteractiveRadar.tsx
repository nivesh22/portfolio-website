"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import raw from "@/data/skills-radar.json";
import { trackEvent } from "@/lib/analytics";

type Item = { name: string; level: number; years: number };
type DataShape = { tools: Item[]; techniques: Item[]; domains: Item[] };

// Compute values purely from years of experience (no blended score)
function computeYears(items: Item[]) {
  return items.map((d) => ({ name: d.name, value: d.years }));
}

export default function InteractiveRadar({ height = 320 }: { height?: number }) {
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
    const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#2563EB";
    const text1 = getComputedStyle(document.documentElement).getPropertyValue("--text-1").trim() || "#6B7280";
    const grid = getComputedStyle(document.documentElement).getPropertyValue("--border-subtle").trim() || "#E5E7EB";
    const fill = `color-mix(in srgb, ${primary} 30%, transparent)`;
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
        axisName: { color: text1 },
        splitLine: { lineStyle: { color: [grid] } },
        splitArea: { areaStyle: { color: ["transparent"] } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: seriesData.map((d) => d.value),
              areaStyle: { color: fill },
              lineStyle: { color: primary, width: 2 },
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
  }, [seriesData, height]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="inline-flex rounded-md overflow-hidden border border-[color:var(--card-border)]">
          {["tools", "techniques", "domains"].map((k) => {
            const active = tab === k;
            return (
              <button
                key={k}
                onClick={() => {
                  setTab(k as any);
                  trackEvent("skills_interaction", { action_type: "radar_tab", value: k });
                }}
                className={`px-3 py-1.5 text-xs ${
                  active
                    ? "bg-primary text-black"
                    : "bg-[color:var(--bg-1)] text-[color:var(--text-0)] border-l border-[color:var(--card-border)]"
                }`}
              >
                {String(k).charAt(0).toUpperCase() + String(k).slice(1)}
              </button>
            );
          })}
        </div>
        <span className="text-xs text-text-1 ml-2">Values reflect years of experience</span>
      </div>

      <div ref={chartRef} style={{ height, width: "100%" }} aria-label="Interactive skills radar" />
    </div>
  );
}
