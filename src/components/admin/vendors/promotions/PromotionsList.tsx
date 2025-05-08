
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Gift,
  CreditCard,
  Tag,
  Download,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Promotion } from "@/types";
import {
  getPromotionByUserId,
} from "@/lib/api/promotions/promotions.api";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { getImageUrl } from "@/utils/imageUrl";

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
  const params = useParams();
  const navigate = useNavigate();
  const companyId = params.id;
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Fetch promotions from the backend with companyId
  const {
    data: promotions,
    isLoading,
    setData: setPromotions,
    usingMockData,
  } = useFetchWithFallback<Promotion>(getPromotionByUserId, [], { companyId });

  // Sort promotions
  const sortedPromotions = [...promotions].sort((a, b) => {
    let comparison = 0;

    if (sortField === "title") {
      comparison = (a.title || "").localeCompare(b.title || "");
    } else if (sortField === "promotionType") {
      comparison = (a.promotionType || "").localeCompare(b.promotionType || "");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  if (promotions.length === 0) {
    return (
      <>
      <Button
          variant="outline"
          className="ml-auto flex items-center gap-1 mb-4"
          onClick={() => navigate(`/admin-dashboard/vendors`)}
        >
          <span className="hidden sm:inline">Go to Vendor</span>
        </Button>
        <div className="flex items-center justify-center h-96 text-black">
          <div className="text-center max-w-md">
            <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-medium mb-2">No promotions yet</h3>
          </div>
        </div>
      </>
      
    );
  }

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Promotions</h1>
          <p className="text-muted-foreground">
            Manage your promotional offers for review campaigns
          </p>
        </div>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-1 mb-4"
          onClick={() => navigate(`/admin-dashboard/vendors`)}
        >
          <span className="hidden sm:inline">Go to Vendor</span>
        </Button>
      </div>

      {/* Promotions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPromotions.map((promotion) => (
          <Card key={promotion.id} className="overflow-hidden transition-all duration-200 hover:shadow-md border-opacity-40 flex flex-col h-full">
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
              <img
                src={
                  promotion?.image
                    ? getImageUrl(promotion.image)
                    : `https://placehold.co/600x400/FFF5E8/FF9130?text=${encodeURIComponent(
                        promotion.title
                      )}`
                }
                alt={promotion.title}
                className="h-full w-full object-contain transition-transform duration-200 hover:scale-105 bg-gray-400"
              />
              <Badge
                variant="secondary"
                className="absolute top-3 right-3 font-medium bg-white/90 dark:bg-gray-800/90 shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-black">
                  <PromotionTypeIcon type={promotion.promotionType} />
                  <span>{promotion.promotionType}</span>
                </div>
              </Badge>
            </div>
            
            <CardContent className="flex flex-col flex-grow p-5">
              <h3 className="text-lg font-medium mb-2 line-clamp-1">
                {promotion.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                {promotion.description}
              </p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-xs text-muted-foreground">
                  Added: {formatDate(promotion.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
