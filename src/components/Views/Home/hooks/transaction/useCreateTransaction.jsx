import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useCreateTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTransaction = async (data) => {
    try {
      // Tampilkan dialog konfirmasi sebelum melanjutkan
      const userConfirmed = window.confirm(
        "Are you sure you want to add this item to the cart?"
      );

      if (!userConfirmed) {
        // Jika pengguna membatalkan, hentikan proses
        return false;
      }

      setIsLoading(true);

      // Ambil token dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.CREATE_TRANSACTION}`,
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
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the transaction.");
      return false; // Transaksi gagal
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createTransaction,
  };
};

export default useCreateTransaction;
