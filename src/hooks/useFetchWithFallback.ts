
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

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
    currentPage: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFn(params);
        if (result && result.data && result.data.length > 0) {
          setData(result.data);
          setPagination({
            totalPages: result.totalPages,
            totalCount: result.totalCount,
            currentPage: params.page || 1
          });
          setUsingMockData(false);
        } else {
          // If API returned empty array, use mock data
          setData(mockData);
          setPagination({
            totalPages: 1,
            totalCount: mockData.length,
            currentPage: 1
          });
          setUsingMockData(true);
          toast({
            variant: "warning",
            title: "No data found",
            description: "Using sample data for display purposes.",
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err as Error);
        setData(mockData);
        setPagination({
          totalPages: 1,
          totalCount: mockData.length,
          currentPage: 1
        });
        setUsingMockData(true);
        toast({
          variant: "destructive",
          title: "Failed to load data",
          description: "Using sample data. Please check your backend connection.",
        });
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
    setPage: (page: number) => params.page = page
  };
}

export default useFetchWithFallback;
