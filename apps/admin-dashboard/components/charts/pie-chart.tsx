"use client";

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

export type PieChartPoint = {
  label: string;
  value: number;
};

export type PieChartProps = {
  data: PieChartPoint[];
  title?: string;
};

export function PieChart({ data, title }: PieChartProps) {
  return (
    <div className="space-y-2">
      {title ? <h3 className="text-sm font-medium text-muted-foreground">{title}</h3> : null}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={90} label>
              {data.map((entry, index) => (
                <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
