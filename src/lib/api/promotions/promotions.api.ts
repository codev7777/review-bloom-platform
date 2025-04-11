
import api from '../axiosConfig';

export type PromotionType = 'GIFT_CARD' | 'DISCOUNT_CODE' | 'FREE_PRODUCT' | 'DIGITAL_DOWNLOAD';

export interface Promotion {
  id: string;
  title: string;
  image?: string;
  promotionType: PromotionType;
  description?: string;
  companyId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// Promotion API endpoints
export const createPromotion = async (promotion: Omit<Promotion, 'id'>): Promise<Promotion> => {
  const response = await api.post('/promotions', promotion);
  return response.data;
};

export const getPromotions = async (params?: {
  title?: string;
  promotionType?: PromotionType;
  companyId?: string | number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}): Promise<{ data: Promotion[]; totalPages: number; totalCount: number }> => {
  try {
    const response = await api.get('/promotions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    // Return empty result if API fails
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getPromotion = async (id: string): Promise<Promotion> => {
  const response = await api.get(`/promotions/${id}`);
  return response.data;
};

export const updatePromotion = async (id: string, promotion: Partial<Promotion>): Promise<Promotion> => {
  const response = await api.patch(`/promotions/${id}`, promotion);
  return response.data;
};

export const deletePromotion = async (id: string): Promise<void> => {
  await api.delete(`/promotions/${id}`);
};
