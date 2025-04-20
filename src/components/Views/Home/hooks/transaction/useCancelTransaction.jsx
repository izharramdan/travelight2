import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useCancelTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const cancelTransaction = async (transactionId) => {
      try {
        const userConfirmed = window.confirm(
          "Are you sure you want to cancel this transaction?"
        );
  
        if (!userConfirmed) {
          return false; // Jika pengguna membatalkan, hentikan proses
        }
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL.API}${END_POINT.CANCEL_TRANSACTION}/${transactionId}`,
          {},
          {
            headers: {
              apiKey: API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          return true; // Berhasil
        } else {
          toast.error(response.data.message);
          return false; // Gagal
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Failed to cancel transaction");
        return false; // Gagal
      } finally {
        setIsLoading(false);
      }
    };
  
    return { cancelTransaction, isLoading, error };
  };
  
  export default useCancelTransaction;
