import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  QrCode,
  Settings as SettingsIcon,
  Menu,
  X,
  Plus,
  Gift,
  MessageSquare,
  ClipboardList,
  Star,
  Home,
  CircleHelp
} from "lucide-react";
import { subDays, format, isSameDay } from "date-fns";
import { BarChart } from "@mantine/charts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { mapCampaignForDisplay, Review } from "@/types";
import { getCampaigns } from "@/lib/api/campaigns/campaigns.api";
import { getProducts } from "@/lib/api/products/products.api";
import { getReviews } from "@/lib/api/reviews/reviews.api";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import ProductsList from "./products/ProductsList";
import ProductForm from "./products/ProductForm";
import CampaignsList from "./campaigns/CampaignsList";
import CampaignForm from "./campaigns/CampaignForm";
import AnalyticsPanel from "./analytics/AnalyticsPanel";
import SettingsPanel from "./settings/SettingsPanel";
import VendorNavbar from "./VendorNavbar";
import PromotionsList from "./promotions/PromotionsList";
import PromotionForm from "./promotions/PromotionForm";
import { API_URL } from "@/config/env";
import { getPromotions } from "@/lib/api/promotions/promotions.api";
import ReviewsPage from "@/pages/vendor/ReviewsPage";
import { getImageUrl } from "@/utils/imageUrl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getCompanyStats, CompanyStats } from "@/lib/api/company/company.api";
import RecentReviews from "./analytics/RecentReviews";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const menuItemsHeader = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/vendor-dashboard",
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Products",
      path: "/vendor-dashboard/products",
    },
    {
      icon: <Gift size={20} />,
      label: "Promotions",
      path: "/vendor-dashboard/promotions",
    },
    {
      icon: <QrCode size={20} />,
      label: "Campaigns",
      path: "/vendor-dashboard/campaigns",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Reviews",
      path: "/vendor-dashboard/reviews",
    },
  ];
  const menuItemsFooter = [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "/",
    },
    {
      icon: <SettingsIcon size={20} />,
      label: "Settings",
      path: "/vendor-dashboard/settings",
    },
    {
      icon: <CircleHelp size={20} />,
      label: "Help",
      path: "/help",
    },
  ];

  return (
    <aside
      className={`${
        isMobile
          ? `fixed inset-y-0 left-0 z-50 w-64 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`
          : "sticky top-0 h-screen w-64 flex-shrink-0"
      }  bg-[#212631] border-r border-gray-700 text-white font-medium`}
    >
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-white md:hidden"
        >
          <X size={24} />
        </button>
      )}

      <div className="flex flex-col justify-between py-6 mt-16 h-[calc(100%-64px)]">
        <nav className="space-y-1 px-3">
          {menuItemsHeader.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start hover:text-orange-500 hover:bg-orange-50"
              onClick={() => {
                navigate(item.path);
                if (isMobile) toggleSidebar();
              }}
            >
              <span className="mr-3 text-orange-600">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        <nav className="space-y-1 px-3">
          {menuItemsFooter.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start hover:text-orange-500 hover:bg-orange-50"
              onClick={() => {
                navigate(item.path);
                if (isMobile) toggleSidebar();
              }}
            >
              <span className="mr-3 text-orange-600">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const companyId = user?.companyId ? parseInt(user.companyId, 10) : undefined;

  const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ["campaigns", companyId],
    queryFn: () => getCampaigns({ companyId }),
    enabled: !!companyId,
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", companyId],
    queryFn: () => getProducts({ companyId }),
    enabled: !!companyId,
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["reviews", companyId],
    queryFn: () => getReviews({ companyId }),
    enabled: !!companyId,
  });

  const activeCampaigns =
    campaigns?.data?.filter((c) => c.isActive === "YES").length || 0;
  const totalProducts = products?.data?.length || 0;
  const totalReviews = reviews?.total || 0;
  const averageRating = reviews?.total
    ? (
        reviews.reviews.reduce((sum, review) => sum + review.ratio, 0) /
        reviews.total
      ).toFixed(1)
    : "0.0";

  const {
    data: companyStats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useQuery<CompanyStats>({
    queryKey: ["companyStats", companyId],
    queryFn: () => getCompanyStats(companyId),
    enabled: !!companyId,
  });

  if (statsError) {
    console.error("Error fetching company stats:", statsError);
  }

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i); // ensures order is oldest -> newest
    return {
      date,
      label: format(date, "M/dd"), // or "yyyy-MM-dd" if you want ISO format
    };
  });

  // Step 2: Count reviews per day
  const reviewsChartData = last7Days.map(({ date, label }) => {
    const count = reviews?.reviews?.filter((review: Review) =>
      isSameDay(new Date(review.feedbackDate), date)
    ).length;

    return {
      name: label,
      value: count,
    };
  });
  // const ratioCounts = [1, 2, 3, 4, 5].map((ratio, index) => ({
  //   name: ratio.toString(),
  //   value: reviews.reviews.filter((r: Review) => r.ratio === ratio).length,
  //   color: ["red", "orange", "yellow", "green", "blue"][index], // Assign a color for each ratio
  // }));

  const formattedRatioCounts = [1, 2, 3, 4, 5].map((ratio, index) => {
    const count = reviews?.reviews?.filter(
      (r: Review) => r.ratio === ratio
    ).length;
    return {
      name: `⭐ ${ratio}: ${count}`, // <- label will include both
      value: count,
      color: ["red", "orange", "yellow", "green", "blue"][index], // if you're using custom colors
      label: `⭐ ${ratio}: ${count}`,
    };
  });
  return (
    <div className="space-y-8 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
          onClick={() => navigate("/vendor-dashboard/campaigns/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-white">
        <Card className="bg-[#6c66d3] border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
            <CardTitle className="text-sm font-medium text-white ">
              Total Reviews
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {isLoadingStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                totalReviews || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#3589d4] border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium text-white">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-whtie" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {isLoadingStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                averageRating || "0.0"
              )}
            </div>
          </CardContent>
        </Card>

        <StatsCard
          title="Total Products"
          value={totalProducts.toString()}
          change="+0"
          changeType="neutral"
          period="from last month"
          bgColor="bg-[#eb9b19]"
        />
        <StatsCard
          title="Active Campaigns"
          value={activeCampaigns.toString()}
          change="+0"
          changeType="neutral"
          period="from last month"
          bgColor="bg-[#d54747]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <ReviewsChart data={reviewsChartData} />*/}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-8 ">
            Reviews from the past 7 days
          </h1>
          <BarChart
            h={300}
            data={reviewsChartData}
            dataKey="name"
            series={[{ name: "value", color: "orange" }]}
          />
        </div>

        <div>
          <RecentReviews reviews={reviews?.reviews || []} />
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

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Recent Campaigns</h2>
        {isLoadingCampaigns ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
            <div className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
            <div className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
          </div>
        ) : campaigns?.data?.length === 0 ? (
          <div className="text-center py-12">
            <p>
              No campaigns found. Create your first campaign to get started!
            </p>
            <Button
             className="mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
             onClick={() => navigate("/vendor-dashboard/campaigns/new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns?.data?.slice(0, 3).map((campaign, index) => {
              const displayCampaign = mapCampaignForDisplay(campaign);
              return (
                <div className="card bg-base-100 w-max-96 shadow-sm border-gray-700 rounded-3xl border m-2 text-black" key={index}>
                  <figure>
                    <img
                      src={
                        displayCampaign.promotion?.image
                          ? getImageUrl(displayCampaign.promotion?.image)
                          : `https://placehold.co/200x200/FFF5E8/FF9130?text=${encodeURIComponent(
                              displayCampaign.name || displayCampaign.title
                            )}`
                      }
                      className="w-full h-48 object-contain bg-gray-700 rounded-t-3xl"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body m-4">
                    <h2 className="card-title text-2xl">
                      {displayCampaign.title}
                      {/* <div className="badge badge-secondary">NEW</div> */}
                    </h2>
                    <p>{displayCampaign.description}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">
                        {displayCampaign.claims || 0} reviews
                      </div>
                      <div className="badge badge-outline">
                        Added:{" "}
                        {displayCampaign.createdAt
                          ? new Date(
                              displayCampaign.createdAt
                            ).toLocaleDateString("en-US")
                          : new Date().toLocaleDateString("en-US")}
                      </div>
                    </div>
                  </div>
                </div>
                // <CampaignCard
                //   key={displayCampaign.id}
                //   name={displayCampaign.name || displayCampaign.title}
                //   image={
                // displayCampaign.promotion?.image
                //   ? getImageUrl(displayCampaign.promotion?.image)
                //   : `https://placehold.co/200x200/FFF5E8/FF9130?text=${encodeURIComponent(
                //       displayCampaign.name || displayCampaign.title
                //     )}`
                //   }
                //   status={
                //     displayCampaign.status ||
                //     (displayCampaign.isActive === "YES" ? "active" : "paused")
                //   }
                //   reviews={displayCampaign.claims || 0}
                //   rating={displayCampaign.claims || 0}
                //   date={displayCampaign.createdAt || new Date().toISOString()}
                // />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const VendorDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const { data: campaignsResponse } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });

  const { data: productsResponse } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const { data: promotionsResponse } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => getPromotions(),
  });

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
          // toast({
          //   title: "Backend connection successful",
          //   description: `Connected to ${API_URL} backend API`,
          // });
        } else {
          throw new Error("Failed to connect to backend");
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          // description: `Using mock data. Please ensure backend at ${API_URL} is running.`,
        });
      }
    };

    checkBackendConnection();
  }, [toast]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen  bg-[#212631] text-white">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-y-auto  bg-[#e3e6e6] flex flex-col">
        <VendorNavbar />
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 bg-white p-2 rounded-md shadow-sm text-black"
          >
            <Menu size={24} />
          </button>
        )}

        <div className="px-6 py-8 max-w-7xl mx-auto w-full mt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<AnalyticsPanel />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/campaigns" element={<CampaignsList />} />
            <Route path="/campaigns/new" element={<CampaignForm />} />
            <Route path="/campaigns/edit/:id" element={<CampaignForm />} />
            <Route path="/promotions" element={<PromotionsList />} />
            <Route path="/promotions/new" element={<PromotionForm />} />
            <Route path="/promotions/edit/:id" element={<PromotionForm />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/settings" element={<SettingsPanel />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
