import api from "../axiosConfig";
import { Campaign, CampaignStatus } from "@/types";
import { API_URL } from "@/config/env";

// Campaign API endpoints
export const createCampaign = async (
  campaign: Omit<Campaign, "id" | "claims">
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

  try {
    const response = await api.post("/campaigns", formData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export interface GetCampaignsParams {
  companyId?: number;
  title?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export const getCampaigns = async (
  params?: GetCampaignsParams
): Promise<{ data: Campaign[] }> => {
  const queryParams = new URLSearchParams();

  if (params?.companyId) {
    queryParams.append("companyId", params.companyId.toString());
  }
  if (params?.title) {
    queryParams.append("title", params.title);
  }
  if (params?.isActive !== undefined) {
    queryParams.append("isActive", params.isActive.toString());
  }
  if (params?.sortBy) {
    queryParams.append("sortBy", params.sortBy);
  }
  if (params?.sortOrder) {
    queryParams.append("sortOrder", params.sortOrder);
  }

  const response = await api.get(`/campaigns?${queryParams.toString()}`);
  return { data: response.data.results || [] };
};

export const getCampaign = async (id: number): Promise<Campaign> => {
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
