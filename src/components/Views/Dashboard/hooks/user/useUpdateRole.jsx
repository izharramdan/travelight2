import { useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";
import toast from "react-hot-toast";

const useUpdateRole = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateRole = async (id, data) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to update the role?"
      );

      if (!userConfirmed) {
        return false; // Jika pengguna membatalkan, hentikan proses
      }
      setIsLoading(true);

      // Ambil token dari cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_USER_ROLE}/${id}`,
        data,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        return true; // Berhasil memperbarui peran pengguna
      } else {
        toast.error(response.data.message);
        return false; // Gagal memperbarui peran pengguna
      }
    } catch (error) {
      console.error(error);
      return false; // Gagal memperbarui peran pengguna
    } finally {
      setIsLoading(false);
    }
  };

  return { updateRole, isLoading };
};

export default useUpdateRole;
