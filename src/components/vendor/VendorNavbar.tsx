import { Link } from "react-router-dom";
import { User, House } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const VendorNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between w-full bg-[#212631] border-b border-gray-700 h-[74px] px-6 pl-16">
      <div>
        <Link to="/vendor-dashboard" className="flex items-center">
          <img
            src="/images/logo/logo.png"
            alt="ReviewBrothers Logo"
            className="h-24 w-24"
          />
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-max rounded-full">
            <User className="h-5 w-5" />
            {user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none text-black">
              {user?.name}
            </p>
            <p className="text-xs leading-none text-black">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/vendor-dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VendorNavbar;
