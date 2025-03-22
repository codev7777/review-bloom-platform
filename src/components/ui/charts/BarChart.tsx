
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { ChartContainer } from "./ChartContainer"
import { ChartTooltip, ChartTooltipContent } from "./ChartTooltip"
import type { ChartConfig } from "./ChartContext"

export const BarChart = ({ data }: { data: { name: string; value: number; color?: string }[] }) => {
  const chartConfig = data.reduce((acc, item) => {
    acc[item.name] = { color: item.color || "#3b82f6" };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={chartConfig}>
      <RechartsPrimitive.BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" vertical={false} />
        <RechartsPrimitive.XAxis dataKey="name" />
        <RechartsPrimitive.YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent />
          }
        />
        <RechartsPrimitive.Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </RechartsPrimitive.Bar>
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  );
};
