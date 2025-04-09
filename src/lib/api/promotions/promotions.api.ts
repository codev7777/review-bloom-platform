
import api from '../axiosConfig';

export interface Promotion {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  createdAt: string;
}

export const getPromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await api.get('/promotions');
    return response.data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    // Return empty array if API fails, will be replaced with mock data in component
    return [];
  }
};

export const getPromotion = async (id: string): Promise<Promotion> => {
  const response = await api.get(`/promotions/${id}`);
  return response.data;
};

export const createPromotion = async (promotion: Omit<Promotion, 'id'>): Promise<Promotion> => {
  const response = await api.post('/promotions', promotion);
  return response.data;
};

export const updatePromotion = async (id: string, promotion: Partial<Promotion>): Promise<Promotion> => {
  const response = await api.put(`/promotions/${id}`, promotion);
  return response.data;
};

export const deletePromotion = async (id: string): Promise<void> => {
  await api.delete(`/promotions/${id}`);
};
