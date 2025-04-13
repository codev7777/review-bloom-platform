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
