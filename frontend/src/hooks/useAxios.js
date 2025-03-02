import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  const baseUrl = process.env.REACT_APP_API_URL || ""; // Ensure it's defined

  const fetchData = useCallback(
    async ({ method, url, options = {}, auth = false }) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        let config = { method, url: `${baseUrl}${url}`, ...options };

        if (auth) {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error(JSON.stringify({ response: { status: 401, data: "No token provided" } }));
          }
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await axios(config);
        setData(response.data);
        setStatusCode(response.status);

        return {
          data: response.data,
          statusCode: response.status,
          error: null,
        };
      } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data || "An unexpected error occurred";

        setError(message);
        setStatusCode(status);

        // 🚀 If 401 (Unauthorized), navigate to login and clear token
        if (status === 401) {
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login page
        }

        return { data: null, statusCode: status, error: message };
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, navigate]
  );

  return { data, error, loading, fetchData, statusCode };
};

export default useAxios;
