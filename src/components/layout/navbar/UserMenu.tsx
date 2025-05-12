import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
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
  const { user } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          asChild
          className="text-[#FF9900] hover:text-orange-400 hover:bg-[#232F3E]/50  text-lg  3xl:text-2xl"
        >
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button
          variant="default"
          asChild
          className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium text-lg 3xl:text-2xl rounded-full"
        >
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full h-10 p-0 text-[#FF9900] px-3"
        >
          <User size={20} />
          <span>{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            to={
              isAdmin()
                ? "/admin-dashboard/settings"
                : "/vendor-dashboard/settings"
            }
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={isAdmin() ? "/admin-dashboard" : "/vendor-dashboard"}>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
