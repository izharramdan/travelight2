import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useActivityId = () => {
  const [data, setData] = useState(null); // Tidak perlu tipe data di JSX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { activity } = useParams(); // Ambil parameter kategori dActivity
  const getActivityById = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_ACTIVITIES_BY_ID}/${id}`,
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
    if (activity) {
      getActivityById(activity); // Panggil fungsi dengan parameter kategori
    }
  }, [activity]); // Jalankan efek saat parameter kategori berubah

  return { data, isLoading, error };
};

export default useActivityId;
