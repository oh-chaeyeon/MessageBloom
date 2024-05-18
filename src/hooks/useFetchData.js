import { useEffect, useState } from 'react';

export default function useFetchData(apiFunction, params = []) {
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiFunction(...params);
        setData(response);
        setResults(response.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiFunction, ...params]);

  return { results, data, isLoading, error };
}
