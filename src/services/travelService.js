import axios from 'axios';

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${base_url}/api/v1/login`,
      { email, password },
      {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};