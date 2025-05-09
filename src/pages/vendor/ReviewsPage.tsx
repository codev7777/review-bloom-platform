import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Review, Campaign, Product } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReviews, updateReviewStatus } from "@/lib/api/reviews/reviews.api";
import { StarIcon, MoreHorizontal, DownloadIcon, MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCampaigns } from "@/lib/api/campaigns/campaigns.api";
import ReactSelect from "react-select";

const mockReviews = [
  {
    id: "rev-001",
    productName: "Premium Kitchen Knife Set",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    rating: 5,
    comment:
      "These knives are incredible! They're sharp, well-balanced, and the block looks great on my counter.",
    feedback: "Great purchase, would recommend to others!",
    date: "2023-08-15",
    platform: "amazon",
    status: "verified",
    responded: true,
  },
  {
    id: "rev-002",
    productName: "Wireless Bluetooth Headphones",
    customerName: "Michael Chen",
    email: "mchen@example.com",
    rating: 4,
    comment:
      "Great sound quality and battery life. The noise cancellation works well in most environments.",
    feedback: "Comfortable for long periods, but ear cups could be better.",
    date: "2023-08-12",
    platform: "amazon",
    status: "verified",
    responded: false,
  },
  {
    id: "rev-003",
    productName: "Yoga Mat",
    customerName: "Jessica Williams",
    email: "jwilliams@example.com",
    rating: 5,
    comment:
      "Perfect thickness and grip! I use it daily and it's holding up extremely well.",
    feedback: "No more slipping during downward dog. Very happy!",
    date: "2023-08-10",
    platform: "amazon",
    status: "verified",
    responded: true,
  },
  {
    id: "rev-004",
    productName: "Smart Watch",
    customerName: "Robert Garcia",
    email: "r.garcia@example.com",
    rating: 5,
    comment:
      "This smart watch exceeded my expectations. Battery life is amazing.",
    feedback:
      "Health tracking features are spot on. The interface is intuitive and responsive.",
    date: "2023-08-05",
    platform: "amazon",
    status: "unverified",
    responded: false,
  },
  {
    id: "rev-005",
    productName: "Electric Kettle",
    customerName: "Emily White",
    email: "e.white@example.com",
    rating: 3,
    comment:
      "Heats water quickly and efficiently. Great design, but the lid is a bit tricky to open.",
    feedback: "Works as expected, but there's room for improvement.",
    date: "2023-08-01",
    platform: "amazon",
    status: "verified",
    responded: false,
  },
  {
    id: "rev-006",
    productName: "Portable Bluetooth Speaker",
    customerName: "David Thompson",
    email: "dthompson@example.com",
    rating: 2,
    comment:
      "Sound quality is average at best. Battery drains quickly when volume is high.",
    feedback: "Not worth the price. Looking for a replacement already.",
    date: "2023-07-28",
    platform: "amazon",
    status: "verified",
    responded: true,
  },
  {
    id: "rev-007",
    productName: "Air Fryer",
    customerName: "Jennifer Lopez",
    email: "j.lopez@example.com",
    rating: 5,
    comment:
      "Game changer in my kitchen! Everything comes out crispy and delicious.",
    feedback: "So easy to use and clean. Best purchase I've made this year.",
    date: "2023-07-25",
    platform: "amazon",
    status: "verified",
    responded: false,
  },
  {
    id: "rev-008",
    productName: "Wireless Mouse",
    customerName: "Thomas Wright",
    email: "twright@example.com",
    rating: 4,
    comment: "Responsive and comfortable. Battery life is excellent.",
    feedback: "Great for everyday use, but not ideal for gaming.",
    date: "2023-07-20",
    platform: "amazon",
    status: "unverified",
    responded: false,
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const statusColor = (status: string) => {
  return status === "PENDING"
    ? "bg-gray-300 text-gray-900"
    : status === "PROCESSED"
    ? "bg-blue-300 text-blue-900"
    : "bg-red-300 text-red-900";
};

const ReviewsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState<string>("feedbackDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const companyId = user?.companyId
    ? parseInt(user.companyId.toString(), 10)
    : undefined;
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { data: reviewsResponse, isLoading } = useQuery({
    queryKey: [
      "reviews",
      companyId,
      statusFilter,
      selectedCampaigns,
      selectedProducts,
      sortField,
      sortOrder,
      page,
      limit,
    ],
    queryFn: () =>
      getReviews({
        companyId,
        status: statusFilter || undefined,
        campaignIds: selectedCampaigns.length > 0 ? selectedCampaigns : undefined,
        productIds: selectedProducts.length > 0 ? selectedProducts : undefined,
        sortBy: sortField,
        sortOrder,
        page,
        limit,
      }),
    enabled: !!companyId,
  });

  useEffect(() => {
    if (companyId) {
      getCampaigns({ companyId }).then(({ data }) => {
        setAllCampaigns(data);
        // Collect all products from all campaigns
        const products: Product[] = [];
        data.forEach((campaign) => {
          if (campaign.products && Array.isArray(campaign.products)) {
            campaign.products.forEach((product) => {
              if (!products.find((p) => p.id === product.id)) {
                products.push(product);
              }
            });
          }
        });
        setAllProducts(products);
      });
    }
  }, [companyId]);

  useEffect(() => {
    if (selectedCampaigns.length > 0) {
      // Find products from selected campaigns
      const products: Product[] = [];
      allCampaigns.forEach((campaign) => {
        if (selectedCampaigns.includes(Number(campaign.id)) && campaign.products) {
          campaign.products.forEach((product) => {
            if (!products.find((p) => p.id === product.id)) {
              products.push(product);
            }
          });
        }
      });
      setAvailableProducts(products);
    } else {
      setAvailableProducts(allProducts);
    }
  }, [selectedCampaigns, allCampaigns, allProducts]);

  const updateStatusMutation = useMutation({
    mutationFn: ({
      reviewId,
      status,
    }: {
      reviewId: number;
      status: "PENDING" | "PROCESSED" | "REJECTED";
    }) => updateReviewStatus(reviewId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", companyId] });
      toast({
        title: "Success",
        description: "Review status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive",
      });
    },
  });

  const reviews = reviewsResponse?.reviews || [];

  // Filter reviews by search, campaign, and product
  const filteredReviews = reviews
    .filter((review: Review) =>
      review.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((review: Review) =>
      selectedCampaigns.length === 0 ||
      (review.Campaign && selectedCampaigns.includes(Number(review.Campaign.id)))
    )
    .filter((review: Review) =>
      selectedProducts.length === 0 ||
      (review.Product && selectedProducts.includes(Number(review.Product.id)))
    );

  const handleStatusChange = (
    reviewId: number,
    status: "PENDING" | "PROCESSED" | "REJECTED"
  ) => {
    if (reviewId) {
      updateStatusMutation.mutate({ 
        reviewId: Number(reviewId), 
        status 
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid review ID",
        variant: "destructive",
      });
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleExport = () => {
    try {
      // Create CSV content
      const headers = [
        'Customer Name',
        'Email',
        'Date',
        'Product',
        'Promotion',
        'Campaign',
        'Rating',
        'Status',
        'Feedback'
      ];

      const rows = reviews.map(review => [
        review.Customer?.name || review.name || 'N/A',
        review.Customer?.email || review.email || 'N/A',
        new Date(review.feedbackDate).toLocaleDateString(),
        review.Product?.title || 'N/A',
        review.Promotion?.title || 'N/A',
        review.Campaign?.title || 'N/A',
        review.ratio || 'N/A',
        review.status,
        review.feedback
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `reviews_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export successful",
        description: "Reviews have been exported to CSV",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Failed to export reviews. Please try again.",
      });
    }
  };

  const handleCampaignChange = (campaignId: number) => {
    setSelectedCampaigns(prev => {
      const newSelected = prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId];
      return newSelected;
    });
  };

  const handleProductChange = (productId: number) => {
    setSelectedProducts(prev => {
      const newSelected = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      return newSelected;
    });
  };

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 text-black border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            onClick={handleExport}
          >
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        {/* {!isLoading && (
          <>
            <div className="flex flex-col gap-2 min-w-[220px]">
              <Label>Filter by Campaign</Label>
              <ReactSelect
                isMulti
                options={allCampaigns.map(campaign => ({
                  value: Number(campaign.id),
                  label: campaign.title
                }))}
                value={allCampaigns
                  .filter(campaign => selectedCampaigns.includes(Number(campaign.id)))
                  .map(campaign => ({ value: Number(campaign.id), label: campaign.title }))}
                onChange={selectedOptions => {
                  setSelectedCampaigns(selectedOptions ? selectedOptions.map(option => option.value) : []);
                }}
                placeholder="Select campaigns..."
                className="text-black"
                classNamePrefix="react-select"
              />
            </div>

            <div className="flex flex-col gap-2 min-w-[220px]">
              <Label>Filter by Product</Label>
              <ReactSelect
                isMulti
                options={availableProducts.map(product => ({
                  value: Number(product.id),
                  label: product.title
                }))}
                value={availableProducts
                  .filter(product => selectedProducts.includes(Number(product.id)))
                  .map(product => ({ value: Number(product.id), label: product.title }))}
                onChange={selectedOptions => {
                  setSelectedProducts(selectedOptions ? selectedOptions.map(option => option.value) : []);
                }}
                placeholder="Select products..."
                className="text-black"
                classNamePrefix="react-select"
              />
            </div>
          </>
        )} */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 text-black">
              {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("PROCESSED")}>
              Processed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("REJECTED")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 text-black">
              Sort by: {sortField}
              <span className="font-bold">
                {sortOrder == "asc" ? "( ↑ )" : "( ↓ )"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort("feedbackDate")}>
              Feedback Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("rating")}>
              Rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="border border-gray-600 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-600">
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Promotion</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-600">
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <MessageSquare className="w-16 h-16 mb-4 text-muted-foreground" />
                    <p className="text-xl font-medium mb-2">No reviews found</p>
                    <p className="text-muted-foreground">Your reviews will appear here once they are submitted</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border border-gray-600 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-600">
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Promotion</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review: Review) => (
                <TableRow
                  key={review.id}
                  className="cursor-pointer border-b border-gray-600 hover:bg-gray-400"
                  onClick={() => setSelectedReview(review)}
                >
                  <TableCell className="font-medium">
                    {review.Customer?.name || review.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {review.Customer?.email || review.email || "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(review.feedbackDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{review.Product?.title || "N/A"}</TableCell>
                  <TableCell>{review.Promotion?.title || "N/A"}</TableCell>
                  <TableCell>{review.Campaign?.title || "N/A"}</TableCell>
                  <TableCell>
                    <RatingStars rating={review.ratio} />
                  </TableCell>
                  <TableCell className="w-30">
                    <span
                      className={`px-2 py-1 rounded-3xl text-xs ${statusColor(
                        review.status
                      )}`}
                    >
                      {review.status}
                    </span>
                  </TableCell>
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    className="w-30"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(review.id, "PENDING")
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(review.id, "PROCESSED")
                          }
                        >
                          Processed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(review.id, "REJECTED")
                          }
                        >
                          Rejected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination Controls */}
      {reviewsResponse && reviewsResponse.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={!reviewsResponse.hasPrevPage}
            className="text-black"
          >
            Previous
          </Button>
          <span className="">
            Page {reviewsResponse.currentPage} of {reviewsResponse.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={!reviewsResponse.hasNextPage}
            className="text-black"
          >
            Next
          </Button>
        </div>
      )}

      <Dialog
        open={!!selectedReview}
        onOpenChange={() => setSelectedReview(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Customer</h4>
                  <p>
                    {selectedReview.Customer?.name ||
                      selectedReview.name ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p>
                    {selectedReview.Customer?.email ||
                      selectedReview.email ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Product</h4>
                  <p>{selectedReview.Product?.title || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Rating</h4>
                  <RatingStars rating={selectedReview.ratio} />
                </div>
                <div>
                  <h4 className="font-medium">Promotion</h4>
                  <p>{selectedReview.Promotion?.title || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Campaign</h4>
                  <p>{selectedReview.Campaign?.title || "N/A"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Feedback</h4>
                <p className="mt-2">{selectedReview.feedback}</p>
              </div>
              <div>
                <h4 className="font-medium">Date</h4>
                <p>
                  {new Date(selectedReview.feedbackDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsPage;
