import axios from "axios";

export interface CompanyStats {
  reviews: number;
  ratio: number;
}

export const getCompanyStats = async (
  companyId?: number
): Promise<CompanyStats> => {
  if (!companyId) {
    return { reviews: 0, ratio: 0 };
  }
  const response = await axios.get<CompanyStats>(
    `/api/companies/${companyId}/stats`
  );
  return response.data;
};
