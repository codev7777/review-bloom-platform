import publicApi from "./publicApi";
import { Review } from "@/types";

/**
 * Create a review without requiring authentication
 * For public review funnel
 */
export const createPublicReview = async (reviewData: {
  email: string;
  name: string;
  asin: string;
  rating: number;
  feedback: string;
  country: string;
  orderNo?: string;
  promotionId?: number;
  campaignId?: number;
}): Promise<Review> => {
  try {
    const response = await publicApi.post("/public/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error creating public review:", error);
    throw error;
  }
};
