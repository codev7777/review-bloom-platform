import { Product } from "@/types";
import api from "../axiosConfig";

// Product API endpoints
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  companyId?: string | number;
}): Promise<{ data: Product[]; totalPages: number; totalCount: number }> => {
  const response = await api.get("/products", { params });
  const result = response.data;
  return {
    data: result.results,
    totalPages: result.totalPages,
    totalCount: result.total,
  };
};

export const getProduct = async (id: string | number): Promise<Product> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === "string" ? Number(id) : id;
    if (isNaN(numericId)) {
      throw new Error("Invalid product ID");
    }

    console.log("Making API call to get product with ID:", numericId);
    const response = await api.get(`/products/${numericId}`);
    console.log("API response for product:", response.data);

    if (!response.data) {
      throw new Error("No product data received");
    }

    // Log the full response to see what we're getting
    console.log("Full API response:", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Error in getProduct API call:", error);
    if (error.response) {
      console.error("Error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
