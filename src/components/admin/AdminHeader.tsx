import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

const AdminHeader = ({
  sidebarOpen,
  onSidebarOpenChange,
}: AdminHeaderProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [title, setTitle] = useState("Admin Dashboard");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin-dashboard") {
      setTitle("Dashboard");
    } else if (path.includes("/vendors")) {
      setTitle("Vendor Accounts");
    // } else if (path.includes("/categories")) {
    //   setTitle("Categories");
    } else if (path.includes("/discounts")) {
      setTitle("Discount Codes");
    } else if (path.includes("/white-label")) {
      setTitle("White Label Settings");
    } else if (path.includes("/settings")) {
      setTitle("Settings");
    }
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => onSidebarOpenChange(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF9900]"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-gray-200"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name || "Admin User"}</span>
                <span className="text-xs text-gray-500">
                  {user?.email || "admin@example.com"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
