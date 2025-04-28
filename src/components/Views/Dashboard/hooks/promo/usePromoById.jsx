import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const usePromoById = (promoId) => {
  const [promo, setPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPromoById = async () => {
    if (!promoId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_PROMO_BY_ID}/${promoId}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setPromo(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoById();
  }, [promoId]);

  return {
    promo,
    isLoading,
  };
};

export default usePromoById;
