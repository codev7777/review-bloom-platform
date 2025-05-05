import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/config/env";
import * as userApi from "@/lib/api/users/users.api";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_URL, // Using environment-based API URL

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to attach the token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await userApi.refreshTokens(refreshToken);
        const { access } = response.tokens;

        localStorage.setItem("accessToken", access.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${access.token}`;

        processQueue(null, access.token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Don't redirect if already on login page or accessing public routes
        const currentPath = window.location.pathname;
        if (
          !currentPath.includes("/auth/") &&
          !currentPath.includes("/review/")
        ) {
          window.location.href = "/auth/login"; // Redirect to login
          toast({
            variant: "destructive",
            title: "Session expired",
            description: "Please log in again to continue.",
          });
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      console.error("API Error:", error.response.data);

      // Handle specific error cases
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "You don't have permission to perform this action.",
        });
      } else if (error.response.status === 404) {
        toast({
          variant: "destructive",
          title: "Not found",
          description: "The requested resource was not found.",
        });
      } else if (error.response.status === 429) {
        toast({
          variant: "destructive",
          title: "Too many requests",
          description: "Please try again later.",
        });
      } else if (error.response.status >= 500) {
        toast({
          variant: "destructive",
          title: "Server error",
          description:
            "Something went wrong on our end. Please try again later.",
        });
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error:", error.request);
      toast({
        variant: "destructive",
        title: "Network error",
        description:
          "Unable to connect to the server. Please check your internet connection.",
      });
    } else {
      // Something else happened in setting up the request
      console.error("Request Error:", error.message);
      toast({
        variant: "destructive",
        title: "Request error",
        description: error.message,
      });
    }

    return Promise.reject(error);
  }
);

// Helper function to check API health/connectivity
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/health");
    return response.status === 200;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

export default api;
