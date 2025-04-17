import axios from "axios";

interface CompanyStats {
  reviews: number;
  ratio: number;
}

export const getCompanyStats = async (
  companyId: number
): Promise<CompanyStats> => {
  const response = await axios.get<CompanyStats>(
    `/api/companies/${companyId}/stats`
  );
  return response.data;
};
