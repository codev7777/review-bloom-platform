import axios from "axios";

interface GetVendorsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getVendors = async ({
  page = 1,
  limit = 10,
  search = "",
}: GetVendorsParams) => {
  const response = await axios.get("/api/vendors", {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data; // Should return { data: vendors[], totalCount: number, totalPages: number }
};
