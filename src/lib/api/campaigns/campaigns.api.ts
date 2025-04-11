
import api from '../axiosConfig';

export type CampaignStatus = 'YES' | 'NO'; // isActive status

export interface Campaign {
  id: string;
  title: string;
  isActive: CampaignStatus;
  promotionId?: string | number;
  companyId?: string | number;
  productIds?: (string | number)[];
  marketplaces?: string[];
  claims?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Campaign API endpoints
export const createCampaign = async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
  const response = await api.post('/campaigns', campaign);
  return response.data;
};

export const getCampaigns = async (params?: {
  title?: string;
  isActive?: CampaignStatus;
  promotionId?: string | number;
  companyId?: string | number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}): Promise<{ data: Campaign[]; totalPages: number; totalCount: number }> => {
  try {
    const response = await api.get('/campaigns', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    // Return empty result if API fails
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getCampaign = async (id: string): Promise<Campaign> => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data;
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  const response = await api.patch(`/campaigns/${id}`, campaign);
  return response.data;
};

export const deleteCampaign = async (id: string): Promise<void> => {
  await api.delete(`/campaigns/${id}`);
};
