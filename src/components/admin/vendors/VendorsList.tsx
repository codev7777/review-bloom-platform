import { useState, useEffect } from "react";
import {
  DownloadIcon,
  Edit,
  EyeIcon,
  MoreHorizontal,
  Search,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/lib/api/companies/companies.api";
import VendorDetails from "./VendorDetails";
import { format } from "date-fns";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <div className="flex items-center justify-end space-x-2 py-4">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>
    <div className="text-sm text-muted-foreground">
      Page {currentPage} of {totalPages}
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);

interface Campaign {
  id: number;
  title: string;
}

interface Product {
  id: number;
  name: string;
}

interface Plan {
  id: number;
  name: string;
  planType: string;
}

interface Company {
  id: number;
  name: string;
  detail?: string;
  logo?: string;
  websiteUrl?: string;
  planId?: number;
  ratio: number;
  reviews: number;
  metaPixelId?: string;
  campaigns?: Campaign[];
  Products?: Product[];
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  Plan?: Plan;
  Users?: User[];
}

interface User {
  id: number;
  role: string;
}

const VendorsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [totalVendors, setTotalVendors] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const itemsPerPage = 10;
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000); // 500ms debounce

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const getSubscriptionType = (planId?: number) => {
    switch (planId) {
      case 1:
        return "SILVER";
      case 2:
        return "GOLD";
      case 3:
        return "PLATINUM";
      default:
        return "BASIC";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "PLATINUM":
        return "bg-purple-100 text-purple-800";
      case "GOLD":
        return "bg-yellow-100 text-yellow-800";
      case "SILVER":
        return "bg-gray-100 text-gray-800";
      case "BASIC":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const {
    data: companiesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies", currentPage, debouncedSearchQuery],
    queryFn: async () => {
      try {
        const response = await getCompanies({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearchQuery,
        });
        // Filter out companies with admin role
        const filteredCompanies = response.companies.filter(
          (company: Company) =>
            !company.Users?.some((user) => user.role === "ADMIN")
        );
        setTotalVendors(filteredCompanies.length);
        return { ...response, companies: filteredCompanies };
      } catch (err) {
        console.error("Error fetching companies:", err);
        throw err;
      }
    },
  });

  const companies = companiesResponse?.companies || [];

  const totalPages = companiesResponse
    ? Math.ceil(companiesResponse.totalCount / itemsPerPage)
    : 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleExport = () => {
    try {
      // Create CSV content
      const headers = [
        'Vendor Name',
        'Status',
        'Subscription',
        'Campaigns',
        'Products',
        'Reviews',
        'Website URL',
        'Created At'
      ];

      const rows = companies.map(company => [
        company.name,
        'Active',
        getSubscriptionType(company.planId),
        company.campaigns?.length || 0,
        company.Products?.length || 0,
        company.reviews || 0,
        company.websiteUrl || 'N/A',
        format(new Date(company.createdAt), 'MMM d, yyyy')
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `vendors_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export successful",
        description: "Vendor data has been exported to CSV",
      });
      setShowExportDialog(false);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Failed to export vendor data. Please try again.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <div className="space-y-6 p-6 pb-16 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Vendor Accounts</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading vendors</h3>
          <p className="text-red-600 text-sm mt-1">
            {error instanceof Error ? error.message : "Failed to fetch vendors"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 pb-16 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Vendor Accounts</h2>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search vendors..."
                className="w-full pl-8"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-96 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Vendor Accounts</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search vendors..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="ml-auto flex items-center gap-1"
            onClick={() => setShowExportDialog(true)}
          >
            <DownloadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">All Vendors</CardTitle>
          <CardDescription>
            {totalVendors} total vendors registered
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-right">Campaigns</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Reviews</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company: Company) => (
                <TableRow
                  key={company.id}
                  className="group hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{company.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getSubscriptionColor(
                        getSubscriptionType(company.planId)
                      )}
                    >
                      {getSubscriptionType(company.planId)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {company.campaigns?.length || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    {company.Products?.length || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    {company.reviews || 0}
                  </TableCell>
                </TableRow>
              ))}
              {companies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="font-medium">No vendors found</h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search query
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalVendors > itemsPerPage && (
            <div className="px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalVendors / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Vendor Data</DialogTitle>
            <DialogDescription>
              Choose the format and data to include in your export.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <select className="input-field">
                <option value="csv">CSV (.csv)</option>
                <option value="excel">Excel (.xlsx)</option>
                <option value="json">JSON (.json)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Include Data</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-campaigns"
                    className="h-4 w-4 rounded border-gray-300"
                    checked
                  />
                  <label htmlFor="include-campaigns">Campaign Statistics</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-reviews"
                    className="h-4 w-4 rounded border-gray-300"
                    checked
                  />
                  <label htmlFor="include-reviews">Review Data</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-products"
                    className="h-4 w-4 rounded border-gray-300"
                    checked
                  />
                  <label htmlFor="include-products">Product Information</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowExportDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vendor Details Dialog */}
      {selectedCompany && (
        <VendorDetails
          company={selectedCompany}
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default VendorsList;
