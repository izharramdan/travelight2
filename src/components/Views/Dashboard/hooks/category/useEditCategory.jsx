import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

export const useEditCategory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editCategory = async (data) => {
    try {
      const userConfirmed = window.confirm("Confirm to edit this category?");

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
        `${BASE_URL.API}${END_POINT.EDIT_CATEGORY}/${data.categoryId}`,
        data,
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
      } else {
        toast.error(response.data.message);
        return false; // Operasi gagal
      }
    } catch (error) {
      console.error(error);
      return false; // Operasi gagal
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, editCategory };
};

export default useEditCategory;
