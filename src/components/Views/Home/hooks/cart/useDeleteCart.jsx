import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useDeleteCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCart = async (cartId, refreshCart) => {
    try {
      // Tampilkan dialog konfirmasi sebelum melanjutkan
      const userConfirmed = window.confirm(
        "Are you sure you want to remove this item?"
      );

      if (!userConfirmed) {
        // Jika pengguna membatalkan, hentikan proses
        return;
      }

      setIsLoading(true);

      // Ambil token dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      // Kirim permintaan ke API
      const response = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_CART}/${cartId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === "200") {
        toast.success(response.data.message);
        if (refreshCart) {
          await refreshCart();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteCart, isLoading };
};

export default useDeleteCart;
