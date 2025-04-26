import axios from "axios";
import { API_URL } from "../config/env";

const api = axios.create({
  baseURL: API_URL,
});

interface CompanyStats {
  reviews: number;
  ratio: number;
}

export const getCompanyStats = async (
  companyId: number
): Promise<CompanyStats> => {
  const response = await api.get<CompanyStats>(`/companies/${companyId}/stats`);
  return response.data;
};

export const inviteUser = async (companyId: number, email: string) => {
  const response = await api.post(`/companies/${companyId}/users`, { email });
  return response.data;
};

export const getCompanyUsers = async (companyId: number) => {
  const response = await api.get(`/companies/${companyId}/users`);
  return response.data;
};

export const removeUser = async (companyId: number, userId: number) => {
  const response = await api.delete(`/companies/${companyId}/users/${userId}`);
  return response.data;
};
