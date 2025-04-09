
import { useState, useEffect } from 'react';

function useFetchWithFallback<T>(
  fetchFn: () => Promise<T[]>,
  mockData: T[],
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFn();
        if (result && result.length > 0) {
          setData(result);
          setUsingMockData(false);
        } else {
          // If API returned empty array, use mock data
          setData(mockData);
          setUsingMockData(true);
          console.log('Using mock data as fallback');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err as Error);
        setData(mockData);
        setUsingMockData(true);
        console.log('Using mock data due to error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, isLoading, error, usingMockData };
}

export default useFetchWithFallback;
