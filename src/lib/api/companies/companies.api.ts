import api from "../axiosConfig";
import { Company } from "@/types";

// Company API endpoints
export const createCompany = async (
  company: Omit<Company, "id">
): Promise<Company> => {
  const response = await api.post("/companies", company);
  return response.data;
};

interface GetCompaniesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getCompanies = async ({
  page = 1,
  limit = 10,
  search = "",
}: GetCompaniesParams) => {
  const response = await api.get("/companies", {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data; // Should return { data: Company[], totalCount: number, totalPages: number }
};

export const getCompany = async (id: string | number): Promise<Company> => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (
  id: string | number,
  company: Partial<Company>
): Promise<Company> => {
  const response = await api.patch(`/companies/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id: string | number): Promise<void> => {
  await api.delete(`/companies/${id}`);
};
