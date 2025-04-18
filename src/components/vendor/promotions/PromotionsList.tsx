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
  Info,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [promotionToDelete, setPromotionToDelete] = useState<string | null>(
    null
  );
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
    setData: setPromotions,
    usingMockData,
  } = useFetchWithFallback<Promotion>(getPromotions, [], { companyId });

  // Get unique promotion types for filtering
  const promotionTypes = [
    ...new Set(promotions.map((promo) => promo.promotionType)),
  ];

  // Filter promotions based on search term and type
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      (promotion.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (promotion.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === null || promotion.promotionType === typeFilter;

    return matchesSearch && matchesType;
  });

  // Sort promotions
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
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
      <div className="text-center py-10 border rounded-lg text-white">
        <Info className="mx-auto h-10 w-10 text-white opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No promotions found</h3>
        <p className="mt-1 text-sm text-white">
          Add a promotion to get started
        </p>
        <Button
          variant="outline"
          className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50"
          onClick={() => navigate("/vendor-dashboard/promotions/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add your first promotion
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Promotions</h1>
          <p className="text-white">
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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
          <Input
            placeholder="Search promotions..."
            className="pl-10 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-black">
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
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-black">
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
            <DropdownMenuContent align="end" className="text-black">
              <DropdownMenuLabel className="text-black">
                Sort by
              </DropdownMenuLabel>
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
                  <span>Date Added</span>
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

      {/* Promotions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPromotions.map((promotion) => (
          // <Card
          //   key={promotion.id}
          //   className="overflow-hidden hover:shadow-md transition-shadow duration-200 h-full"
          // >
          //   <div className="aspect-video w-full overflow-hidden bg-orange-50">
          //     <img
          //       src={getImageUrl(promotion.image)}
          //       alt={promotion.title}
          //       className="h-full w-full object-contain transition-transform duration-200 hover:scale-105"
          //     />
          //   </div>
          //   <CardContent className="p-5">
          //     <div className="flex items-start justify-between">
          //       <div className="flex-1">
          //         <h3 className="font-medium line-clamp-1 text-base">
          //           {promotion.title}
          //         </h3>
          //         <div className="flex items-center mt-1 gap-1">
          //           <PromotionTypeIcon type={promotion.promotionType} />
          //           <span className="text-xs text-black line-clamp-1">
          //             {promotion.promotionType}
          //           </span>
          //         </div>
          //       </div>
          //       <Badge
          //         variant="outline"
          //         className="text-xs whitespace-nowrap ml-2"
          //       >
          //         {formatDate(promotion.createdAt || "")}
          //       </Badge>
          //     </div>

          //     <p className="text-sm text-black mt-3 line-clamp-2">
          //       {promotion.description}
          //     </p>

          //     <Button
          //       variant="outline"
          //       size="sm"
          //       className="mt-4 w-full"
          //       onClick={() =>
          //         navigate(`/vendor-dashboard/promotions/edit/${promotion.id}`)
          //       }
          //     >
          //       <Edit className="mr-2 h-4 w-4" />
          //       Edit Promotion
          //     </Button>
          //   </CardContent>
          // </Card>
          <div className="card bg-base-100 w-96 shadow-sm border-gray-700 rounded-3xl border m-2 text-white ">
            <figure>
              <img
                src={
                  promotion?.image
                    ? getImageUrl(promotion.image)
                    : `https://placehold.co/200x200/FFF5E8/FF9130?text=${encodeURIComponent(
                        promotion.title
                      )}`
                }
                className="w-full h-48 object-contain bg-gray-700 rounded-t-3xl"
                alt="Shoes"
              />
            </figure>
            <div className="card-body m-4">
              <h2 className="card-title text-2xl">
                {promotion.title}
                {/* <div className="badge badge-secondary">NEW</div> */}
              </h2>
              <div className="flex items-center mt-1 gap-1">
                <PromotionTypeIcon type={promotion.promotionType} />
                <span className="text-xs line-clamp-1">
                  {promotion.promotionType}
                </span>
              </div>
              <p className="text-sm mt-3 line-clamp-2">
                {promotion.description}
              </p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {/* {promotion || 0} reviews */}
                </div>
                <div className="badge badge-outline">
                  Added:{" "}
                  {promotion.createdAt
                    ? new Date(promotion.createdAt).toLocaleDateString("en-US")
                    : new Date().toLocaleDateString("en-US")}
                </div>
              </div>
            </div>
          </div>
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
