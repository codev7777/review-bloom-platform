import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalCount: number;
}

type FetchFunction<T> = (params?: any) => Promise<PaginatedResponse<T>>;

function useFetchWithFallback<T>(
  fetchFn: FetchFunction<T>,
  mockData: T[],
  params: Record<string, any> = {},
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalCount: mockData.length,
    currentPage: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFn(params);

        if (result && result.data && Array.isArray(result.data)) {
          if (result.data.length > 0) {
            setData(result.data);
            setPagination({
              totalPages: result.totalPages || 1,
              totalCount: result.totalCount || result.data.length,
              currentPage: params.page || 1,
            });
            setUsingMockData(false);
          } else {
            setData(mockData);
            setPagination({
              totalPages: 1,
              totalCount: mockData.length,
              currentPage: 1,
            });
            setUsingMockData(true);
            toast({
              variant: "default",
              title: "No data found",
              // description: "Using sample data for display purposes.",
            });
          }
        } else {
          console.error("Invalid API response format:", result);
          setData(mockData);
          setPagination({
            totalPages: 1,
            totalCount: mockData.length,
            currentPage: 1,
          });
          setUsingMockData(true);
          toast({
            variant: "destructive",
            title: "Invalid response format",
            // description:
            //   "Using sample data. Please check the API response format.",
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);

        // Create a more descriptive error message
        let errorMessage = "Unknown error occurred";

        if (
          err instanceof SyntaxError &&
          err.message.includes("Unexpected token")
        ) {
          errorMessage =
            "Received non-JSON response from server. The server might be down or returning an error page.";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(new Error(errorMessage));
        setData(mockData);
        setPagination({
          totalPages: 1,
          totalCount: mockData.length,
          currentPage: 1,
        });
        setUsingMockData(true);

        // Check if it's an authentication error
        const axiosError = err as any;
        if (axiosError.response) {
          console.error(
            "Error response:",
            axiosError.response.status,
            axiosError.response.data
          );
          if (axiosError.response.status === 401) {
            toast({
              variant: "destructive",
              title: "Authentication error",
              description: "Please log in again to access this data.",
            });
          } else if (axiosError.response.status === 403) {
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have permission to access this data.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Failed to load data",
              // description:
              //   "Using sample data. Please check your backend connection.",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Network error",
            description: "Unable to connect to the server. Using sample data.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, JSON.stringify(params)]);

  return {
    data,
    isLoading,
    error,
    usingMockData,
    pagination,
    setData,
    setPage: (page: number) => (params.page = page),
  };
}

export default useFetchWithFallback;
