import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const usePaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPaymentMethods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_PAYMENT_METHOD}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      if (response.data && response.data.data) {
        setPaymentMethods(response.data.data); // Simpan data ke state
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      setError(
        error.response?.data?.message || "Failed to fetch payment methods"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return { paymentMethods, isLoading, error };
};

export default usePaymentMethod;