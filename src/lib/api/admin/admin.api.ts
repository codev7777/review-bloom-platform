import api from "../axiosConfig";

export interface AdminStatistics {
  totalVendors: number;
  activeCampaigns: number;
  averageRating: number;
  totalReviews: number;
  reviewDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  weeklyReviews: {
    name: string;
    value: number;
  }[];
  campaignPerformance: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const getAdminStatistics = async (): Promise<AdminStatistics> => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};
