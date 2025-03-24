
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  logout: () => void;
}

const UserMenu = ({ isAuthenticated, isAdmin, logout }: UserMenuProps) => {
  if (!isAuthenticated) {
    return (
      <>
        <Button variant="ghost" asChild className="text-[#FF9900] hover:text-orange-400 hover:bg-[#232F3E]/50">
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button variant="default" asChild className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium">
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full w-10 h-10 p-0 text-[#FF9900]">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={isAdmin() ? "/admin-dashboard/settings" : "/vendor-dashboard/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={isAdmin() ? "/admin-dashboard" : "/vendor-dashboard"}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
