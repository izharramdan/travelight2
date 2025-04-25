import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useAddBanner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addBanner = async (data) => {
    try {
      const userConfirmed = window.confirm("Confirm to add this banner?");

      if (!userConfirmed) {
        // Jika pengguna membatalkan, hentikan proses
        return false;
      }
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.CREATE_BANNER}`,
        data,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addBanner, isLoading };
};

export default useAddBanner;
