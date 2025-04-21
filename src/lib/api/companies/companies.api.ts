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
  sortBy?: "createdAt" | "name" | "role"; // or whatever fields your DB supports
  sortType?: "asc" | "desc";
}

export const getCompanies = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt", // Default to newest first
  sortType = "desc", // Default to descending order
}: GetCompaniesParams) => {
  const response = await api.get("/companies", {
    params: {
      page,
      limit,
      search,
      sortBy, // Add sorting parameters
      sortType,
    },
  });
  return response.data;
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
