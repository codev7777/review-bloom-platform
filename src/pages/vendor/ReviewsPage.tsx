
import { useState } from "react";
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
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

// Mock data for reviews
const mockReviews = [
  {
    id: "rev-001",
    productName: "Premium Kitchen Knife Set",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    rating: 5,
    comment: "These knives are incredible! They're sharp, well-balanced, and the block looks great on my counter.",
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
    comment: "Great sound quality and battery life. The noise cancellation works well in most environments.",
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
    comment: "Perfect thickness and grip! I use it daily and it's holding up extremely well.",
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
    comment: "This smart watch exceeded my expectations. Battery life is amazing.",
    feedback: "Health tracking features are spot on. The interface is intuitive and responsive.",
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
    comment: "Heats water quickly and efficiently. Great design, but the lid is a bit tricky to open.",
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
    comment: "Sound quality is average at best. Battery drains quickly when volume is high.",
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
    comment: "Game changer in my kitchen! Everything comes out crispy and delicious.",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [respondedFilter, setRespondedFilter] = useState<string>("all");

  // Filter and sort reviews based on current filters
  const filteredReviews = mockReviews
    .filter(review => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        review.productName.toLowerCase().includes(searchLower) ||
        review.customerName.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower);
      
      // Rating filter
      const matchesRating = selectedRating === "all" || review.rating === parseInt(selectedRating);
      
      // Status filter
      const matchesStatus = statusFilter === "all" || review.status === statusFilter;
      
      // Responded filter
      const matchesResponded = 
        respondedFilter === "all" || 
        (respondedFilter === "yes" && review.responded) ||
        (respondedFilter === "no" && !review.responded);
      
      return matchesSearch && matchesRating && matchesStatus && matchesResponded;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        case "name-asc":
          return a.customerName.localeCompare(b.customerName);
        case "name-desc":
          return b.customerName.localeCompare(a.customerName);
        default:
          return 0;
      }
    });

  const pageSize = 6;
  const totalPages = Math.ceil(filteredReviews.length / pageSize);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
      description: `This would open the review on ${platform.charAt(0).toUpperCase() + platform.slice(1)} in a real implementation.`,
    });
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Customer Reviews</h1>
          <p className="text-muted-foreground">
            Manage and respond to all your product reviews
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
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
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="positive">Positive (5-4★)</TabsTrigger>
            <TabsTrigger value="neutral">Neutral (3★)</TabsTrigger>
            <TabsTrigger value="negative">Negative (2-1★)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className={`mb-6 grid gap-4 ${showFilters ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="rating-desc">Highest Rating</SelectItem>
              <SelectItem value="rating-asc">Lowest Rating</SelectItem>
              <SelectItem value="name-asc">Customer Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Customer Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {showFilters && (
          <>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={respondedFilter} onValueChange={setRespondedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by response" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Responded</SelectItem>
                <SelectItem value="no">Not Responded</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((review) => (
                  <TableRow key={review.id} className="animate-fade-in">
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.customerName}</div>
                        <div className="text-sm text-muted-foreground">{review.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{review.productName}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {review.comment}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RatingStars rating={review.rating} />
                    </TableCell>
                    <TableCell>
                      {new Date(review.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {review.status === "verified" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleReplyToReview(review.id)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Reply to Review</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenOriginal(review.id, review.platform)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>View Original</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Email sent",
                              description: `Follow-up email sent to ${review.email}`,
                            });
                          }}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Send Follow-up</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFlagReview(review.id)}>
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    No reviews found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredReviews.length > pageSize && (
          <div className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
