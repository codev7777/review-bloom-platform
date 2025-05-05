import React from "react";
import VendorDashboardComponent from "@/components/vendor/VendorDashboard";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { checkApiHealth } from "@/lib/api/axiosConfig";
import { ThemeProvider } from "@/components/theme/theme-provider";

const VendorDashboard = () => {
  useEffect(() => {
    // Check API health when the dashboard loads
    const verifyApiConnection = async () => {
      try {
        const isHealthy = await checkApiHealth();
        if (!isHealthy) {
          toast({
            variant: "destructive",
            title: "Backend connection failed",
            // description: "Using mock data. Please ensure localhost:3000 is running.",
          });
        }
      } catch (error) {
        console.error("API health check failed:", error);
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          // description:
          // "Using mock data. Please ensure localhost:3000 is running.",
        });
      }
    };

    verifyApiConnection();
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <VendorDashboardComponent />
    </ThemeProvider>
  );
};

export default VendorDashboard;
