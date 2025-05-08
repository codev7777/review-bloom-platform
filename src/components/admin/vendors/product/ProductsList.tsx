import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Info,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Product, Category } from "@/types";
import { getProducts } from "@/lib/api/products/products.api";
import { getCategories } from "@/lib/api/categories/categories.api";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { getImageUrl } from "@/utils/imageUrl";
import { useQuery } from "@tanstack/react-query";

type SortField = "name" | "asin" | "category" | "createdAt";
type SortOrder = "asc" | "desc";

const ProductsList = () => {
  const params = useParams();
  const companyId = params.id;
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Fetch products from the backend with companyId
  const {
    data: products,
    isLoading: isLoadingProducts,
    setData: setProducts,
  } = useFetchWithFallback<Product>(getProducts, [], { companyId });

  // Fetch categories with error handling
  const {
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useQuery<{
    data: Category[];
    totalPages: number;
    totalCount: number;
  }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(1, 1000), // Fetch up to 1000 categories
    retry: false,
  });

  // Handle categories error
  useEffect(() => {
    if (isCategoriesError) {
      toast({
        variant: "destructive",
        title: "Failed to load categories",
        description:
          "There was an error loading the categories. Please try again.",
      });
    }
  }, [isCategoriesError, toast]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = (a.name || a.title || "").localeCompare(
        b.name || b.title || ""
      );
    } else if (sortField === "asin") {
      comparison = (a.asin || "").localeCompare(b.asin || "");
    } else if (sortField === "category") {
      const categoryA =
        typeof a.category === "string" ? a.category : a.category?.name || "";
      const categoryB =
        typeof b.category === "string" ? b.category : b.category?.name || "";
      comparison = categoryA.localeCompare(categoryB);
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

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-1 mb-4"
          onClick={() => navigate(`/admin-dashboard/vendors`)}
        >
          <span className="hidden sm:inline">Go to Vendor</span>
        </Button>
        <div className="text-center py-10 border rounded-lg text-black">
          <Info className="mx-auto h-10 w-10 opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No products found</h3>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p>Manage your product catalog</p>
        </div>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-1"
          onClick={() => navigate(`/admin-dashboard/vendors`)}
        >
          <span className="hidden sm:inline">Go to Vendor</span>
        </Button>
      </div>

      <div className="rounded-md border border-gray-600">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-600">
              <TableHead>Product</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("asin")}
              >
                <div className="flex items-center">
                  ASIN
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "asin" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Date Added
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id} className="border-b border-gray-600">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-10 w-10 rounded object-contain mr-3"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs hidden sm:block">
                        {product.title}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.asin}
                </TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsList;
