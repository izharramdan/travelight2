import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import axios from "axios";

const fetcher = async () => {
  try {
    const response = await axios.get(`${BASE_URL.API}${END_POINT.GET_PROMO}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const usePromoDashboard = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const data = await fetcher();
        setPromos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  return { promos, loading, error };
};

export default usePromoDashboard;
