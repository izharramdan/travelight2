import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useUpdateCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateCart = async (cartId, quantity) => {
    try {
      setIsLoading(true);

      // Ambil token dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      // Kirim permintaan ke API
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_CART}/${cartId}`,
        { quantity },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        
      } else {
        toast.error(response.data?.message || "Failed to update cart.");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCart, isLoading };
};

export default useUpdateCart;