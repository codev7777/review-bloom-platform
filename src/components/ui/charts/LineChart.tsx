import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "./ChartContainer";
import { ChartTooltip, ChartTooltipContent } from "./ChartTooltip";
import type { ChartConfig } from "./ChartContext";

export const LineChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const chartConfig = {
    value: { color: "#3b82f6" },
  };

  return (
    <div className="w-96">
      <ChartContainer config={chartConfig}>
        <RechartsPrimitive.LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <RechartsPrimitive.CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />
          <RechartsPrimitive.XAxis dataKey="name" />
          <RechartsPrimitive.YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <RechartsPrimitive.Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsPrimitive.LineChart>
      </ChartContainer>
    </div>
  );
};
