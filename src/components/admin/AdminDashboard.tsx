
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout, LayoutHeader, LayoutContent } from "@/components/ui/layout";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminOverview from "./overview/AdminOverview";
import VendorsList from "./vendors/VendorsList";
import DiscountCodesList from "./discounts/DiscountCodesList";
import WhiteLabelSettings from "./white-label/WhiteLabelSettings";
import AdminSettings from "./settings/AdminSettings";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <Layout>
      <AdminSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <LayoutHeader>
        <AdminHeader sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
      </LayoutHeader>
      <LayoutContent className="animate-fade-in-50">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/vendors" element={<VendorsList />} />
          <Route path="/discounts" element={<DiscountCodesList />} />
          <Route path="/white-label" element={<WhiteLabelSettings />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
        </Routes>
      </LayoutContent>
    </Layout>
  );
};

export default AdminDashboard;
