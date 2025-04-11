
import api from '../axiosConfig';

export interface Company {
  id: string;
  name: string;
  detail?: string;
  logo?: string;
  websiteUrl?: string;
  planId?: number;
}

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
  const response = await api.get('/companies', { params });
  return response.data;
};

export const getCompany = async (id: string): Promise<Company> => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (id: string, company: Partial<Company>): Promise<Company> => {
  const response = await api.patch(`/companies/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`/companies/${id}`);
};
