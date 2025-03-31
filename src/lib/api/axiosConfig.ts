import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:3000/v1", // ✅ Ensure correct base URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
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
      if (error.response.status === 401) {
        // Handle token expiration (optional)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
