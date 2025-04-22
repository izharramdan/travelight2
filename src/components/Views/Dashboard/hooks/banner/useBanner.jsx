import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const fetcher = async () => {
    const getToken = () => {
      return (
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || null
      );
    };
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_BANNER}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
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
  };
};

export default useBanner;
