import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Create a public Axios instance that doesn't require authentication
const publicApi = axios.create({
  baseURL: "https://reviewbrothers.com/api/v1", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor to handle errors globally
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);

      // Handle specific error cases
      if (error.response.status === 404) {
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

export default publicApi;
