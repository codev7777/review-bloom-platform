import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Info,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Pencil,
} from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Product, Category } from "@/types";
import { getProducts, deleteProduct } from "@/lib/api/products/products.api";
import { getCategories } from "@/lib/api/categories/categories.api";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import type { ColumnDef } from "@tanstack/react-table";
import { getImageUrl } from "@/utils/imageUrl";
import { useQuery } from "@tanstack/react-query";

type SortField = "name" | "asin" | "category" | "createdAt";
type SortOrder = "asc" | "desc";

const ProductsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Get the current user's company ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId || 1; // Default to 1 if not available

  // Fetch products from the backend with companyId
  const {
    data: products,
    isLoading: isLoadingProducts,
    setData: setProducts,
  } = useFetchWithFallback<Product>(getProducts, [], { companyId });

  // Fetch categories with error handling
  const {
    data: categoriesResponse = { data: [] },
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

  const categories: Category[] = categoriesResponse?.data ?? [];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.asin || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter ||
      product.categoryId?.toString() === categoryFilter ||
      Number(product.categoryId) === Number(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      // Fetch fresh data from the backend
      const updatedProducts = await getProducts({ companyId });
      // Update the products list with fresh data
      setProducts(updatedProducts.data);
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete product",
        description:
          "There was an error deleting the product. Please try again.",
      });
    }
    setProductToDelete(null);
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
      <div className="text-center py-10 border rounded-lg">
        <Info className="mx-auto h-10 w-10 text-white opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No products found</h3>
        <p className="mt-1 text-sm text-white mb-3">Add a product to get started</p>
        <Button
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-200 transform hover:scale-105"
          onClick={() => navigate("/vendor-dashboard/products/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add your first product
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-white">Manage your product catalog</p>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-200 transform hover:scale-105"
          onClick={() => navigate("/vendor-dashboard/products/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-black"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {categoryFilter
                ? `Category: ${
                    categories.find((c) => c.id.toString() === categoryFilter)
                      ?.name || "All"
                  }`
                : "Filter by Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setCategoryFilter(category.id.toString())}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-white">Product</TableHead>
              <TableHead
                className="cursor-pointer text-white"
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
              {/* <TableHead
                className="cursor-pointer text-white"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center text-white">
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "category" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead> */}
              <TableHead
                className="cursor-pointer text-white"
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
              <TableHead className="text-right text-white pr-10">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-10 w-10 rounded object-contain mr-3"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-white hidden sm:block">
                        {product.title}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.asin}
                </TableCell>
                {/* <TableCell>
                  <Badge variant="outline" className="font-normal text-white">
                    {typeof product.category === "object"
                      ? product.category.name
                      : product.category}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(
                          `/vendor-dashboard/products/edit/${product.id}`
                        )
                      }
                    >
                      <Edit className="h-4 w-4 text-orange-500" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this product? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDeleteProduct(product.id.toString())
                            }
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
