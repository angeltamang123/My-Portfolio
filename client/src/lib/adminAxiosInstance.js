import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "/",
});

// Request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional, but good for handling global 401 errors)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid
      sessionStorage.removeItem("adminToken");
      // Redirect to admin page
      // Check if window is defined to ensure it's client-side
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/admin") {
          window.location.href = "/admin";
        }
      }

      toast.error("Unauthorized or token expired. Redirecting to login.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
