import React from "react";
import { LineChart } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";

interface ReviewsChartProps {
  data: { name: string; value: number }[];
}

const ReviewsChart = ({ data }: ReviewsChartProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Reviews Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <LineChart data={data} />
        <BarChart data={data} />
      </CardContent>
    </Card>
  );
};

export default ReviewsChart;
