"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

type Skill = { name: string; value: number };

export default function Radar({ data, height = 320 }: { data: Skill[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, undefined, { renderer: "canvas" });
    const option = {
      backgroundColor: "transparent",
      tooltip: { trigger: "item" },
      radar: {
        indicator: data.map((d) => ({ name: d.name, max: 5 })),
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
              value: data.map((d) => d.value),
              areaStyle: { color: "rgba(168, 85, 247, 0.25)" },
              lineStyle: { color: "#00E5FF" },
              symbol: "none",
            },
          ],
        },
      ],
    } as echarts.EChartsOption;
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [data, height]);
  return <div ref={ref} style={{ height, width: "100%" }} aria-label="Skills radar chart" />;
}
