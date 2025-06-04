import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import InActive from "./pages/InActive";
import NotFound from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CareersPage from "./pages/CareersPage";
import ContactUsPage from "./pages/ContactUsPage";
import FAQsPage from "./pages/FAQsPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import VerificationEmailSent from "./pages/VerificationEmailSent";
import SuccessPage from "./pages/success";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import ScrollToTop from "./lib/ScrollToTop";
import SubscriptionPage from "./pages/subscription";

const queryClient = new QueryClient();

const ReviewRedirect = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <Navigate to={`/review/${campaignId}/step/1`} replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/inactive" element={<InActive />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route
                  path="/review/:campaignId"
                  element={<ReviewRedirect />}
                />
                <Route
                  path="/review/:campaignId/step/:step"
                  element={<ReviewPage />}
                />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route
                  path="/auth/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/auth/reset-password"
                  element={<ResetPasswordPage />}
                />
                <Route path="/terms-and-conditions" element={<ContactPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route
                  path="/verification-email-sent"
                  element={<VerificationEmailSent />}
                />

                {/* Vendor Dashboard Routes */}
                <Route
                  path="/vendor-dashboard/*"
                  element={
                    // <PrivateRoute>
                    <VendorDashboard />
                    // </PrivateRoute>
                  }
                />

                {/* Admin Dashboard Routes */}
                <Route
                  path="/admin-dashboard/*"
                  element={
                    // <PrivateRoute>
                    <AdminDashboard />
                    // </PrivateRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
