import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useActivityCategory = () => {
  const [dataActivity, setData] = useState([]); // Tidak perlu tipe data di JSX
  const [isLoadingActivity, setIsLoading] = useState(false);
  const [errorActivity, setError] = useState(null);

  const { category } = useParams(); // Ambil parameter dari URL

  const getUsersList = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_ACTIVITIES_BY_CATEGORY}/${id}`,
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
          "An error occurred while fetching activities."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      getUsersList(category); // Panggil fungsi dengan parameter kategori
    }
  }, [category]); // Jalankan efek saat parameter kategori berubah

  return { dataActivity, isLoadingActivity, errorActivity };
};

export default useActivityCategory;