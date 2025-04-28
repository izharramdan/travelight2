import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import axios from "axios";

const usePromoDashboard = () => {
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetcher = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_PROMO}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setPromos(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return { promos, isLoading, fetcher, setPromos };
};

export default usePromoDashboard;
