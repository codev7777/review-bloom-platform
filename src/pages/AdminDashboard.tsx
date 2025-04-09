
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/overview/AdminOverview";
import VendorsList from "@/components/admin/vendors/VendorsList";
import DiscountCodesList from "@/components/admin/discounts/DiscountCodesList";
import WhiteLabelSettings from "@/components/admin/white-label/WhiteLabelSettings";
import AdminSettings from "@/components/admin/settings/AdminSettings";
import { Layout, LayoutContent } from "@/components/ui/layout";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
