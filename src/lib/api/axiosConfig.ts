
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:3000/v1", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to attach the token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      
      // Handle specific error cases
      if (error.response.status === 401) {
        // Handle token expiration
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Don't redirect if already on login page or accessing public routes
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/auth/') && !currentPath.includes('/review/')) {
          window.location.href = "/auth/login"; // Redirect to login
          toast({
            variant: "destructive",
            title: "Session expired",
            description: "Please log in again to continue.",
          });
        }
      } else if (error.response.status === 403) {
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
          description: "Something went wrong on our end. Please try again later.",
        });
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error:", error.request);
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Unable to connect to the server. Please check your internet connection.",
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
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

export default api;
