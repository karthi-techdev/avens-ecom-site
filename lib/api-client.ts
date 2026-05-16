import axios from 'axios';
import URLs from './urls';

const apiClient = axios.create({
    baseURL: `${URLs.LIVEURL}api/v1`, // Use the root URL from your config
    headers: {
        "Content-Type": "application/json" // FIX: Change from multipart to application/json
    },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // FIX: Check how you actually store the token. 
    // If it's inside the 'user' object:
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const token = user?.token || localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default apiClient;