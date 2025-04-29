import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const useActivityById = (activityId) => {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchActivityById = async () => {
    if (!activityId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_ACTIVITIES_BY_ID}/${activityId}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setActivity(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityById();
  }, [activityId]);

  return {
    activity,
    isLoading,
  };
};

export default useActivityById;
