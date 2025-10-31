"use client";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Metric = { label: string; value: number };

const METRICS: Metric[] = [
  { label: "Citations", value: 74 },
  { label: "h-index", value: 5 },
  { label: "i10-index", value: 2 },
];

const YEARLY = [
  { year: 2021, citations: 10 },
  { year: 2022, citations: 18 },
  { year: 2023, citations: 12 },
  { year: 2024, citations: 18 },
  { year: 2025, citations: 10 },
];

function useCountUp(target: number, durationMs = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      setVal(Math.round(target * (0.4 + 0.6 * p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return val;
}

type Props = { height?: number; className?: string; title?: string; lead?: string };

export default function ScholarImpactCard({ height = 180, className, title = "Google Scholar Impact", lead = "Citations, h-index and i10-index with yearly trend." }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, undefined, { renderer: "canvas" });
    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: 64, right: 16, top: 12, bottom: 48, containLabel: true },
      xAxis: {
        type: "category",
        data: YEARLY.map(d => String(d.year)),
        axisLine: { lineStyle: { color: "#9CA3AF" } },
        axisTick: { show: false },
        axisLabel: { color: "#9CA3AF", fontSize: 11, margin: 8 },
        name: "Year",
        nameLocation: "middle",
        nameGap: 28,
        nameTextStyle: { color: "#9CA3AF", fontSize: 12, fontWeight: 500 },
      },
      yAxis: {
        type: "value",
        min: 0,
        axisLine: { show: true, lineStyle: { color: "#9CA3AF" } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "#1f2937" } },
        axisLabel: { color: "#9CA3AF", fontSize: 11, margin: 8 },
        name: "Citations",
        nameLocation: "middle",
        nameGap: 56,
        nameRotate: 90,
        nameTextStyle: { color: "#9CA3AF", fontSize: 12, fontWeight: 500 },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: any) => {
          const p = params?.[0];
          if (!p) return "";
          return `Year: ${p.name} — ${p.value} citations`;
        },
      },
      series: [
        {
          type: "bar",
          data: YEARLY.map(d => d.citations),
          barWidth: 18,
          itemStyle: { color: "#00E5FF", borderRadius: [8, 8, 0, 0] },
          emphasis: { itemStyle: { color: "#A855F7" } },
          animationDuration: 800,
        },
      ],
    };
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); chart.dispose(); };
  }, [height]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-0", className)}
    >
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs text-text-1 mb-3">{lead}</p>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {METRICS.map((m, i) => {
          const v = useCountUp(m.value, 900 + i * 120);
          return (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-primary">{v}</div>
              <div className="text-[11px] uppercase tracking-wide text-text-1">{m.label}</div>
            </div>
          );
        })}
      </div>
      <div ref={chartRef} style={{ width: "100%", height }} aria-label="Citations per year bar chart" />
    </motion.div>
  );
}
