
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
  Package,
  Trash2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Promotion } from "@/types";
import {
  getPromotions,
  deletePromotion,
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

  const handleDeletePromotion = async () => {
    if (!promotionToDelete) return;

    try {
      await deletePromotion(promotionToDelete);
      // Refresh the promotions list
      const updatedPromotions = await getPromotions({ companyId });
      setPromotions(updatedPromotions.data);
      toast({
        title: "Success",
        description: "Promotion deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting promotion:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete promotion",
      });
    } finally {
      setPromotionToDelete(null);
    }
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
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-orange-500" />
          </div>
          <h3 className="text-2xl font-medium mb-2">No promotions yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first promotion to start offering incentives to your customers for leaving reviews.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700  transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate("/vendor-dashboard/promotions/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create your first promotion
          </Button>
        </div>
      </div>
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
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700  transition-all duration-200 transform hover:scale-105"
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
            className="pl-10 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-black">
                <SlidersHorizontal className="h-4 w-4 text-black" />
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
                  <PromotionTypeIcon type={type} />
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-black">
              <DropdownMenuLabel><span className="text-black">Sort by</span></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("title")}>
                <div className="flex items-center justify-between w-full text-black">
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
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setPromotionToDelete(promotion.id.toString())}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() =>
                      navigate(
                        `/vendor-dashboard/promotions/edit/${promotion.id}`
                      )
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!promotionToDelete}
        onOpenChange={() => setPromotionToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Promotion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this promotion? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPromotionToDelete(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePromotion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
