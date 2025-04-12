import api from "../axiosConfig";
import { Campaign, CampaignStatus } from "@/types";

// Campaign API endpoints
export const createCampaign = async (
  campaign: Omit<Campaign, "id">
): Promise<Campaign> => {
  // Ensure arrays are properly formatted
  const formData = {
    ...campaign,
    productIds: Array.isArray(campaign.productIds)
      ? campaign.productIds
      : [campaign.productIds],
    marketplaces: Array.isArray(campaign.marketplaces)
      ? campaign.marketplaces
      : [campaign.marketplaces],
  };

  const response = await api.post("/campaigns", formData);
  return response.data;
};

export const getCampaigns = async (params?: {
  title?: string;
  isActive?: CampaignStatus;
  promotionId?: string | number;
  companyId?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}): Promise<{ data: Campaign[]; totalPages: number; totalCount: number }> => {
  try {
    const response = await api.get("/campaigns", { params });
    console.log("API Response:", response.data);

    // Handle different response formats
    if (response.data && Array.isArray(response.data.results)) {
      // Format: {results: Array, page: number, limit: number, totalPages: number, totalResults: number}
      return {
        data: response.data.results,
        totalPages: response.data.totalPages || 1,
        totalCount: response.data.totalResults || response.data.results.length,
      };
    } else if (response.data && Array.isArray(response.data.data)) {
      // Format: {data: Array, totalPages: number, totalCount: number}
      return response.data;
    } else {
      console.error("Invalid response format:", response.data);
      return { data: [], totalPages: 0, totalCount: 0 };
    }
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    // Return empty result if API fails
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getCampaign = async (id: string | number): Promise<Campaign> => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data;
};

export const updateCampaign = async (
  id: string | number,
  campaign: Partial<Campaign>
): Promise<Campaign> => {
  // Ensure arrays are properly formatted
  const formData = {
    ...campaign,
    productIds: Array.isArray(campaign.productIds)
      ? campaign.productIds
      : campaign.productIds
      ? [campaign.productIds]
      : undefined,
    marketplaces: Array.isArray(campaign.marketplaces)
      ? campaign.marketplaces
      : campaign.marketplaces
      ? [campaign.marketplaces]
      : undefined,
  };

  const response = await api.patch(`/campaigns/${id}`, formData);
  return response.data;
};

export const deleteCampaign = async (id: string | number): Promise<void> => {
  await api.delete(`/campaigns/${id}`);
};
