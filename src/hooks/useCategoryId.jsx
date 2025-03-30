import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useCategoryId = () => {
  const [data, setData] = useState(null); // Tidak perlu tipe data di JSX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { category } = useParams(); // Ambil parameter kategori dari URL

  const getCategoryById = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_CATEGORY_BY_ID}/${id}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching the category."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      getCategoryById(category); // Panggil fungsi dengan parameter kategori
    }
  }, [category]); // Jalankan efek saat parameter kategori berubah

  return { data, isLoading, error };
};

export default useCategoryId;
