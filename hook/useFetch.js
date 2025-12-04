import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request({
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'x-rapidapi-key': '780d28182fmsh501def123acb785p10748ajsn965a73c21429',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        },
        params: {
          ...query,
        },
      });

      setData(response.data.data);
    } catch (err) {
      setError(err);
      console.error('Fetch error:', err);
      alert('There was a problem fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(query)]); // Re-fetch on param change

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
