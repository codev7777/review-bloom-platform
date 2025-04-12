import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gift,
  CreditCard,
  Tag,
  Download,
  Edit,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Promotion } from "@/types";
import { getPromotions } from "@/lib/api/promotions/promotions.api";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { getImageUrl } from "@/utils/imageUrl";
// Mock promotions data for fallback
const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Summer Gift Card",
    promotionType: "GIFT_CARD",
    description: "A $10 Amazon Gift Card for summer purchases",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Gift+Card",
    companyId: 1,
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    title: "Holiday Discount",
    promotionType: "DISCOUNT_CODE",
    description: "15% off discount code for holiday shopping",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Discount",
    companyId: 1,
    createdAt: "2023-11-20",
  },
  {
    id: "3",
    title: "Product Giveaway",
    promotionType: "FREE_PRODUCT",
    description: "Free kitchen gadget for selected customers",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Free+Product",
    companyId: 1,
    createdAt: "2023-08-05",
  },
  {
    id: "4",
    title: "Cookbook PDF",
    promotionType: "DIGITAL_DOWNLOAD",
    description: "Exclusive cookbook PDF with recipes",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Digital+Download",
    companyId: 1,
    createdAt: "2023-09-12",
  },
];

type SortField = "title" | "promotionType" | "createdAt";
type SortOrder = "asc" | "desc";

const PromotionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "GIFT_CARD":
      return <CreditCard className="h-5 w-5 text-orange-500" />;
    case "DISCOUNT_CODE":
      return <Tag className="h-5 w-5 text-emerald-500" />;
    case "FREE_PRODUCT":
      return <Gift className="h-5 w-5 text-purple-500" />;
    case "DIGITAL_DOWNLOAD":
      return <Download className="h-5 w-5 text-blue-500" />;
    default:
      return <Gift className="h-5 w-5 text-gray-500" />;
  }
};

const PromotionsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Get the current user's company ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId || 1; // Default to 1 if not available

  // Fetch promotions from the backend with companyId
  const {
    data: promotions,
    isLoading,
    error,
    usingMockData,
  } = useFetchWithFallback<Promotion>(getPromotions, MOCK_PROMOTIONS, {
    companyId,
  });

  // Get unique promotion types for filtering
  const promotionTypes = [
    ...new Set(promotions.map((promo) => promo.promotionType)),
  ];

  // Filter promotions
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.promotionType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === null || promotion.promotionType === typeFilter;

    return matchesSearch && matchesType;
  });

  // Sort promotions
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    let comparison = 0;

    if (sortField === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === "promotionType") {
      comparison = a.promotionType.localeCompare(b.promotionType);
    } else if (sortField === "createdAt") {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      comparison = dateA - dateB;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Promotions</h1>
          <p className="text-muted-foreground">
            Manage your promotional offers for review campaigns
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          onClick={() => navigate("/vendor-dashboard/promotions/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search promotions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {typeFilter
                  ? `Type: ${typeFilter.split(" ")[0]}`
                  : "Filter by Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                All Types
              </DropdownMenuItem>
              {promotionTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setTypeFilter(type)}
                >
                  <div className="flex items-center gap-2">
                    <PromotionTypeIcon type={type} />
                    <span>{type}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
                {sortField === "title"
                  ? " by Name"
                  : sortField === "promotionType"
                  ? " by Type"
                  : " by Date"}
                {sortOrder === "asc" ? " (A-Z)" : " (Z-A)"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("title")}>
                <div className="flex items-center justify-between w-full">
                  <span>Name</span>
                  {sortField === "title" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("promotionType")}>
                <div className="flex items-center justify-between w-full">
                  <span>Type</span>
                  {sortField === "promotionType" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("createdAt")}>
                <div className="flex items-center justify-between w-full">
                  <span>Date Created</span>
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        // Loading state
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video w-full bg-gray-100 animate-pulse"></div>
              <CardContent className="p-5">
                <div className="h-5 bg-gray-100 animate-pulse rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-100 animate-pulse rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        // Error state
        <div className="text-center py-12 border rounded-lg">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium">Error loading promotions</h3>
          <p className="text-muted-foreground mt-1">
            {error.message || "There was a problem loading your promotions"}
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      ) : sortedPromotions.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No promotions found</h3>
          <p className="text-muted-foreground">
            {searchQuery || typeFilter
              ? "Try different search or filter criteria"
              : "Get started by creating a promotion"}
          </p>
          <Button
            className="mt-4 bg-orange-500 hover:bg-orange-600"
            onClick={() => navigate("/vendor-dashboard/promotions/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      ) : (
        // Promotions grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPromotions.map((promotion) => (
            <Card
              key={promotion.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-200 h-full"
            >
              <div className="aspect-video w-full overflow-hidden bg-orange-50">
                <img
                  src={getImageUrl(promotion.image)}
                  alt={promotion.title}
                  className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1 text-base">
                      {promotion.title}
                    </h3>
                    <div className="flex items-center mt-1 gap-1">
                      <PromotionTypeIcon type={promotion.promotionType} />
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {promotion.promotionType}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap ml-2"
                  >
                    {formatDate(promotion.createdAt || "")}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {promotion.description}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() =>
                    navigate(
                      `/vendor-dashboard/promotions/edit/${promotion.id}`
                    )
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Promotion
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {usingMockData && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
          <p className="text-sm">
            <strong>Note:</strong> You are currently viewing sample promotion
            data. Connect to the backend to see your actual promotions.
          </p>
        </div>
      )}
    </div>
  );
};

export default PromotionsList;
