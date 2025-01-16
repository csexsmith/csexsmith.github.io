import { useState, useEffect } from 'react';
import { queryDatabase } from '../backend/api';

const useQueryDb = (query) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    console.log('Running query:', query); // Debug: Check how often this runs

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await queryDatabase(query);
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Ensure `query` is stable and not changing unnecessarily

  return { data, error, loading };
};

export default useQueryDb;