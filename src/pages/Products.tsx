import React, { useEffect, useState } from "react";
import useFetchWithFallback from "@/hooks/useFetchWithFallback";
import { getProducts } from "@/lib/api/products/products.api";
import { Product } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { deleteProduct } from "@/lib/api/products/products.api";

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
    navigate(`/vendor-dashboard/products/${id}/edit`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      {usingMockData && (
        <div className="text-yellow-600">
          Using sample data. Please check your backend connection.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
