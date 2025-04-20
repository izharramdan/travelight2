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
const useMyTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.MY_TRANSACTION}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
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
    isLoading,
  };
};

export default useMyTransactions;
