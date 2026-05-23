import { useCallback, useEffect, useState } from 'react';

export const useQuery = ({ entity, queryFn }) => {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);

      const response = await queryFn();

      setData(response);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `An error occurred while fetching ${entity}`,
      );
    } finally {
      setIsLoading(false);
    }
  }, [entity, queryFn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    setData
  };
};
