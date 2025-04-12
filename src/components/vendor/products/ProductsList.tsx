import { useState } from "react";
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

type SortField = "name" | "asin" | "category" | "dateAdded";
type SortOrder = "asc" | "desc";

const BACKEND_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const ProductsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("dateAdded");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Get the current user's company ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId || 1; // Default to 1 if not available

  // Fetch products from the backend with companyId
  const {
    data: products,
    isLoading,
    setData: setProducts,
    usingMockData,
  } = useFetchWithFallback<Product>(getProducts, [], { companyId });

  // Fetch categories
  const { data: categoriesResponse = { data: [] } } = useQuery<{
    data: Category[];
    totalPages: number;
    totalCount: number;
  }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const categories = categoriesResponse.data;

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.asin || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === null ||
      (typeof product.category === "object" &&
        product.category?.name === categoryFilter) ||
      product.categoryId === categoryFilter;

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
    } else if (sortField === "dateAdded") {
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
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

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productToDelete)
        );
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
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-orange-100">
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-muted-foreground">
                ASIN: {product.asin}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => {
        const category = categories.find((c) => c === row.original.categoryId);
        return (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
              {category || "Uncategorized"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                navigate(`/vendor-dashboard/products/edit/${product.id}`)
              }
            >
              <Edit className="h-4 w-4 text-orange-500" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this product? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteProduct()}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <Info className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No products found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a product to get started
        </p>
        <Button
          variant="outline"
          className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50"
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
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate("/vendor-dashboard/products/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter by Category
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
                onClick={() => setCategoryFilter(category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "category" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("dateAdded")}
              >
                <div className="flex items-center">
                  Date Added
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "dateAdded" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      className="h-10 w-10 rounded object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {product.asin}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.asin}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {typeof product.category === "object"
                      ? product.category.name
                      : product.category}
                  </Badge>
                </TableCell>
                <TableCell>{product.dateAdded}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                            onClick={() => handleDeleteProduct()}
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
