import { Line, LineChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface EmotionPoint {
  over: number;
  excitement: number;
  tension: number;
  surprise: number;
  disappointment: number;
}

interface FansProps {
  em: EmotionPoint[];
  m: { overRuns: number[] };
}

const colors = [
  ["excitement", "#6366f1"],
  ["tension", "#a78bfa"],
  ["surprise", "#38bdf8"],
  ["disappointment", "#f87171"],
];

export default function Fans({ em, m }: FansProps) {
  const momentum = m.overRuns.map((runs, index) => ({ over: index + 1, runs }));
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-2 text-xs text-amber-300">SIMULATED audience emotion data, not a real measurement.</p>
        <h2 className="font-semibold">Crowd Emotion Radar</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={em}>
              <XAxis dataKey="over" />
              <YAxis />
              <Tooltip />
              <Legend />
              {colors.map(([key, color]) => <Line key={key} dataKey={key} stroke={color} dot={false} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h2 className="font-semibold">Momentum (runs per over)</h2>
        <div className="h-48">
          <ResponsiveContainer>
            <LineChart data={momentum}>
              <XAxis dataKey="over" />
              <YAxis />
              <Tooltip />
              <Line dataKey="runs" stroke="#38bdf8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
