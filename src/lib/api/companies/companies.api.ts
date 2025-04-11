
import api from '../axiosConfig';
import { Company } from '@/types';

// Company API endpoints
export const createCompany = async (company: Omit<Company, 'id'>): Promise<Company> => {
  const response = await api.post('/companies', company);
  return response.data;
};

export const getCompanies = async (params?: {
  name?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}): Promise<{ data: Company[]; totalPages: number; totalCount: number }> => {
  try {
    const response = await api.get('/companies', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getCompany = async (id: string | number): Promise<Company> => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (id: string | number, company: Partial<Company>): Promise<Company> => {
  const response = await api.patch(`/companies/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id: string | number): Promise<void> => {
  await api.delete(`/companies/${id}`);
};
