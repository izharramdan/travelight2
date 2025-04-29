import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useEditActivity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editActivity = async (data) => {
    try {
      const userConfirmed = window.confirm("Confirm to edit this activity?");

      if (!userConfirmed) {
        return false;
      }
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.EDIT_ACTIVITY}/${data.activityId}`,
        {
          categoryId: data.categoryId,
          title: data.title,
          description: data.description,
          imageUrls: data.imageUrls,
          price: data.price,
          price_discount: data.price_discount,
          rating: data.rating,
          total_reviews: data.total_reviews,
          facilities: data.facilities,
          address: data.address,
          province: data.province,
          city: data.city,
          location_maps: data.location_maps,
        },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { editActivity, isLoading };
};

export default useEditActivity;
