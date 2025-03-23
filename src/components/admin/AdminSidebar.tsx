
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tags,
  Palette,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminSidebar = ({ open, onOpenChange }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: "Overview",
      path: "/admin-dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Vendor Accounts",
      path: "/admin-dashboard/vendors",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Discount Codes",
      path: "/admin-dashboard/discounts",
      icon: <Tags className="h-5 w-5" />,
    },
    {
      name: "White Labeling",
      path: "/admin-dashboard/white-label",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/admin-dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "bg-[#232F3E] border-r border-sidebar-border fixed inset-y-0 z-40 flex flex-col transition-all duration-300 lg:relative lg:left-0",
        open ? "left-0" : "-left-full lg:w-20"
      )}
    >
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-[#232F3E] px-4">
        <Link to="/admin-dashboard" className="flex items-center gap-2">
          {open ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
                ReviewBrothers
              </span>
              <span className="text-sm text-white/80 font-medium px-2 py-0.5 rounded-md bg-[#FF9900]/10">
                Admin
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FF9900]/10">
              <span className="text-[#FF9900] font-bold">A</span>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-sidebar-accent hover:text-white"
          onClick={() => onOpenChange(!open)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 overflow-auto py-2">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-sidebar-accent",
                open ? "justify-start" : "justify-center",
                isActive(item.path)
                  ? "bg-[#FF9900] text-[#232F3E] hover:bg-[#FF9900]/90"
                  : "text-white/80 hover:text-white"
              )}
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
