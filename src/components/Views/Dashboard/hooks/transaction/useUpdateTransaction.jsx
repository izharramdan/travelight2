import { useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useUpdateTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateTransaction = async (id, data) => {
    try {
      setIsLoading(true);

      // Ambil token dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_TRANSACTION_STATUS}/${id}`,
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
        return true; // Berhasil memperbarui transaksi
      } else {
        toast.error(response.data.message);
        return false; // Gagal memperbarui transaksi
      }
    } catch (error) {
      console.error(error);
      return false; // Gagal memperbarui transaksi
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTransaction, isLoading };
};

export default useUpdateTransaction;
