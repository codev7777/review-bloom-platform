
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import VendorDashboard from "./pages/VendorDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-transition-enter">
      <ScrollToTop />
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/review/:campaignId" element={<PageTransition><ReviewPage /></PageTransition>} />
            <Route path="/auth/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/auth/signup" element={<PageTransition><SignupPage /></PageTransition>} />
            <Route path="/vendor-dashboard/*" element={
              <PageTransition>
                <PrivateRoute>
                  <VendorDashboard />
                </PrivateRoute>
              </PageTransition>
            } />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
