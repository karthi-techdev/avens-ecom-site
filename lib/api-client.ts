import axios from 'axios';
import URLs from './urls';

const apiClient = axios.create({
    baseURL: `${URLs.LIVEURL}api/v1`,
    headers: {
       "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // 🔍 DEBUG

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default apiClient;
