import { useState, useEffect } from "react";
import { API_KEY, BASE_URL, END_POINT } from "../../../../services/endpoint";
import axios from "axios";

const fetcher = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL.API}${END_POINT.GET_ACTIVITIES}`,
      {
        headers: {
          apiKey: API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await fetcher();
        setActivities(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);
  return { activities, loading, error };
};

export default useActivity;
