"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export default function Sparkline({ data = [5, 7, 6, 8, 9, 11, 10] as number[] }) {
  const rows = data.map((v, i) => ({ i, v }));
  return (
    <div className="w-full h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <Line type="monotone" dataKey="v" stroke="#00E5FF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

