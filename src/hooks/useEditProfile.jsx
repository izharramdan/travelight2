import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";

const useEditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editProfile = async (data) => {
    setIsLoading(true);
    try {
      const userConfirmed = window.confirm("Confirm to edit this profile?");
      if (!userConfirmed) {
        return false;
      }
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_PROFILE}`,
        data,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { editProfile, isLoading };
};

export default useEditProfile;
