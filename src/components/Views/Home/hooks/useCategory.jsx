import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../services/endpoint";
import axios from "axios";

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
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetcher();
        setCategories(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return { categories, loading, error };
};

export default useCategory;
