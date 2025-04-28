import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useDeletePromo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePromo = async (promoId) => {
    try {
      const userConfirmed = window.confirm("Confirm to delete this promo?");

      if (!userConfirmed) {
        // Jika pengguna membatalkan, hentikan proses
        return false;
      }
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_PROMO}/${promoId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
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
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deletePromo };
};

export default useDeletePromo;
