import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useEditBanner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editBanner = async (data) => {
    try {
      const userConfirmed = window.confirm("Confirm to edit this banner?");
      if (!userConfirmed) return false;

      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];


      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.EDIT_BANNER}/${data.bannerId}`,
        {
          name: data.name,
          imageUrl: data.imageUrl,
        },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        return true; // Operasi berhasil
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to edit banner.");
      return false; // Operasi gagal
    } finally {
      setIsLoading(false);
    }
  };

  return { editBanner, isLoading };
};

export default useEditBanner;