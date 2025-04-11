
import api from '../axiosConfig';

export interface Product {
  id: string;
  title: string;
  description?: string;
  image?: string;
  companyId: string | number;
  categoryId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// Product API endpoints
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const getProducts = async (params?: {
  title?: string;
  companyId?: string | number;
  categoryId?: string | number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}): Promise<{ data: Product[]; totalPages: number; totalCount: number }> => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty result if API fails
    return { data: [], totalPages: 0, totalCount: 0 };
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
