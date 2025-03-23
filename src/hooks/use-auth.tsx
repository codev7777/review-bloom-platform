
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'vendor' | 'admin';
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
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login validation
      if (email === 'vendor@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: 'vendor@example.com',
          name: 'Vendor User',
          role: 'vendor',
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Login successful",
          description: "Welcome back to ReviewBrothers!",
        });
        
        navigate('/vendor-dashboard');
      } else if (email === 'admin@example.com' && password === 'admin') {
        const userData: User = {
          id: '2',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Admin Login successful",
          description: "Welcome back, Admin!",
        });
        
        navigate('/admin-dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'vendor',
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Account created",
        description: "Welcome to ReviewBrothers!",
      });
      
      navigate('/vendor-dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const isVendor = () => user?.role === 'vendor';
  const isAdmin = () => user?.role === 'admin';

  // Add static context accessor for use in components that don't have direct access
  AuthProvider.useContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
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
        isAdmin
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
