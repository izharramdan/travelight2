import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoutState, setLogoutState] = useState({
    isLoggedOut: false,
    shouldRedirect: false,
  });
  const { setUser } = useUser();

  const getToken = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = async () => {
    setIsLoading(true); // Set loading hanya jika pengguna mengonfirmasi logout
    const token = getToken("token");
    if (!token) {
      setIsLoading(false);
      toast.error("Token not found");
      return;
    }

    try {
      const userConfirmed = window.confirm("Are you sure you want to logout?");
      if (!userConfirmed) {
        return;
      }
      const response = await axios.get(`${BASE_URL.API}${END_POINT.LOGOUT}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.code === "200") {
        deleteCookie("token");
        setUser(null);
        toast(`See you again`, {
          icon: "👋",
        });
        setLogoutState({
          isLoggedOut: true,
          shouldRedirect: true,
        });
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      console.log("Logout error:", err);
      toast.error("An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (logoutState.shouldRedirect && logoutState.isLoggedOut) {
    }
  }, [logoutState]);

  return { handleLogout, isLoading };
};

export default useLogout;
