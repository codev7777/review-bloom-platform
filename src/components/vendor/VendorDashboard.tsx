
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BarChart4, 
  ShoppingBag, 
  QrCode, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CampaignCard from "./CampaignCard";
import StatsCard from "./StatsCard";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/vendor-dashboard" },
    { icon: <BarChart4 size={20} />, label: "Analytics", path: "/vendor-dashboard/analytics" },
    { icon: <ShoppingBag size={20} />, label: "Products", path: "/vendor-dashboard/products" },
    { icon: <QrCode size={20} />, label: "Campaigns", path: "/vendor-dashboard/campaigns" },
    { icon: <Settings size={20} />, label: "Settings", path: "/vendor-dashboard/settings" },
  ];

  return (
    <aside
      className={`${
        isMobile
          ? `fixed inset-y-0 left-0 z-50 w-64 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`
          : "sticky top-0 h-screen w-64 flex-shrink-0"
      } bg-white border-r border-border`}
    >
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-foreground md:hidden"
        >
          <X size={24} />
        </button>
      )}
      
      <div className="flex flex-col h-full py-6">
        <div className="px-6 mb-8">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ReviewBloom
          </h2>
        </div>
        
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate(item.path);
                if (isMobile) toggleSidebar();
              }}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="px-3 mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => navigate("/")}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button>Create Campaign</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Reviews" 
          value="486" 
          change="+12.5%" 
          changeType="positive" 
          period="from last month"
        />
        <StatsCard 
          title="Average Rating" 
          value="4.7" 
          change="+0.3" 
          changeType="positive" 
          period="from last month"
        />
        <StatsCard 
          title="Review Conversion" 
          value="3.2%" 
          change="-0.5%" 
          changeType="negative" 
          period="from last month"
        />
        <StatsCard 
          title="Active Campaigns" 
          value="5" 
          change="+2" 
          changeType="positive" 
          period="from last month"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Recent Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CampaignCard 
            name="Kitchen Knife Set" 
            image="https://placehold.co/200x200/EEE/31304D?text=Kitchen+Set"
            status="active"
            reviews={156}
            rating={4.8}
            date="2023-05-15"
          />
          <CampaignCard 
            name="Yoga Mat" 
            image="https://placehold.co/200x200/EEE/31304D?text=Yoga+Mat"
            status="active"
            reviews={98}
            rating={4.5}
            date="2023-06-20"
          />
          <CampaignCard 
            name="Bluetooth Headphones" 
            image="https://placehold.co/200x200/EEE/31304D?text=Headphones"
            status="active"
            reviews={212}
            rating={4.7}
            date="2023-04-10"
          />
        </div>
      </div>
    </div>
  );
};

const Analytics = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-8">Analytics</h1>
    <div className="p-12 border border-dashed rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Analytics dashboard content goes here</p>
    </div>
  </div>
);

const Products = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-8">Products</h1>
    <div className="p-12 border border-dashed rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Products management content goes here</p>
    </div>
  </div>
);

const Campaigns = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-8">Campaigns</h1>
    <div className="p-12 border border-dashed rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Campaign management content goes here</p>
    </div>
  </div>
);

const Settings = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-8">Settings</h1>
    <div className="p-12 border border-dashed rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Settings content goes here</p>
    </div>
  </div>
);

const VendorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 bg-white p-2 rounded-md shadow-sm"
          >
            <Menu size={24} />
          </button>
        )}
        
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/products" element={<Products />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
