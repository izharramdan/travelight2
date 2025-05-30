import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useUploadImage from "./useUploadImage";

const useRegister = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { uploadImage } = useUploadImage();

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");

    if (password !== passwordRepeat) {
      setError("Password don't match");
      setIsLoading(false);
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      const uploadImageUrl = await uploadImage(imageFile);
      if (uploadImageUrl) {
        imageUrl = uploadImageUrl;
      } else {
        setIsLoading(false);
        return;
      }
    }

    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: password,
      passwordRepeat: passwordRepeat,
      role: "user",
      profilePictureUrl: imageUrl,
      phoneNumber: formData.get("phoneNumber"),
    };

    try {
      await axios.post(`${BASE_URL.API}${END_POINT.REGISTER}`, registerData, {
        headers: {
          apiKey: API_KEY,
        },
      });
      setSuccess(true);
      setError("");
      toast.success("successfully registered");
      setTimeout(() => navigate("/"), 2000);
      // navigate("/login");
    } catch (e) {
      setSuccess(false);
      setError(
        e.response?.data?.message ||
          e.response?.data?.errors[0]?.message ||
          "An error occurred"
      );
      toast.error(e.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    success,
    error,
    isLoading,
    handleRegister,
    setImageFile,
  };
};

export default useRegister;
