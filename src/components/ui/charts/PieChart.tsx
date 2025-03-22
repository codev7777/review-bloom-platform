
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { ChartContainer } from "./ChartContainer"
import { ChartTooltip, ChartTooltipContent } from "./ChartTooltip"
import type { ChartConfig } from "./ChartContext"

export const PieChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const chartConfig = data.reduce((acc, item) => {
    acc[item.name] = { color: item.color };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={chartConfig}>
      <RechartsPrimitive.PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <RechartsPrimitive.Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </RechartsPrimitive.Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  );
};
