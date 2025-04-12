import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  Search,
  Plus,
  Edit,
  Copy,
  ExternalLink,
  CheckCircle,
  XCircle,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Download,
} from "lucide-react";
import { Campaign, mapCampaignForDisplay, CampaignStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QRCode } from "@/components/ui/QRCode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCampaigns } from "@/lib/api/campaigns/campaigns.api";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

type SortField = "name" | "status" | "reviews" | "updatedAt";
type SortOrder = "asc" | "desc";

const CampaignsList: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedQrCode, setSelectedQrCode] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  // Check authentication status
  useEffect(() => {
    console.log("Auth status:", { user, isAuthenticated });
    console.log("Access token:", localStorage.getItem("accessToken"));

    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login");
      navigate("/auth/login");
    }
  }, [isAuthenticated, user, navigate]);

  const { data: campaignsResponse, isLoading } = useQuery({
    queryKey: [
      "campaigns",
      searchQuery,
      statusFilter,
      sortField,
      sortOrder,
      user?.companyId,
    ],
    queryFn: () =>
      getCampaigns({
        title: searchQuery || undefined,
        isActive:
          statusFilter === "active"
            ? "YES"
            : statusFilter === "paused"
            ? "NO"
            : undefined,
        sortBy: sortField,
        sortOrder,
        companyId: user?.companyId,
      }),
    enabled: isAuthenticated && !!user?.companyId,
  });

  console.log("Campaigns Response:", campaignsResponse);
  const campaigns = campaignsResponse?.data || [];
  console.log("Campaigns:", campaigns);

  const extendedCampaigns = campaigns.map((campaign) => {
    console.log("Processing campaign:", campaign);
    const mappedCampaign = mapCampaignForDisplay(campaign);
    return {
      ...mappedCampaign,
      products: mappedCampaign.productIds || [],
      promotionName: mappedCampaign.promotionId || "",
      marketplaces: mappedCampaign.marketplaces || [],
      lastUpdated: mappedCampaign.updatedAt || new Date().toISOString(),
      reviews: mappedCampaign.claims || 0,
    };
  });
  console.log("Extended Campaigns:", extendedCampaigns);

  const filteredCampaigns = extendedCampaigns.filter((campaign) => {
    const matchesSearch =
      (campaign.name || campaign.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (campaign.code || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === null || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  console.log("Filtered Campaigns:", filteredCampaigns);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Campaign URL has been copied to clipboard",
    });
  };

  const showQrCode = (campaign: any) => {
    setSelectedQrCode({
      url: campaign.url,
      name: campaign.name,
    });
    setQrDialogOpen(true);
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
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your review collection campaigns
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          onClick={() => navigate("/vendor-dashboard/campaigns/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("paused")}>
                Paused
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("name")}>
                <div className="flex items-center justify-between w-full">
                  <span>Campaign Name</span>
                  {sortField === "name" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("status")}>
                <div className="flex items-center justify-between w-full">
                  <span>Status</span>
                  {sortField === "status" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("reviews")}>
                <div className="flex items-center justify-between w-full">
                  <span>Reviews</span>
                  {sortField === "reviews" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("updatedAt")}>
                <div className="flex items-center justify-between w-full">
                  <span>Last Updated</span>
                  {sortField === "updatedAt" &&
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

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="hidden lg:table-cell">Promotion</TableHead>
              <TableHead className="hidden lg:table-cell">Reviews</TableHead>
              <TableHead className="hidden sm:table-cell">
                Last Updated
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
                    <h3 className="mt-4 text-lg font-medium">
                      Loading campaigns...
                    </h3>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <QrCode className="h-10 w-10 text-muted-foreground opacity-40" />
                    <h3 className="mt-4 text-lg font-medium">
                      No campaigns found
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {searchQuery || statusFilter
                        ? "Try adjusting your search or filter criteria"
                        : "Get started by creating your first campaign"}
                    </p>
                    {!searchQuery && !statusFilter && (
                      <Button
                        className="mt-4 bg-orange-500 hover:bg-orange-600"
                        onClick={() =>
                          navigate("/vendor-dashboard/campaigns/new")
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">
                        {campaign.name || campaign.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Code: {campaign.code || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "active" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {campaign.status === "active" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {campaign.status ||
                        (campaign.isActive === "YES" ? "active" : "paused")}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {campaign.products && campaign.products.length > 0 ? (
                        campaign.products.map((product, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="font-normal"
                          >
                            {product}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No products
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.promotionName || "N/A"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.reviews || 0}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {formatDate(campaign.lastUpdated)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => showQrCode(campaign)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View QR Code</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyUrl(campaign.url)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                window.open(campaign.url, "_blank")
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                navigate(
                                  `/vendor-dashboard/campaigns/edit/${campaign.id}`
                                )
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Campaign</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedQrCode?.name} QR Code
            </DialogTitle>
          </DialogHeader>

          {selectedQrCode && (
            <div className="flex flex-col items-center justify-center p-4">
              <QRCode
                url={selectedQrCode.url}
                size={280}
                title={`${selectedQrCode.name} Campaign QR Code`}
                showDialog={false}
              />

              <p className="text-sm text-muted-foreground mt-4 text-center">
                Scan this code to access the review funnel for{" "}
                <strong>{selectedQrCode.name}</strong>
              </p>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    const canvas = document.getElementById(
                      "qr-canvas"
                    ) as HTMLCanvasElement;
                    if (canvas) {
                      const link = document.createElement("a");
                      link.download = `${selectedQrCode.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}-qr-code.png`;
                      link.href = canvas.toDataURL("image/png");
                      link.click();

                      toast({
                        title: "QR Code downloaded",
                        description:
                          "The QR code has been saved to your device.",
                      });
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>

                <Button
                  onClick={() => {
                    window.open(selectedQrCode.url, "_blank");
                    setQrDialogOpen(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open URL
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
