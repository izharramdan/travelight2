import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useDeleteActivity = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteActivity = async (activityId) => {
    try {
      const userConfirmed = window.confirm("Confirm to delete this activity?");
      if (!userConfirmed) return false;

      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_ACTIVITY}/${activityId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Activity deleted successfully");
        return true; // Operasi berhasil
      } else {
        toast.error(response.data.message || "Failed to delete activity");
        return false; // Operasi gagal
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error(error.response?.data?.message || "Failed to delete activity");
      return false; // Operasi gagal
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteActivity };
};

export default useDeleteActivity;
