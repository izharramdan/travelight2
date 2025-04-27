import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import axios from "axios";

const useCategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetcher = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_CATEGORY}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return { categories, isLoading, fetcher, setCategories };
};

export default useCategoryDashboard;
