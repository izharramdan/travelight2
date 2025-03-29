import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const UseLogin = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    role: null,
    shouldRedirect: false,
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState.shouldRedirect && loginState.role) {
      const handleRedirect = async () => {
        const path = loginState.role === "admin" ? "/" : "/";
        navigate(path);
      };

      handleRedirect();
    }
  }, [loginState, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.LOGIN}`,
        loginData,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );

      const token = response.data?.token;
      const user = response.data?.data;

      document.cookie = `token=${token}`;

      setError("");
      setUser(user);
      setLoginState({
        role: user.role,
        shouldRedirect: true,
      });
      setSuccess(true);
      toast(`Welcome ${user.name}`, {
        icon: "👋",
      });
    } catch (e) {
      setSuccess(false);
      setError(e.response?.data?.message || "An error occurred");
      setLoginState({
        role: null,
        shouldRedirect: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin,
    success,
  };
};

export default UseLogin;
