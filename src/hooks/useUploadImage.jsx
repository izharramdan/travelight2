import { API_KEY, BASE_URL, END_POINT } from "../services/endpoint";
import axios from "axios";
import { useState } from "react";

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPLOAD_IMAGE}`,
        formData,
        {
          headers: {
            apiKey: API_KEY,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data?.code === "200") {
        return response.data.url;
      }
      throw new Error("Failed to upload image");
    } catch (error) {
      throw error;
    }
  };

  return { uploadImage, uploadProgress };
};

export default useUploadImage;
