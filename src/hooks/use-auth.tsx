import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { toast } from "@/components/ui/use-toast";
import api from "@/lib/api/axiosConfig";
// Define the User and AuthContextType interfaces
interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isVendor: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage and JWT token
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // Clear corrupt data
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log(0);
    try {
      setIsLoading(true);
      console.log(1);
      const response = await api.post("/auth/login", { email, password });
      console.log(response.data);
      console.log(2);
      // Assuming response contains JWT and user data
      const { tokens, user } = response.data;
      console.log(tokens);
      console.log(user);
      // Save the token and user data to localStorage
      localStorage.setItem("token", tokens);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(3);
      setUser(user);

      toast({
        title: "Login successful",
        description: "Welcome back to ReviewBrothers!",
      });
      console.log(4);
      // Redirect based on user role
      if (user.role == "USER") {
        navigate("/vendor-dashboard");
      } else if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      }
      console.log(5);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    if (password)
      try {
        setIsLoading(true);

        // Make a real API call with Axios
        const response = await api.post("/auth/register", {
          name,
          email,
          password,
        });

        // Assuming response contains user data
        const { userData } = response.data;

        // Save the user data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        toast({
          title: "Account created",
          description: "Welcome to ReviewBrothers!",
        });

        navigate("/vendor-dashboard");
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const isVendor = () => user?.role === "USER";
  const isAdmin = () => user?.role === "ADMIN";

  // Static method to access context
  AuthProvider.useContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        isVendor,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Static method to access context
AuthProvider.useContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
