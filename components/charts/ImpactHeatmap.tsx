"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const DOMAINS = ["Finance", "Healthcare", "E‑commerce", "Platform", "Ops"];
const IMPACTS = ["Revenue", "Cost", "Risk", "CX", "Time"];

function makeData() {
  const vals: number[][] = [];
  for (let y = 0; y < IMPACTS.length; y++) {
    for (let x = 0; x < DOMAINS.length; x++) {
      vals.push([x, y, Math.round(20 + Math.random() * 80)]);
    }
  }
  return vals;
}

export default function ImpactHeatmap({ height = 320 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, undefined, { renderer: "canvas" });
    const primary = "var(--primary)";
    const accent = "var(--accent)";
    const axisColor = "var(--text-1)";
    const gridColor = "var(--border-subtle)";
    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      tooltip: { position: "top" },
      grid: { height: "70%", top: 20 },
      xAxis: {
        type: "category",
        data: DOMAINS,
        axisLine: { lineStyle: { color: axisColor } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: gridColor } },
      },
      yAxis: {
        type: "category",
        data: IMPACTS,
        axisLine: { lineStyle: { color: axisColor } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: gridColor } },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        inRange: { color: [primary, accent] },
      },
      series: [{ type: "heatmap", data: makeData(), emphasis: { itemStyle: { borderColor: primary } } }],
    };
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); chart.dispose(); };
  }, [height]);
  return <div ref={ref} style={{ width: "100%", height }} aria-label="Impact heatmap" />;
}
