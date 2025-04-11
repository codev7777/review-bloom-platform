import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "@/lib/api/axiosConfig";
import { toast } from "@/components/ui/use-toast";

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
  login: (
    email: string,
    password: string
    // recaptchaToken: string
  ) => Promise<void>;
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

  const DEBUG = false; // Set to true for console logs

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
    // recaptchaToken: string
  ) => {
    try {
      setIsLoading(true);
      if (DEBUG) console.log("Attempting login...");

      const response = await api.post("/auth/login", {
        email,
        password,
        // recaptchaToken,
      });

      const { tokens, user } = response.data;
      const token = tokens.access.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      toast({
        title: "Login successful",
        description: "Welcome back to ReviewBrothers!",
      });

      if (user.role === "USER") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error?.response?.data?.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { userData } = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast({
        title: "Account created",
        description: "Welcome to ReviewBrothers!",
      });

      navigate("/vendor-dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error?.response?.data?.message || "Something went wrong",
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
      description: "You have been successfully logged out.",
    });
  };

  const isVendor = () => user?.role === "USER";
  const isAdmin = () => user?.role === "ADMIN";

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
