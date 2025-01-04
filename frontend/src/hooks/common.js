import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = window.location.origin;


const apiClient = axios.create({
  baseURL: `${API_URL}/api`, 
  headers: {
    "Content-Type": "application/json", 
  },
  withCredentials: true, 
});

// Response interceptors 
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      useNavigate("/login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

