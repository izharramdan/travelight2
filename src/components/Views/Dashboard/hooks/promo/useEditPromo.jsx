import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useEditPromo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editPromo = async (data) => {
    try {
      const userConfirmed = window.confirm("Confirm to edit this promo");
      if (!userConfirmed) {
        return false;
      }

      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.EDIT_PROMO}/${data.promoId}`, // Gunakan promoId dari data
        {
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          terms_condition: data.terms_condition,
          promo_code: data.promo_code,
          promo_discount_price: data.promo_discount_price,
          minimum_claim_price: data.minimum_claim_price,
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
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, editPromo };
};

export default useEditPromo;
