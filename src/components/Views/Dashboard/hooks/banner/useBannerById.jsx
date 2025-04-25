import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useBannerById = (bannerId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState(null);

  const fetchBannerById = async () => {
    if (!bannerId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_BANNER_BY_ID}/${bannerId}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setBanner(response.data.data);
    } catch (error) {
      console.error("Failed to fetch banner by ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerById();
  }, [bannerId]);

  return {
    isLoading,
    banner,
    refetch: fetchBannerById,
  };
};

export default useBannerById;
