import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useAllTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getToken = () => {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null
    );
  };

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.ALL_TRANSACTION}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return {
    fetcher,
    transactions,
    data: transactions,
    isLoading,
  };
};

export default useAllTransaction;
