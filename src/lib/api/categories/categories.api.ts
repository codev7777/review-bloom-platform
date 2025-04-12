import api from "../axiosConfig";
import { Category } from "@/types";

export const getCategories = async (): Promise<{
  data: Category[];
  totalPages: number;
  totalCount: number;
}> => {
  try {
    const response = await api.get("/categories");
    console.log("Categories API Response:", response.data);

    // Handle different response formats
    if (response.data && Array.isArray(response.data.results)) {
      return {
        data: response.data.results,
        totalPages: response.data.totalPages || 1,
        totalCount: response.data.totalResults || response.data.results.length,
      };
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data;
    } else {
      console.error("Invalid response format:", response.data);
      return { data: [], totalPages: 0, totalCount: 0 };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};
