import publicApi from "./publicApi";
import { Campaign } from "@/types";

/**
 * Get campaign by ID for public review funnel
 * This function doesn't require authentication
 */
export const getPublicCampaign = async (
  id: string | number
): Promise<Campaign> => {
  try {
    const response = await publicApi.get(`/public/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public campaign:", error);
    throw error;
  }
};
