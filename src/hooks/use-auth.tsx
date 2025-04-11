import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import * as userApi from "@/lib/api/users/users.api";
import { User } from "@/lib/api/users/users.api";

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

  const DEBUG = false; // Set to true for console logs

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

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

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      if (DEBUG) console.log("Attempting login...");

      const response = await userApi.login({ email, password });
      const { tokens, user } = response;
      localStorage.setItem("refreshToken", tokens.refresh.token);
      localStorage.setItem("accessToken", tokens.access.token);
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

      const userData = await userApi.register({ name, email, password });

      // After successful registration, automatically log in
      await login(email, password);

      toast({
        title: "Account created",
        description: "Welcome to ReviewBrothers!",
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error?.response?.data?.message || "Something went wrong",
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
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
