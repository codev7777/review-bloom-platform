import api from "../axiosConfig";
import { Review } from "@/types";

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
