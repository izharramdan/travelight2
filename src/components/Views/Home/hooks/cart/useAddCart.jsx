import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useAddCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (activityId) => {
    try {
      // Tampilkan dialog konfirmasi sebelum melanjutkan
      const userConfirmed = window.confirm(
        "Are you sure you want to add this item to the cart?"
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
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.ADD_CART}`,
        { activityId },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tampilkan notifikasi berdasarkan respons
      if (response.data.code === "200") {
        toast.success(response.data.message || "Added to cart successfully!");
      } else {
        toast.error(response.data.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, isLoading };
};

export default useAddCart;