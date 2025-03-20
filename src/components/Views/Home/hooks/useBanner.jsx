import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../services/endpoint";
import axios from "axios";

const fetcher = async () => {
  try {
    const response = await axios.get(`${BASE_URL.API}${END_POINT.GET_BANNER}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await fetcher();
        setBanners(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
};

export default useBanner;
