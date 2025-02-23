import { useState, useCallback } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const baseUrl = process.env.REACT_APP_API_URL || ''; // Ensure it's defined

  const fetchData = useCallback(async ({ method, url, options = {}, auth = false }) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      let config = { method, url: `${baseUrl}${url}`, ...options };

      if (auth) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw { response: { status: 401, data: 'No token provided' } };
        }
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await axios(config);
      setData(response.data);
      setStatusCode(response.status);

      return { data: response.data, statusCode: response.status, error: null };
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data || 'An unexpected error occurred';

      setError(message);
      setStatusCode(status);

      return { data: null, statusCode: status, error: message };
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  return { data, error, loading, fetchData, statusCode };
};

export default useAxios;
