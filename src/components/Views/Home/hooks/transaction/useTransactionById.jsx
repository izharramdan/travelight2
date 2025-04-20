import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const getToken = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || null
  );
};

const useTransactionById = (transactionId) => {
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.MY_TRANSACTION_BY_ID}/${transactionId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransaction(response.data.data);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch transaction");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

  return { transaction, isLoading, error };
};

export default useTransactionById;
