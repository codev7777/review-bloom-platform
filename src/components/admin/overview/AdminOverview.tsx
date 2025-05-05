import { LineChart } from "@/components/ui/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subDays, format, isSameDay } from "date-fns";
import { BarChart, PieChart } from "@mantine/charts";
import StatsCard from "@/components/vendor/StatsCard";
import { Users, Star as StarIcon, ShoppingCart, Activity, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "@/lib/api/admin/admin.api";
import { Skeleton } from "@/components/ui/skeleton";
import { getReviews } from "@/lib/api/reviews/reviews.api";
import { Company, Review } from "@/types";
import RecentReviews from "@/components/vendor/analytics/RecentReviews";
import { getCompanies } from "@/lib/api/companies/companies.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentCompaniesProps {
  companies: Company[];
}
const RecentCompanies = ({ companies }: RecentCompaniesProps) => {
  const sorted = companies.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const mostRecent5 = sorted.slice(0, 5);

  return (
    <Card className="col-span-4 h-96">
      <CardHeader>
        <CardTitle>Recent Companies</CardTitle>
      </CardHeader>
      <CardContent>
        {mostRecent5.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Campaings</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mostRecent5.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.Products?.length}</TableCell>
                  <TableCell>{company.campaigns?.length}</TableCell>
                  <TableCell>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground mt-12">
            <Building2 className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium">No recent companies</p>
            <p className="text-lg">New companies will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AdminOverview = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ["adminStatistics"],
    queryFn: getAdminStatistics,
  });
  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: () =>
      getCompanies({ page: 1, limit: 100, search: "", sortType: "desc" }),
  });
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i); // ensures order is oldest -> newest
    return {
      date,
      label: format(date, "M/dd"), // or "yyyy-MM-dd" if you want ISO format
    };
  });
  // Step 2: Count reviews per day
  const companiesChartData = last7Days.map(({ date, label }) => {
    const count = companies?.companies?.filter((company: Company) =>
      isSameDay(new Date(company.createdAt), date)
    ).length;
    return {
      name: label,
      value: count,
    };
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
    <div className="space-y-10 p-0 lg:p-6 pb-16 text-black ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10">
        <StatsCard
          title="Total Vendors"
          value={statistics?.totalVendors.toString() || "0"}
          subtitle="Active vendors"
          icon={<Users className="h-6 w-6 text-[#3acbe8]" />}
          trend="up"
          percentage="16.2%"
          bgColor="bg-[#7c41f5]"
        />
        <StatsCard
          title="Active Campaigns"
          value={statistics?.activeCampaigns.toString() || "0"}
          subtitle="Across all vendors"
          icon={<ShoppingCart className="h-6 w-6 text-[#7c41f5]" />}
          trend="up"
          percentage="12.4%"
          bgColor="bg-[#f4c424]"
        />
        <StatsCard
          title="Average Rating"
          value={statistics?.averageRating.toString() || "0.0"}
          subtitle="Out of 5"
          icon={<StarIcon className="h-6 w-6 text-white" />}
          trend="up"
          percentage="2.1%"
          bgColor="bg-[#ff9062]"
        />
        <StatsCard
          title="Total Reviews"
          value={statistics?.totalReviews.toLocaleString() || "0"}
          subtitle="All-time collection"
          icon={<Activity className="h-6 w-6 text-purple-500" />}
          trend="up"
          percentage="12.5%"
          bgColor="bg-[#3acbe8]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-0 ">
        {/* <ReviewsChart data={reviewsChartData} />*/}
        <div className="p-4 mt-10">
          <h1 className="text-2xl font-semibold mb-8 ">
            Companies from the past 7 days
          </h1>
          <BarChart
            h={300}
            data={companiesChartData}
            dataKey="name"
            series={[{ name: "value", color: "orange" }]}
          />
        </div>

        <div className="mt-10">
          <RecentCompanies companies={companies?.companies || []} />
        </div>
        {/* <PieChart
          withTooltip
          tooltipDataSource="segment"
          tooltipProps={{
            content: ({ payload }: any) => {
              if (!payload || payload.length === 0) return null;
              const data = payload[0].payload;
              return (
                <div
                  style={{
                    background: "white",
                    padding: "4px",
                    borderRadius: "4px",
                  }}
                >
                  ⭐ {data.name}: {data.value}
                </div>
              );
            },
          }}
          data={formattedRatioCounts}
        /> */}
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2">
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
      </div> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>
            Performance metrics across all active campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={statistics?.campaignPerformance || []} />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default AdminOverview;
