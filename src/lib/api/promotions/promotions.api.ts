import api from "../axiosConfig";
import { Promotion } from "@/types";

// Promotion API endpoints
export const createPromotion = async (data: {
  title: string;
  description: string;
  promotionType:
    | "GIFT_CARD"
    | "DISCOUNT_CODE"
    | "FREE_PRODUCT"
    | "DIGITAL_DOWNLOAD";
  image: string;
}): Promise<Promotion> => {
  const response = await api.post("/promotions", data);
  return response.data;
};

export const getPromotions = async (params?: {
  title?: string;
  promotionType?:
    | "GIFT_CARD"
    | "DISCOUNT_CODE"
    | "FREE_PRODUCT"
    | "DIGITAL_DOWNLOAD";
  companyId?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}): Promise<{ data: Promotion[]; totalPages: number; totalCount: number }> => {
  try {
    console.log("Making API call to /promotions with params:", params);
    const response = await api.get("/promotions", { params });
    console.log("Raw API response:", response.data);

    // Handle different response formats
    if (response.data && Array.isArray(response.data.results)) {
      console.log(
        "Using results format:",
        response.data.results.length,
        "items"
      );
      return {
        data: response.data.results,
        totalPages: response.data.totalPages || 1,
        totalCount: response.data.total || response.data.results.length,
      };
    } else if (response.data && Array.isArray(response.data.data)) {
      console.log("Using data format:", response.data.data.length, "items");
      return response.data;
    } else {
      console.error("Invalid response format:", response.data);
      return { data: [], totalPages: 0, totalCount: 0 };
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
    if (error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data
      );
    }
    // Return empty result if API fails
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getPromotion = async (id: string | number): Promise<Promotion> => {
  const response = await api.get(`/promotions/${id}`);
  return response.data;
};

export const updatePromotion = async (
  id: string | number,
  data: {
    title?: string;
    description?: string;
    promotionType?:
      | "GIFT_CARD"
      | "DISCOUNT_CODE"
      | "FREE_PRODUCT"
      | "DIGITAL_DOWNLOAD";
    image?: string;
  }
): Promise<Promotion> => {
  const response = await api.patch(`/promotions/${id}`, data);
  return response.data;
};

export const deletePromotion = async (id: string | number): Promise<void> => {
  await api.delete(`/promotions/${id}`);
};
