import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

export const useCategoryById = (categoryId) => {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryById = async () => {
    if (!categoryId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_CATEGORY_BY_ID}/${categoryId}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setCategory(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryById();
  }, [categoryId]);

  return {
    category,
    isLoading,
  };
};

export default useCategoryById;
