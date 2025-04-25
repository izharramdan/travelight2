import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_BANNER}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setBanners(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return {
    isLoading,
    banners,
    fetcher,
    setBanners,
  };
};

export default useBanner;
