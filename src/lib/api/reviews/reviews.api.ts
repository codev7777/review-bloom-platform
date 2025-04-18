import api from "../axiosConfig";
import { Review } from "@/types";
import { API_URL } from "@/config/env";

// Review API endpoints
export const createReview = async (reviewData: {
  email: string;
  name: string;
  productId: number;
  rating: number;
  feedback: string;
  country: string;
  orderNo?: string;
  promotionId?: number;
  campaignId?: number;
}): Promise<Review> => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

export const getCompanyReviews = async (
  companyId: number,
  params?: {
    status?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
): Promise<{ reviews: Review[]; total: number }> => {
  const response = await api.get(`/reviews/company/${companyId}`, { params });
  return response.data;
};

export const updateReviewStatus = async (
  reviewId: number,
  status: "PENDING" | "PROCESSED" | "REJECTED"
): Promise<Review> => {
  const response = await api.patch(`/reviews/${reviewId}/status`, { status });
  return response.data;
};

export interface GetReviewsParams {
  companyId?: number;
  productId?: number;
  userId?: number;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getReviews = async (params?: GetReviewsParams) => {
  if (params?.companyId) {
    // If companyId is provided, use the company-specific endpoint
    const response = await api.get(`/reviews/company/${params.companyId}`, {
      params,
    });
    return response.data;
  }

  // For other cases, use the general reviews endpoint
  const queryParams = new URLSearchParams();
  if (params?.productId)
    queryParams.append("productId", params.productId.toString());
  if (params?.userId) queryParams.append("userId", params.userId.toString());
  if (params?.status) queryParams.append("status", params.status);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  const response = await api.get(`/reviews?${queryParams.toString()}`);
  return response.data;
};
