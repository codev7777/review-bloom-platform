import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart4,
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
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { Campaign, mapCampaignForDisplay } from "@/types";
import { getCampaigns } from "@/lib/api/campaigns/campaigns.api";
import { getProducts } from "@/lib/api/products/products.api";
import { getReviews } from "@/lib/api/reviews/reviews.api";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import CampaignCard from "./CampaignCard";
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
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { API_URL } from "@/config/env";
import { getPromotions } from "@/lib/api/promotions/promotions.api";
import ReviewsPage from "@/pages/vendor/ReviewsPage";
import { getImageUrl } from "@/utils/imageUrl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getCompanyStats, CompanyStats } from "@/lib/api/company/company.api";

// Update Campaign type to include missing properties
interface DashboardCampaign extends Omit<Campaign, "reviews"> {
  image?: string;
  reviews?: number; // Override reviews to be a number instead of Review[]
  rating?: number;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/vendor-dashboard",
    },
    // {
    //   icon: <BarChart4 size={20} />,
    //   label: "Analytics",
    //   path: "/vendor-dashboard/analytics",
    // },
    {
      icon: <ShoppingBag size={20} />,
      label: "Products",
      path: "/vendor-dashboard/products",
    },
    {
      icon: <QrCode size={20} />,
      label: "Campaigns",
      path: "/vendor-dashboard/campaigns",
    },
    {
      icon: <Gift size={20} />,
      label: "Promotions",
      path: "/vendor-dashboard/promotions",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Reviews",
      path: "/vendor-dashboard/reviews",
    },
    {
      icon: <SettingsIcon size={20} />,
      label: "Settings",
      path: "/vendor-dashboard/settings",
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
      } bg-white border-r border-border`}
    >
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-foreground md:hidden"
        >
          <X size={24} />
        </button>
      )}

      <div className="flex flex-col h-full py-6 mt-16">
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start hover:text-orange-500 hover:bg-orange-50"
              onClick={() => {
                navigate(item.path);
                if (isMobile) toggleSidebar();
              }}
            >
              <span className="mr-3">{item.icon}</span>
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
  console.log("Company ID:", companyId);

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

  // Calculate statistics from real data
  const activeCampaigns =
    campaigns?.data?.filter((c) => c.isActive === "YES").length || 0;
  const totalProducts = products?.data?.length || 0;
  const totalReviews = reviews?.total || 0;
  console.log(reviews);
  // console.log(reviews.reviews.data);
  // console.log(reviews.reviews.data.length);
  const averageRating = reviews?.total
    ? (
        reviews.reviews.reduce((sum, review) => sum + review.ratio, 0) /
        reviews.total
      ).toFixed(1)
    : "0.0";

  // Add a query to fetch company stats
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate("/vendor-dashboard/campaigns/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                totalReviews || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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
        />
        <StatsCard
          title="Active Campaigns"
          value={activeCampaigns.toString()}
          change="+0"
          changeType="neutral"
          period="from last month"
        />
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
            <p className="text-muted-foreground">
              No campaigns found. Create your first campaign to get started!
            </p>
            <Button
              className="mt-4 bg-orange-500 hover:bg-orange-600"
              onClick={() => navigate("/vendor-dashboard/campaigns/new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns?.data?.slice(0, 3).map((campaign) => {
              const displayCampaign = mapCampaignForDisplay(campaign);
              return (
                <CampaignCard
                  key={displayCampaign.id}
                  name={displayCampaign.name || displayCampaign.title}
                  image={
                    displayCampaign.promotion?.image
                      ? getImageUrl(displayCampaign.promotion?.image)
                      : `https://placehold.co/200x200/FFF5E8/FF9130?text=${encodeURIComponent(
                          displayCampaign.name || displayCampaign.title
                        )}`
                  }
                  status={
                    displayCampaign.status ||
                    (displayCampaign.isActive === "YES" ? "active" : "paused")
                  }
                  reviews={displayCampaign.claims || 0}
                  rating={displayCampaign.claims || 0}
                  date={displayCampaign.createdAt || new Date().toISOString()}
                />
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

  const campaigns = campaignsResponse?.data || [];
  const products = productsResponse?.data || [];
  const promotions = promotionsResponse?.data || [];

  // Calculate statistics
  const activeCampaigns = campaigns.filter((c) => c.isActive === "YES").length;
  const totalProducts = products.length;
  const totalPromotions = promotions.length;
  const totalClaims = campaigns.reduce((sum, c) => sum + (c.claims || 0), 0);

  // Check connectivity to backend on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
          toast({
            title: "Backend connection successful",
            description: `Connected to ${API_URL} backend API`,
          });
        } else {
          throw new Error("Failed to connect to backend");
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          description: `Using mock data. Please ensure backend at ${API_URL} is running.`,
        });
      }
    };

    checkBackendConnection();
  }, [toast]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log(products);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
        <VendorNavbar />
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 bg-white p-2 rounded-md shadow-sm"
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
