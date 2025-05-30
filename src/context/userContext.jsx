import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const fetchUserData = async () => {
    try {
      const token = getToken("token");

      if (!token) {
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_LOGGED_USER}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.code === "200") {
        setUser(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    setLoading(true);
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;