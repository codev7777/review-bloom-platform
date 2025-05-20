import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/admin-dashboard") {
      // For Overview, only match exact path
      return location.pathname === "/admin-dashboard";
    }
    // For other items, match if path starts with the item's path
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Vendor Accounts",
      path: "/admin-dashboard/vendors",
      icon: <Users className="h-5 w-5" />,
    },
    // {
    //   name: "Categories",
    //   path: "/admin-dashboard/categories",
    //   icon: <List className="h-5 w-5" />,
    // },
    {
      name: "Discount Codes",
      path: "/admin-dashboard/discounts",
      icon: <Tags className="h-5 w-5" />,
    },
    // {
    //   name: "White Labeling",
    //   path: "/admin-dashboard/white-label",
    //   icon: <Palette className="h-5 w-5" />,
    // },
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
      <div className="sticky top-0 z-10 flex h-16 items-center justify-end bg-[#232F3E] px-4">
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
                  : "text-white/80 hover:text-[#232F3E] hover:bg-white"
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
