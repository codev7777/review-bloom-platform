import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/overview/AdminOverview";
import VendorsList from "@/components/admin/vendors/VendorsList";
import DiscountCodesList from "@/components/admin/discounts/DiscountCodesList";
import WhiteLabelSettings from "@/components/admin/white-label/WhiteLabelSettings";
import AdminSettings from "@/components/admin/settings/AdminSettings";
import Categories from "@/pages/admin/Categories";
import { Layout, LayoutContent } from "@/components/ui/layout";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/config/env";
import { checkApiHealth } from "@/lib/api/axiosConfig";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { toast } = useToast();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768; // md breakpoint
      setSidebarOpen(!isMobileNow);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check connectivity to backend on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const isHealthy = await checkApiHealth();
        if (isHealthy) {
          toast({
            title: "Backend connection successful",
            description: `Connected to ${API_URL} backend API`,
          });
        } else {
          throw new Error("Failed to connect to backend");
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          description:
            "Unable to connect to the backend API. Please try again later.",
        });
      }
    };

    checkBackendConnection();
  }, [toast]);

  return (
    <Layout className="bg-gray-50">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      />
      <div className="flex h-[calc(100vh-4rem)] mt-16">
        <AdminSidebar
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
        />
        <LayoutContent className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/vendors" element={<VendorsList />} />
            {/* <Route path="/categories" element={<Categories />} /> */}
            <Route path="/discounts" element={<DiscountCodesList />} />
            <Route path="/white-label" element={<WhiteLabelSettings />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </LayoutContent>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
