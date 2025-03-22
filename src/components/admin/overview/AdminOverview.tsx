
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatsCard from "@/components/vendor/StatsCard";
import { Users, Star as StarIcon, ShoppingCart, Activity } from "lucide-react";

const AdminOverview = () => {
  // Mock data for the dashboard
  const recentStatistics = {
    vendors: 48,
    campaigns: 156,
    avgRating: 4.7,
    totalReviews: 1487,
    weeklyGrowth: 12.5,
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Vendors"
          value={recentStatistics.vendors.toString()}
          description="+8 this month"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          trend="up"
          percentage="16.2%"
        />
        <StatsCard
          title="Active Campaigns"
          value={recentStatistics.campaigns.toString()}
          description="Across all vendors"
          icon={<ShoppingCart className="h-6 w-6 text-emerald-500" />}
          trend="up"
          percentage="12.4%"
        />
        <StatsCard
          title="Average Rating"
          value={recentStatistics.avgRating.toString()}
          description="Out of 5"
          icon={<StarIcon className="h-6 w-6 text-amber-500" />}
          trend="up"
          percentage="2.1%"
        />
        <StatsCard
          title="Total Reviews"
          value={recentStatistics.totalReviews.toLocaleString()}
          description="All-time collection"
          icon={<Activity className="h-6 w-6 text-purple-500" />}
          trend="up"
          percentage={`${recentStatistics.weeklyGrowth}%`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Review Distribution</CardTitle>
            <CardDescription>By rating out of 5 stars</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                { name: "5 stars", value: 645, color: "#16a34a" },
                { name: "4 stars", value: 488, color: "#22c55e" },
                { name: "3 stars", value: 187, color: "#facc15" },
                { name: "2 stars", value: 107, color: "#f97316" },
                { name: "1 star", value: 60, color: "#ef4444" },
              ]}
            />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Weekly Reviews</CardTitle>
            <CardDescription>Last 7 days review activity</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { name: "Mon", value: 24 },
                { name: "Tue", value: 18 },
                { name: "Wed", value: 32 },
                { name: "Thu", value: 27 },
                { name: "Fri", value: 35 },
                { name: "Sat", value: 22 },
                { name: "Sun", value: 15 },
              ]}
            />
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Performance metrics across all active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={[
                { name: "QR Scans", value: 2871, color: "#3b82f6" },
                { name: "Form Views", value: 1952, color: "#8b5cf6" },
                { name: "Reviews Submitted", value: 1487, color: "#ec4899" },
                { name: "Amazon Redirects", value: 1089, color: "#f97316" },
                { name: "Email Collected", value: 876, color: "#14b8a6" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
