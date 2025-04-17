import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVendors } from "@/lib/api/vendors/vendors.api";

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

const VendorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10; // Or whatever number you want to show per page

  const { data: vendorsData, isLoading } = useQuery({
    queryKey: ["vendors", currentPage, searchQuery],
    queryFn: () =>
      getVendors({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      }),
  });

  const totalPages = vendorsData
    ? Math.ceil(vendorsData.totalCount / itemsPerPage)
    : 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {/* Your existing table code */}
      <Table>{/* ... table headers and rows ... */}</Table>

      {/* Add pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
