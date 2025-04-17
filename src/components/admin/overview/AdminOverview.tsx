import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatsCard from "@/components/vendor/StatsCard";
import { Users, Star as StarIcon, ShoppingCart, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "@/lib/api/admin/admin.api";
import { Skeleton } from "@/components/ui/skeleton";

const AdminOverview = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ["adminStatistics"],
    queryFn: getAdminStatistics,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Vendors"
          value={statistics?.totalVendors.toString() || "0"}
          subtitle="Active vendors"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          trend="up"
          percentage="16.2%"
        />
        <StatsCard
          title="Active Campaigns"
          value={statistics?.activeCampaigns.toString() || "0"}
          subtitle="Across all vendors"
          icon={<ShoppingCart className="h-6 w-6 text-emerald-500" />}
          trend="up"
          percentage="12.4%"
        />
        <StatsCard
          title="Average Rating"
          value={statistics?.averageRating.toString() || "0.0"}
          subtitle="Out of 5"
          icon={<StarIcon className="h-6 w-6 text-amber-500" />}
          trend="up"
          percentage="2.1%"
        />
        <StatsCard
          title="Total Reviews"
          value={statistics?.totalReviews.toLocaleString() || "0"}
          subtitle="All-time collection"
          icon={<Activity className="h-6 w-6 text-purple-500" />}
          trend="up"
          percentage="12.5%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Review Distribution</CardTitle>
            <CardDescription>By rating out of 5 stars</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={statistics?.reviewDistribution || []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Reviews</CardTitle>
            <CardDescription>Last 7 days review activity</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={statistics?.weeklyReviews || []} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>
            Performance metrics across all active campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={statistics?.campaignPerformance || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
