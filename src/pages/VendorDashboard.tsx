
import VendorDashboardComponent from "@/components/vendor/VendorDashboard";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { checkApiHealth } from "@/lib/api/axiosConfig";

const VendorDashboard = () => {
  useEffect(() => {
    // Check API health when the dashboard loads
    const verifyApiConnection = async () => {
      const isHealthy = await checkApiHealth();
      if (!isHealthy) {
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          description: "Using mock data. Please ensure localhost:3000 is running.",
        });
      }
    };
    
    verifyApiConnection();
  }, []);
  
  return <VendorDashboardComponent />;
};

export default VendorDashboard;
