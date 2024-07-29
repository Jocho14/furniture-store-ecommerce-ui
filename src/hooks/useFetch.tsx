import { useState, useEffect } from "react";

interface UseFetchProps {
  url: string;
  options?: RequestInit;
}

interface UseFetchResult {
  data: any;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T,>({ url, options }: UseFetchProps): UseFetchResult => {
  const [data, setData] = useState<T | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
