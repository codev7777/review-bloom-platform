
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Filter,
  Search,
  Star,
  ChevronDown,
  MoreHorizontal,
  StarIcon,
  MessageSquare,
  AlertCircle,
  Download,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  getCompanyReviews,
  updateReviewStatus,
} from "@/lib/api/reviews/reviews.api";
import { Review } from "@/types";

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
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.companyId) return;

      try {
        setIsLoading(true);
        const response = await getCompanyReviews(user.companyId, {
          status: statusFilter !== "all" ? statusFilter : undefined,
          page: currentPage,
          limit: 10,
          sortBy: sortBy.split("-")[0],
          sortOrder: sortBy.split("-")[1] as "asc" | "desc",
        });

        setReviews(response.reviews);
        setTotalReviews(response.total);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast({
          title: "Error",
          description: "Failed to fetch reviews. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [user?.companyId, statusFilter, currentPage, sortBy]);

  const handleStatusUpdate = async (
    reviewId: number | string,
    newStatus: "PENDING" | "PROCESSED" | "REJECTED"
  ) => {
    try {
      // Convert string IDs to numbers, ensuring a numeric value
      const numericReviewId = typeof reviewId === 'string' 
        ? parseInt(reviewId, 10) 
        : reviewId;

      // Add explicit error handling for invalid IDs
      if (isNaN(numericReviewId)) {
        toast({
          variant: "destructive",
          title: "Invalid Review ID",
          description: "The review ID could not be processed.",
        });
        return;
      }

      await updateReviewStatus(numericReviewId, newStatus);
      
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, status: newStatus } : review
        )
      );
      
      toast({
        title: "Success",
        description: "Review status updated successfully",
      });
    } catch (error) {
      console.error("Error updating review status:", error);
      toast({
        title: "Error",
        description: "Failed to update review status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      review.product?.title.toLowerCase().includes(searchLower) ||
      review.customer?.name.toLowerCase().includes(searchLower) ||
      review.feedback.toLowerCase().includes(searchLower);

    const matchesRating =
      selectedRating === "all" || review.ratio === parseInt(selectedRating);

    return matchesSearch && matchesRating;
  });

  const pageSize = 10;
  const totalPages = Math.ceil(totalReviews / pageSize);

  const handleReplyToReview = (reviewId: string) => {
    toast({
      title: "Reply sent",
      description: "Your reply has been sent to the customer.",
    });
  };

  const handleFlagReview = (reviewId: string) => {
    toast({
      title: "Review flagged",
      description: "This review has been flagged for moderation.",
    });
  };

  const handleOpenOriginal = (reviewId: string, platform: string) => {
    toast({
      title: "Opening original review",
      description: `This would open the review on ${
        platform.charAt(0).toUpperCase() + platform.slice(1)
      } in a real implementation.`,
    });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Customer Reviews</h1>
          <p className="text-muted-foreground">
            Manage and respond to all your product reviews
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-gray-200 hover:bg-gray-50"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">All Reviews</TabsTrigger>
            <TabsTrigger value="positive" className="data-[state=active]:bg-white">Positive (5-4★)</TabsTrigger>
            <TabsTrigger value="neutral" className="data-[state=active]:bg-white">Neutral (3★)</TabsTrigger>
            <TabsTrigger value="negative" className="data-[state=active]:bg-white">Negative (2-1★)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="border-gray-200 focus:border-orange-300 focus:ring-orange-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="ratio-desc">Highest Rating</SelectItem>
              <SelectItem value="ratio-asc">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>

          {showFilters && (
            <>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSED">Processed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-gray-600 font-medium">Customer</TableHead>
              <TableHead className="text-gray-600 font-medium">Product</TableHead>
              <TableHead className="text-gray-600 font-medium">Rating</TableHead>
              <TableHead className="text-gray-600 font-medium">Date</TableHead>
              <TableHead className="text-gray-600 font-medium">Status</TableHead>
              <TableHead className="text-right text-gray-600 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id} className="animate-fade-in hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-800">
                        {review.customer?.name || review.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-800">
                      {review.product?.title || "Unknown Product"}
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {review.feedback}
                    </div>
                  </TableCell>
                  <TableCell>
                    <RatingStars rating={review.ratio} />
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(review.feedbackDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={review.status}
                      onValueChange={(
                        value: "PENDING" | "PROCESSED" | "REJECTED"
                      ) => handleStatusUpdate(review.id, value)}
                    >
                      <SelectTrigger className="w-[120px] border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-amber-400 mr-2"></span>
                            Pending
                          </span>
                        </SelectItem>
                        <SelectItem value="PROCESSED">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>
                            Processed
                          </span>
                        </SelectItem>
                        <SelectItem value="REJECTED">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-400 mr-2"></span>
                            Rejected
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-gray-50">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Reply to Review</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>View Original</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Follow-up</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          <span>Flag Review</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="py-4 mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={
                    currentPage === 1 
                      ? "pointer-events-none opacity-50" 
                      : "hover:bg-gray-50"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "bg-orange-100 border-orange-200" : "hover:bg-gray-50"}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-gray-50"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
