"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const SKILLS = [
  { name: "Python", v: 5 },
  { name: "SQL", v: 5 },
  { name: "PySpark", v: 4 },
  { name: "XGBoost", v: 4 },
  { name: "NLP", v: 4 },
  { name: "LLMs", v: 3.5 },
  { name: "Tableau/Power BI", v: 4 },
];

export default function SkillBars({ height = 280 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: 100, right: 20, top: 10, bottom: 10 },
      xAxis: { type: "value", min: 0, max: 5, axisLine: { lineStyle: { color: "#9CA3AF" } } },
      yAxis: { type: "category", data: SKILLS.map((s) => s.name), axisLine: { lineStyle: { color: "#9CA3AF" } } },
      series: [
        {
          type: "bar",
          data: SKILLS.map((s) => s.v),
          itemStyle: { color: "#00E5FF" },
          emphasis: { itemStyle: { color: "#A855F7" } },
          barWidth: 14,
        },
      ],
    };
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); chart.dispose(); };
  }, [height]);
  return <div ref={ref} style={{ width: "100%", height }} aria-label="Skill proficiency bars" />;
}
