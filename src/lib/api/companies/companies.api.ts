import api from "../axiosConfig";
import { Company, User } from "@/types";

// Company API endpoints
export const createCompany = async (
  company: CompanyCreateInput
): Promise<Company> => {
  const response = await api.post("/companies", company);
  return response.data;
};
export type CompanyCreateInput = {
  name: string;
  websiteUrl: string;
  detail: string;
  logo?: string;
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

export const getCompanyUsers = async (companyId: number): Promise<User[]> => {
  const response = await api.get(`/companies/${companyId}/users`);
  return response.data;
};

export const inviteUser = async (
  companyId: number,
  email: string
): Promise<void> => {
  try {
    await api.post(`/companies/${companyId}/users`, { email });
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const removeUser = async (
  companyId: number,
  userId: number
): Promise<void> => {
  await api.delete(`/companies/${companyId}/users/${userId}`);
};
