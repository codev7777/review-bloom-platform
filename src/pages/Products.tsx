
import React, { useEffect, useState } from "react";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { getProducts } from "@/lib/api/products/products.api";
import { Product } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash, Plus, Tag, Package, Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { deleteProduct } from "@/lib/api/products/products.api";
import { Badge } from "@/components/ui/badge";

// Mock products data
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Sample Product 1",
    description: "This is a sample product description",
    image: "https://via.placeholder.com/150",
    companyId: "1",
    categoryId: "1",
    asin: "B0123456789",
  },
  {
    id: "2",
    title: "Sample Product 2",
    description: "Another sample product description",
    image: "https://via.placeholder.com/150",
    companyId: "1",
    categoryId: "2",
    asin: "B0987654321",
  },
  {
    id: "3",
    title: "Sample Product 3",
    description: "Yet another sample product description",
    image: "https://via.placeholder.com/150",
    companyId: "1",
    categoryId: "3",
    asin: "B1122334455",
  },
];

// Map category IDs to names for display
const CATEGORIES = {
  "1": "Electronics",
  "2": "Kitchen",
  "3": "Fitness",
  "4": "Home & Garden",
  "5": "Beauty"
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const {
    data: fetchedProducts,
    isLoading,
    error,
    usingMockData,
    pagination,
    setPage,
  } = useFetchWithFallback(getProducts, MOCK_PRODUCTS, { page: 1, limit: 10 });

  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  useEffect(() => {
    console.log("Products component state:", {
      productsCount: products.length,
      isLoading,
      error,
      usingMockData,
      pagination,
    });
  }, [products, isLoading, error, usingMockData, pagination]);

  const handleEdit = (id: string) => {
    navigate(`/vendor-dashboard/products/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      // Refresh the products list
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
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
            <img
              src={product.image}
              alt={product.title}
              className="w-10 h-10 rounded-md object-cover"
            />
            <div>
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-gray-500">{product.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "asin",
      header: "ASIN",
    },
    {
      accessorKey: "categoryId",
      header: "Category",
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
              onClick={() => handleEdit(product.id.toString())}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(product.id.toString())}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog for review campaigns
          </p>
        </div>
        
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          onClick={() => navigate("/vendor-dashboard/products/new")}
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Button>
      </div>

      {usingMockData && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800">
          <p className="text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Using sample data. Please check your backend connection.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all duration-200 h-full">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-white text-gray-800 border border-gray-200">
                ASIN: {product.asin || "N/A"}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {CATEGORIES[product.categoryId as keyof typeof CATEGORIES] || product.categoryId || "Uncategorized"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex gap-2 mt-auto">
                <Button 
                  className="flex-1 bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200" 
                  variant="ghost"
                  onClick={() => handleEdit(product.id.toString())}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200" 
                  variant="ghost"
                  onClick={() => navigate(`/vendor-dashboard/products/view/${product.id.toString()}`)}
                >
                  <Eye size={16} className="mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
