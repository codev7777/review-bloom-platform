import publicApi from "./publicApi";
import { Product } from "@/types";

/**
 * Get product by ID for public review funnel
 * This function doesn't require authentication
 */
export const getPublicProduct = async (
  id: string | number
): Promise<Product> => {
  try {
    // Convert id to number if it's a string
    const numericId = typeof id === "string" ? Number(id) : id;
    if (isNaN(numericId)) {
      throw new Error("Invalid product ID");
    }

    const response = await publicApi.get(`/public/products/${numericId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public product:", error);
    throw error;
  }
};

/**
 * Get multiple products by IDs for public review funnel
 * This function doesn't require authentication
 */
export const getPublicProducts = async (ids: number[]): Promise<Product[]> => {
  try {
    const response = await publicApi.get(`/public/products`, {
      params: {
        ids: ids.join(","),
      },
    });
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching public products:", error);
    throw error;
  }
};
