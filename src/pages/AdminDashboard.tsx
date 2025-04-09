
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/overview/AdminOverview";
import VendorsList from "@/components/admin/vendors/VendorsList";
import DiscountCodesList from "@/components/admin/discounts/DiscountCodesList";
import WhiteLabelSettings from "@/components/admin/white-label/WhiteLabelSettings";
import AdminSettings from "@/components/admin/settings/AdminSettings";
import { Layout, LayoutContent } from "@/components/ui/layout";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Check connectivity to backend on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch("http://localhost:3000/v1/health");
        if (response.ok) {
          toast({
            title: "Backend connection successful",
            description: "Connected to localhost:3000 backend API",
          });
        } else {
          throw new Error("Failed to connect to backend");
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        toast({
          variant: "destructive",
          title: "Backend connection failed",
          description: "Using mock data. Please ensure localhost:3000 is running.",
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
      <div className="flex h-screen pt-16">
        <AdminSidebar 
          open={sidebarOpen} 
          onOpenChange={setSidebarOpen} 
        />
        <LayoutContent className="w-full p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/vendors" element={<VendorsList />} />
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
