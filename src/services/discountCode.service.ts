import api from '@/lib/api/axiosConfig';

export interface DiscountCode {
  id: number;
  code: string;
  description?: string;
  discount: number;
  isActive: boolean;
  validFrom: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  status: string;
}

export interface ValidatedDiscountCode {
  code: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
}

export const createDiscountCode = async (data: Omit<DiscountCode, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post('/admin/discount-codes', data);
  return response.data;
};

export const getDiscountCodes = async () => {
  const response = await api.get('/admin/discount-codes');
  return response.data;
};

export const getDiscountCode = async (id: number) => {
  const response = await api.get(`/admin/discount-codes/${id}`);
  return response.data;
};

export const updateDiscountCode = async (id: number, data: Partial<DiscountCode>) => {
  const response = await api.put(`/admin/discount-codes/${id}`, data);
  return response.data;
};

export const deleteDiscountCode = async (id: number) => {
  await api.delete(`/admin/discount-codes/${id}`);
};

export const validateDiscountCode = async (code: string): Promise<ValidatedDiscountCode> => {
  const response = await api.post('/billing/validate-discount-code', { code });
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to validate discount code');
  }
  return {
    code: response.data.code,
    discount: response.data.discount,
    type: response.data.type
  };
}; 