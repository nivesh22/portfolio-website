"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";

type Skill = { name: string; value: number };

type ThemePalette = {
  primary: string;
  accent: string;
  text1: string;
  border: string;
};

const readPalette = (): ThemePalette => {
  if (typeof window === "undefined") return { primary: "#22d3ee", accent: "#a855f7", text1: "#9ca3af", border: "#1f2937" };
  const styles = getComputedStyle(document.documentElement);
  const read = (k: string, fallback: string) => styles.getPropertyValue(k)?.trim() || fallback;
  return {
    primary: read("--primary", "#22d3ee"),
    accent: read("--accent", "#a855f7"),
    text1: read("--text-1", "#9ca3af"),
    border: read("--border-subtle", "rgba(255,255,255,0.14)"),
  };
};

export default function Radar({ data, height = 320 }: { data: Skill[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<ThemePalette>(() => readPalette());

  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();
    window.addEventListener("theme-changed", update);
    return () => window.removeEventListener("theme-changed", update);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, undefined, { renderer: "canvas" });
    const axisColor = palette.text1;
    const gridColor = palette.border;
    const primary = palette.primary;
    const fill = palette.accent || palette.primary;
    const option = {
      backgroundColor: "transparent",
      tooltip: { trigger: "item" },
      radar: {
        indicator: data.map((d) => ({ name: d.name, max: 5 })),
        splitNumber: 5,
        axisName: { color: axisColor },
        splitLine: { lineStyle: { color: [gridColor] } },
        splitArea: { areaStyle: { color: ["transparent"] } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: data.map((d) => d.value),
              areaStyle: { color: fill, opacity: 0.18 },
              lineStyle: { color: primary },
              symbol: "none",
            },
          ],
        },
      ],
    } as echarts.EChartsOption;
    chart.setOption(option, true);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [data, height, palette]);
  return <div ref={ref} style={{ height, width: "100%" }} aria-label="Skills radar chart" />;
}
