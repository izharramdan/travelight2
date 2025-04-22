import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useAllUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
        `${BASE_URL.API}${END_POINT.GET_ALL_USER}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
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
    isLoading,
    users,
    fetcher,
  };
};

export default useAllUser;
